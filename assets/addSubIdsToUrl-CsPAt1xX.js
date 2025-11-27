const s=(e,a)=>{try{const r=new URL(e);return Object.keys(a).forEach(t=>{a[t]?r.searchParams.set(`subid${t}`,a[t]):r.searchParams.delete(`subid${t}`)}),r.toString()}catch{return""}};export{s as a};
//# sourceMappingURL=addSubIdsToUrl-CsPAt1xX.js.map
