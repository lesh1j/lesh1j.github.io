import { observable, computed, configure, action, decorate } from 'mobx';
import * as go from 'gojs';

import { getBackgroundColor, getNodeStrokeColor, getGridColor, getTextColor, getEdgeStrokeColor } from '../utils/getColors';
import { prepareNode, prepareEdge } from '../utils/prepareData';
import LinkTemplates from '../utils/LinkTemplates';
import NodeTemplates from '../utils/NodeTemplates';
import LayoutCompleted from '../utils/LayoutCompleted';

import AppStore from "./AppStore";
import InfoCardStore from "./InfoCardStore";

import { Vertex, Edge } from '../interface';

configure({ enforceActions: 'observed' });

export interface Country {
  SHORT_NAME: string;
  FULL_NAME: string;
}

export interface Countries {
  '392': Country
}

export interface hiddenNodesForMega {
  intoHiddenNodes: Array<go.Node>;
  outHiddenNodes: Array<go.Node>;
}

class GraphStore {
  appStore: AppStore;
  infoCardStore: InfoCardStore; 

  direction: number = 0;
  vertexes: Array<Vertex>;
  edges: Array<Edge>;
  graphInfo: object;

  nodeTemplates: NodeTemplates;

  constructor(appStore: AppStore, infoCardStore: InfoCardStore) {
    this.appStore = appStore;
    this.infoCardStore = infoCardStore;

    this.direction = appStore.options.direction !== 90 ? 0 : 90;
    this.vertexes = appStore.data.vertexes || [];
    this.edges = appStore.data.edges || [];
    this.graphInfo = appStore.data.graphInfo || {};

    this.nodeTemplates = new NodeTemplates(this, infoCardStore);
  }

  diagram: go.Diagram = null;
  linkTemplates: LinkTemplates = new LinkTemplates();
  mode: number = 0;
  viewedNode: go.Node | null = null;
  visibleNodes: Array<string> = [];
  isRiskClick: boolean = false;
  riskCardIsOpen: boolean = false;
  currentRiskNode: go.Node | null = null; 
  currentRiskInfo: Array<any> = [];
  currentRisk: any = null;
  connectedRntp: Array<any> = []; 

  countries: Countries = {
    '392': {
      SHORT_NAME: 'JP',
      FULL_NAME: 'Япония'
    }
  }

  categories: Array<string> = ['taxpayer' ,'root' ,'tech' ,'clone' ,'megaNode'];

  get nodesWithClones(): Array<Vertex> {
    const nodes: Array<Vertex> = [...this.vertexes];

    this.edges.forEach((edge: Edge) => {
      const startNode: Vertex = nodes.find((node) => node.PK === edge.SID);
      const endNode: Vertex = nodes.find((node) => node.PK === edge.BID);

      if (edge.SID === edge.BID || endNode.Level - startNode.Level > 1) {
        nodes.push({ ...endNode, PK: endNode.PK + '_clone', isClone: true });
      }
    });

    return nodes;
  }

  get graphNodes(): Array<Vertex> {
    return this.nodesWithClones.map((node) => prepareNode(node, this.appStore.theme));
  }

  get rootNode(): Vertex {
    return this.graphNodes.find((node) => node.Level === 0);
  }

  get firstLevelNode(): Vertex {
    return this.graphNodes.find((node) => node.Level === 1);
  }

  get graphEdges(): Array<Edge> {
    return this.edges.map((edge) => prepareEdge(edge, this.appStore.theme, this.graphNodes));
  }

  get linkTemplate(): go.Link {
    return this.direction === 0 ? this.linkTemplates.horizontal : this.linkTemplates.vertical;
  }

  get diagramLayout(): go.LayeredDigraphLayout{
    return go.GraphObject.make(
      go.LayeredDigraphLayout, {
        setsPortSpots: false,
        direction: this.direction,
        layerSpacing: 100,
        columnSpacing: 14
      }
    );
  }

  get contentAlignment(): go.Spot {
    return this.direction === 0 ? new go.Spot(0, 0.5) : new go.Spot(0.5, 0);
  }

  get diagrammPadding(): go.Margin {
    return this.direction === 0 ? new go.Margin(0, 60) : new go.Margin(60, 0);
  }

  get grid(): go.Panel {
    const gridShape: string = this.direction === 0 ? 'BarV' : 'BarH';
    const gridCellSize: go.Size = this.direction === 0 ? new go.Size(340, 340) : new go.Size(184, 184);
    const gridOrigin: go.Point = this.direction === 0 ? new go.Point(-60, 0) : new go.Point(0, -60);

    return go.GraphObject.make(go.Panel, "Grid", {
        gridCellSize: gridCellSize,
        gridOrigin: gridOrigin
      },
      go.GraphObject.make(go.Shape, gridShape, {
        fill: getGridColor(this.appStore.theme),
        interval: 2
      })
    );
  }

  initDiagram = (): go.Diagram => {
    const $ = go.GraphObject.make;

    const diagram: go.Diagram =
      $(go.Diagram, {
        "undoManager.isEnabled": true,
        "animationManager.isEnabled": false,
        "hasHorizontalScrollbar": false,
        "hasVerticalScrollbar": false,
        "contentAlignment": this.contentAlignment,
        "padding": this.diagrammPadding,
        "grid.visible": true,
        "allowDelete": false,
        "allowMove": false,
        "layout": this.diagramLayout,
      });

    diagram.grid = this.grid;
    this.categories.forEach((category) => diagram.nodeTemplateMap.add(category, this.nodeTemplates[category]));
    diagram.linkTemplate = this.linkTemplate;

    diagram.addDiagramListener("LayoutCompleted", (e) => {
      if ((diagram.layout as go.LayeredDigraphLayout).direction === 0) {
        return new LayoutCompleted(diagram, this).commit();
      }
    });

    return diagram;
  }

  setHorizontalDirection = (): void => {
    this.direction = 0;
    this.changeDirection();
  }

  setVerticalDirection = (): void => {
    this.direction = 90;
    this.changeDirection();
  }

  private setGrid = (): void => {
    this.diagram.contentAlignment = this.contentAlignment;
    this.diagram.padding = this.diagrammPadding;
    this.diagram.grid = this.grid;
  }

  private changeDirection = (): void => {
    if (this.currentRisk) this.destroyRisk();
    if (this.viewedNode && this.mode === 1) this.destroyCollapse();

    this.diagram.layout = this.diagramLayout;
    this.diagram.linkTemplate = this.linkTemplate;
    this.setGrid();

    if (this.currentRisk) setTimeout(() => this.createRisk(), 10);
    if (this.viewedNode && this.mode === 1 && !this.currentRisk) setTimeout(() => this.setCollapse(), 10);
  }

  changeMode = (value: number): void => {
    if (this.mode !== value) {
      this.mode = value;
      this.setMode();
    }
  }

  private setMode = (): void => {
    if (this.mode === 1) {
      if (this.viewedNode && !this.currentRisk) this.setCollapse();
    } else {
      this.destroyCollapse();
      if (this.currentRisk) this.createRisk();
    }
  }

  changeCollapse = (selectedNode: go.Node): void => {
    if (this.viewedNode && this.viewedNode.key === selectedNode.key && !this.currentRisk) {
      this.viewedNode = null;
      this.destroyCollapse();
    } else if (this.mode === 1 && !this.currentRisk) {
      this.viewedNode = selectedNode;
      this.createCollapse();
    }
  }

  private createCollapse = (): void => {
    this.visibleNodes = [];

    this.diagram.nodes.each((currentNode) => {
      let isParent: boolean, isChildren: boolean = false;

      currentNode.findTreeParts().each((node) => {
        if (node.data.key === this.viewedNode.data.key) isParent = true;
      });

      currentNode.findNodesInto().each((node) => {
        if (node.data.key === this.viewedNode.data.key) isChildren = true;
      })

      if (isParent || isChildren || currentNode.category === 'root') {
        this.visibleNodes.push(currentNode.data.key);
      }
    });

    this.setCollapse();
  }

  private setCollapse = (): void => {
    this.destroyCollapse();
    this.diagram.layout = new go.Layout();
    
    this.diagram.commit((d) => {
      this.hideInvisibleNodes(d);

      this.visibleNodes.forEach((nodeKey) => {
        const currentNode: go.Node = d.findNodeForKey(nodeKey);

        const intoHiddenNodes: Array<go.Node> = this.hiddenNodesForMega(d, currentNode).intoHiddenNodes;
        const outHiddenNodes: Array<go.Node> = this.hiddenNodesForMega(d, currentNode).outHiddenNodes;

        if (outHiddenNodes.length > 0) {
          this.createMegaNode(d, currentNode, outHiddenNodes, intoHiddenNodes);
        }
      });
    });

    this.setGraphTheme();
  }

  private destroyCollapse = (): void => {
    this.diagram.commit((d) => {
      d.nodes.each((node) => {
        if (node.category === 'megaNode') {
          node.category = node.data.oldCategory;
          d.model.set(node.data, "oldCategory", undefined);
        }
        node.opacity = 1;
      });

      d.links.each((link) => {
        if (link.category === 'megaLink') {
          link.category = undefined;
          d.model.set(link.data, "label", link.data.oldLabel);
          d.model.set(link.data, "oldLabel", undefined);
        }
        link.opacity = 1;
      });
    });

    this.setGraphTheme();
  }

  private nodeIsVisible = (node: go.Node): boolean => this.visibleNodes.some((nodeKey) => nodeKey === node.key);

  private hideInvisibleNodes = (d: go.Diagram): void => { 
    d.nodes.each((node) => {
      if (!this.nodeIsVisible(node)) {
        node.opacity = 0

        node.findLinksConnected().each((link) => {
          link.opacity = 0
        });
      }
    });
  }

  private hiddenNodesForMega = (d: go.Diagram, currentNode: go.Node): hiddenNodesForMega => {
    const intoHiddenNodes: Array<go.Node> = [];
    const outHiddenNodes: Array<go.Node> = [];

    currentNode.findNodesInto().each((node) => {
      if (!this.nodeIsVisible(node) || node.category === 'megaNode') {
        intoHiddenNodes.push(node);
      }
    });

    currentNode.findNodesOutOf().each((node) => {
      let isReverse: boolean = false;

      node.findLinksBetween(currentNode).each((link) => {
        if (link.data.reverse) isReverse = true;
      });

      if (!this.nodeIsVisible(node) && !isReverse) {
        outHiddenNodes.push(node);
      } else if (!this.nodeIsVisible(node) && isReverse) {
        intoHiddenNodes.push(node);
      }
    });

    return {
      intoHiddenNodes,
      outHiddenNodes
    }
  }

  private createMegaNode = (d: go.Diagram, currentNode: go.Node, outHiddenNodes: Array<go.Node>, intoHiddenNodes: Array<go.Node>): void => {
    let megaIndex: number = Math.ceil((outHiddenNodes.length) / 2) - 1;

    const megaNode: go.Node = outHiddenNodes[megaIndex];
    const hiddenNodesCount: number = outHiddenNodes.length + intoHiddenNodes.length;

    d.model.set(megaNode.data, "oldCategory", megaNode.category);
    megaNode.category = 'megaNode';
    megaNode.opacity = 1;

    d.model.set(megaNode.data, "hiddenNodesCount", hiddenNodesCount);
    d.model.set(megaNode.data, "intoNodesCount", intoHiddenNodes.length);
    d.model.set(megaNode.data, "outNodesCount", outHiddenNodes.length);

    currentNode.findLinksTo(outHiddenNodes[megaIndex]).each((link) => {
      link.category = 'megaLink';
      link.opacity = 1;

      d.model.set(link.data, "oldLabel", link.data.label);
      d.model.set(link.data, "label", '');

    });
  }

  openMegaNode = (node: go.Node): void => {
    node.findLinksInto().each((link) => {
      if (link.category === 'megaLink') {
        link.fromNode.findNodesOutOf().each((node) => {
          if(this.visibleNodes.indexOf(node.data.key) === -1) {
            this.visibleNodes.push(node.data.key);
          }
        });

        link.fromNode.findNodesInto().each((node) => {
          if (node.findNodesInto().count === 0 && this.visibleNodes.indexOf(node.data.key) === -1) {
            this.visibleNodes.push(node.data.key);
          }
        });
      }
    });

    this.setCollapse();
  }

  private setGraphTheme = (): void => { 
    this.diagram.commit((d) => {
      d.nodes.each((node) => {
        d.model.set(node.data, "strokeColor", getNodeStrokeColor(node.data, this.appStore.theme));
        d.model.set(node.data, "textColor", getTextColor(this.appStore.theme));
        d.model.set(node.data, "backgroundColor", getBackgroundColor(this.appStore.theme));
      });

      d.links.each((link) => {
        d.model.set(link.data, "startNodeColor", link.fromNode.data.strokeColor);
        d.model.set(link.data, "endNodeColor", link.toNode.data.strokeColor);
        d.model.set(link.data, "strokeColor", getEdgeStrokeColor(link.data, this.appStore.theme));
        d.model.set(link.data, "backgroundColor", getBackgroundColor(this.appStore.theme));
      });
    });
    this.setGrid();
  }

  changeRiskCardVisible = (node: go.Node): void => {
    this.isRiskClick = true;
    if (this.riskCardIsOpen && this.currentRiskNode.key === node.key) {
      this.closeRiskCard();
    } else {
      this.openRiskCard(node);
    }
    setTimeout(() => this.isRiskClick = false, 100);
  }

  openRiskCard = (node: go.Node): void => {
    this.riskCardIsOpen = true;
    this.currentRiskNode = node.data;
    this.currentRisk = null;
    this.currentRiskInfo = node.data.RISK_INFO;
  }

  closeRiskCard = (): void => {
    this.riskCardIsOpen = false;
    this.currentRiskNode = null;
    this.currentRiskInfo = [];
  }

  openRisk = (riskNum: number): void => {
    if (this.viewedNode && this.mode === 1) {
      this.destroyCollapse();
    }
    this.currentRisk = this.currentRiskInfo[riskNum];
    this.createRisk();
  }

  closeRisk = (): void => {
    this.destroyRisk();
    this.currentRisk = null;
    this.connectedRntp = [];
    if (this.viewedNode && this.mode === 1) {
      this.setCollapse();
    }
  }

  private createRisk = (): void => {
    this.destroyRisk();
    this.connectedRntp = this.currentRisk ? this.currentRisk.ConnectedRnpt || [] : [];
    if (this.currentRisk && this.currentRisk.ConnectedNodes) {
      this.diagram.layout = new go.Layout();

      this.diagram.model.commit((m) => {
        m.nodeDataArray.forEach((data) => {
          const nodeIsConnected: go.Node = this.currentRisk.ConnectedNodes.find((node) => node === data.ID);

          if (nodeIsConnected && data.category !== 'clone') {
            this.diagram.findNodeForKey(data.key).opacity = 1;
            (m as go.GraphLinksModel).addLinkData({
              from: this.currentRiskNode.key,
              to: data.key,
              strokeColor: '#8805ff',
              category: 'potential'
            });
          } else if (this.currentRiskNode.key === data.key) {
            this.diagram.findNodeForKey(data.key).opacity = 1;
          } else {
            this.diagram.findNodeForKey(data.key).opacity = 0.1;
          }
        });

        (m as go.GraphLinksModel).linkDataArray.forEach((data) => {
          if (data.category !== 'potential') {
            this.diagram.findLinkForData(data).opacity = 0.1;
          }
        });
      });
    }
    this.setGraphTheme();
  }

  private destroyRisk = (): void => {
    this.diagram.links.each((link) => {
      if (link.category === 'potential') {
        this.diagram.remove(link);
      } else {
        link.opacity = 1;
      }
    });
    this.diagram.model.commit((m) => {
      m.nodeDataArray.forEach((data) => {
        this.diagram.findNodeForKey(data.key).opacity = 1;
      });
    });
  }
};

decorate(GraphStore, {
  vertexes: observable,
  edges: observable,
  direction: observable,
  mode: observable,
  riskCardIsOpen: observable,
  currentRiskNode: observable,
  currentRiskInfo: observable,
  currentRisk: observable,
  viewedNode: observable,
  visibleNodes: observable,
  graphNodes: computed,
  graphEdges: computed,
  rootNode: computed,
  firstLevelNode: computed,
  linkTemplate: computed,
  diagramLayout: computed,
  contentAlignment: computed,
  diagrammPadding: computed,
  changeCollapse: action,
  changeMode: action,
  openRisk: action,
  closeRisk: action,
  changeRiskCardVisible: action,
  closeRiskCard: action,
  setHorizontalDirection: action,
  setVerticalDirection: action,
  openMegaNode: action
});

export default GraphStore;