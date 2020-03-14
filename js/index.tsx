import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import App from "./components/app";
import AppStore from "./stores/AppStore";
import { prepareDataTypes } from './utils/prepareData';
import { Options } from './interface';

export interface GoGraphProps {
	options?: Options;
	data?: object;
}

class GoGraph extends Component<GoGraphProps, {}>{
	private appStore: AppStore = new AppStore(
		this.props.options, 
		prepareDataTypes(this.props.data)
	);	

	get stores(): object {
		return {
		  AppStore: this.appStore, 
		  GraphStore: this.appStore.GraphStore,
		  MenuStore: this.appStore.MenuStore,
		  RightMenuStore: this.appStore.RightMenuStore,
		  InfoCardStore: this.appStore.InfoCardStore,
		  RiskCardStore: this.appStore.RiskCardStore,
		  ZoomStore: this.appStore.ZoomStore
		};
	}

	render(){
		return(
			<Provider {...this.stores} >
				<App />
			</Provider>
		)
	}
}

export default GoGraph;
