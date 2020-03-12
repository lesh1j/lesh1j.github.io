import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import App from "./components/app";
import AppStore from "./stores/AppStore";
import { prepareDataTypes } from './utils/prepareData';

export interface GoGraphProps {
	options?: object;
data?: object;
}

class GoGraph extends Component<GoGraphProps, {}>{ 
	
get stores(){
const { options, data } = this.props;

const appStore = new AppStore(options, prepareDataTypes(data));

return {
AppStore: appStore, 
GraphStore: appStore.GraphStore,
MenuStore: appStore.MenuStore,
RightMenuStore: appStore.RightMenuStore,
InfoCardStore: appStore.InfoCardStore,
RiskCardStore: appStore.RiskCardStore,
ZoomStore: appStore.ZoomStore
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
