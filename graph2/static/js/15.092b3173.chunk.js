(this.webpackJsonpvsa=this.webpackJsonpvsa||[]).push([[15],{976:function(e,a,t){e.exports={container:"PotentialDamage_container__30wjj",header:"PotentialDamage_header__llt8x",header_text:"PotentialDamage_header_text__3saC4",close_icon:"PotentialDamage_close_icon__1d6Uo",data_container:"PotentialDamage_data_container__853CJ",data_action_button:"PotentialDamage_data_action_button__wW7p6",data_button_container:"PotentialDamage_data_button_container__1Bsxa",search:"PotentialDamage_search__1fMbo",searchError:"PotentialDamage_searchError__teMkW",error:"PotentialDamage_error__3KM23"}},977:function(e,a,t){e.exports={button:"ActionButton_button__KUk0X",primary:"ActionButton_primary__3FH2J",secondary:"ActionButton_secondary__3bm0W",disabled:"ActionButton_disabled__1P5oy"}},993:function(e,a,t){"use strict";t.r(a);var n=t(4),o=t.n(n),r=t(7),c=t(3),i=t(8),l=t(10),s=t(5),_=t(15),d=t(14),u=t(2),m=(t(34),t(0)),p=t.n(m),b=t(976),h=t.n(b),g=t(9),v=t(977),f=t.n(v),E=function(e){var a=e.label,t=e.onClick,n=e.isSecondary,o=e.title,r=e.disabled;return p.a.createElement("button",{className:"".concat(f.a.button," ").concat(n?f.a.secondary:f.a.primary," ").concat(r?f.a.disabled:""),onClick:t,title:o,disabled:r},p.a.createElement("span",{className:f.a.label},a))};E.defaultProps={isSecondary:!1};var D,k,S,P=E,y=t(21),C=t(84),N=t(1),j=Object(g.c)("graphStore","commonStore")(D=Object(g.d)((k=function(e){Object(_.a)(t,e);var a=Object(d.a)(t);function t(e){var n,l;return Object(i.a)(this,t),l=a.call(this,e),Object(c.a)(l,"checkValue",S,Object(s.a)(l)),l._onChange=function(e){l.setState({potentialDamageValue:l.checkValue(e)})},l._onReset=function(){l.setState({potentialDamageValue:""})},l._saveDamage=Object(r.a)(o.a.mark((function e(){var a,t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=l.props,t=a.graphStore,n=a.onClose,r=l.state.potentialDamageValue,l.setState({isError:!1}),/^\d*[,.]?\d{1,2}$/.test(r)){e.next=8;break}l.setState({isError:!0}),e.next=11;break;case 8:return e.next=10,null===t||void 0===t?void 0:t.savePotentialDamage({amount_of_damage:r},null===t||void 0===t?void 0:t.mainVertexId);case 10:n();case 11:case"end":return e.stop()}}),e)}))),l.state={potentialDamageValue:null===(n=l.props.graphStore)||void 0===n?void 0:n.amountOfDamage,isError:!1},l}return Object(l.a)(t,[{key:"render",value:function(){var e=this.props,a=e.onClose,t=e.commonStore,n=this.state,o=n.potentialDamageValue,r=n.isError;return p.a.createElement("div",{className:h.a.container},p.a.createElement("div",{className:h.a.header,"data-draggable":!0},p.a.createElement("span",{className:h.a.header_text,"data-draggable":!0},"\u041f\u043e\u0442\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u0443\u0449\u0435\u0440\u0431"),p.a.createElement(y.b,{className:h.a.close_icon,name:"close",onClick:a,theme:null===t||void 0===t?void 0:t.appTheme})),p.a.createElement("div",{className:h.a.data_container},p.a.createElement("span",null,"\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u043f\u043e\u0442\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0443\u0449\u0435\u0440\u0431\u0430"),p.a.createElement(C.a,{wrapperStyle:r?h.a.searchError:h.a.search,value:o,onChange:this._onChange,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u043f\u043e\u0442\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0443\u0449\u0435\u0440\u0431\u0430",autoFocus:!0,withReset:!0,onReset:this._onReset,theme:null===t||void 0===t?void 0:t.appTheme}),r&&p.a.createElement("div",{className:h.a.error},"\u0414\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0443\u043a\u0430\u0437\u0430\u043d\u043e \u0447\u0438\u0441\u043b\u043e")),p.a.createElement("div",{className:h.a.data_button_container},p.a.createElement("div",{className:h.a.data_action_button},p.a.createElement(P,{onClick:this._saveDamage,disabled:!o,label:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})),p.a.createElement("div",{className:h.a.data_action_button},p.a.createElement(P,{onClick:a,isSecondary:!0,label:"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"}))))}}]),t}(m.PureComponent),S=Object(u.a)(k.prototype,"checkValue",[N.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return function(e){var a=e;return e.toString().includes(",")&&(a=a.toString().replace(",",".")),isNaN(a)&&(a=a.toString().replace(/[^.,\d]+/g,"")),a}}}),D=k))||D)||D;t.d(a,"default",(function(){return j}))}}]);
//# sourceMappingURL=15.092b3173.chunk.js.map