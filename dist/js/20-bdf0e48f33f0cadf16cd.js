(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{267:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(1),o=a.n(r),i=a(26),c=a(313),d=a(5),s=Object(i.default)(function(e){return{checkRoot:{padding:7,color:e.palette.border.borderDD},icon:{fontSize:e.typography.fontSizeLg}}}),u=function(e){var t=e.onChange,a=e.checked,n=s();return l.a.createElement(c.default,{value:"checked",checked:a,onChange:t,icon:l.a.createElement(d.c,{className:n.icon}),color:"primary",checkedIcon:l.a.createElement(d.b,{className:n.icon}),classes:{root:n.checkRoot}})};u.propTypes={onChange:o.a.func.isRequired,checked:o.a.bool},u.defaultProps={checked:!1},t.a=u},270:function(e,t,a){"use strict";a.d(t,"a",function(){return f});var n=a(0),l=a.n(n),r=a(1),o=a.n(r),i=a(301),c=a(26),d=a(342),s=a(343),u=a(346),p=a(344),h=a(345),g=a(271),f=Object(i.default)(function(e){return{root:{padding:[[10,0]],fontSize:e.typography.fontSize,borderBottomColor:e.palette.border.borderEf}}})(d.default),m=Object(c.default)(function(e){return{tableHeader:{background:e.palette.primary[100],"& th":{paddingLeft:30}},tableBody:{border:"1px solid ".concat(e.palette.border.borderEf),borderBottom:"none","& td":{maxWidth:200,paddingLeft:30}}}}),b=function(e){var t=e.headers,a=e.rows,n=m(),r=a.length&&Object.keys(a[0]);return l.a.createElement(s.default,{className:n.table},l.a.createElement(p.default,{className:n.tableHeader},l.a.createElement(h.default,null,t.map(function(e){return l.a.createElement(f,{key:e.id},e.text)}))),l.a.createElement(u.default,{className:n.tableBody},a.length?a.map(function(e){return l.a.createElement(h.default,{key:e.id,className:e.id},r.map(function(t){return"id"!==t?l.a.createElement(f,{key:t},e[t]):null}))}):l.a.createElement(h.default,null,l.a.createElement(f,{style:{height:200},align:"center",colspan:8},l.a.createElement(g.a,null)))))};b.propTypes={headers:o.a.objectOf(o.a.array).isRequired,rows:o.a.objectOf(o.a.array).isRequired},t.b=b},313:function(e,t,a){e.exports=a(4)(355)},342:function(e,t,a){e.exports=a(4)(143)},343:function(e,t,a){e.exports=a(4)(398)},344:function(e,t,a){e.exports=a(4)(401)},345:function(e,t,a){e.exports=a(4)(403)},346:function(e,t,a){e.exports=a(4)(399)},453:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(26),o=a(49),i=a(315),c=a(252),d=a.n(c),s=a(45),u=a.n(s),p=a(46),h=a.n(p),g=a(237),f=a.n(g),m=a(238),b=a.n(m),k=a(239),E=a.n(k),y=a(1),C=a.n(y),v=a(301),S=a(311),x=a(277),j=a(12),D=a.n(j),R=a(9),N=Object(r.default)(function(){return{root:{padding:[[7,24]],borderRadius:2,"&:first-child":{marginRight:10}}}}),O=function(e){var t=e.handleDeleteChange,a=e.getAllLinks,r=Object(n.useState)(!1),o=D()(r,2),i=o[0],c=o[1],d=Object(n.useState)(!1),s=D()(d,2),u=s[0],p=s[1],h=N();return l.a.createElement("div",null,l.a.createElement(R.a,{variant:"contained",color:"primary",className:h.root,onClick:function(){p(!0),a().then(function(){p(!1)}).catch(function(){p(!1)})},loading:u,loadingSize:14,style:{minWidth:134}},"Batch Get Link"),l.a.createElement(R.a,{variant:"contained",color:"primary",className:h.root,onClick:function(){c(!0),t().then(function(){c(!1)}).catch(function(){c(!1)})},loading:i,style:{minWidth:88},loadingSize:14},"Delete"))};O.propTypes={handleDeleteChange:C.a.func.isRequired,getAllLinks:C.a.func.isRequired};var w=O,A=a(343),I=a(346),W=a(344),z=a(345),q=a(270),B=a(267),L=a(81),T=a(312),P=a.n(T),H=a(78),F=a(79),G=a(80),M=a(13),U=a(17),_=a(58),J=Object(r.default)(function(e){return{btnWrapper:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:74},btn:{padding:[[6,3]],minWidth:0,borderColor:e.palette.border.borderDD},copyWrapper:{width:500,height:150,margin:[[20,20,30]],padding:10,fontSize:e.typography.fontSizeMd,color:e.palette.text.secondary,border:"1px solid ".concat(e.palette.border.borderDD)}}}),$=function(e){var t=e.id,a=e.promProdId,r=e.valid,o=e.handleDeleteClick,i=Object(n.useState)(!1),c=D()(i,2),d=c[0],s=c[1],u=Object(n.useState)(null),p=D()(u,2),h=p[0],g=p[1],f=Object(n.useState)(!1),m=D()(f,2),b=m[0],k=m[1],E=J();return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:E.btnWrapper},l.a.createElement(R.a,{variant:"outlined",className:E.btn,onClick:function(){var e;e=t,k(!0),o(e).then(function(){k(!1)}).catch(function(){k(!1)})},loading:b,loadingSize:14},"Delete"),l.a.createElement(R.a,{variant:"outlined",className:E.btn,onClick:function(){r?(s(!0),Object(_.e)("/api/promotions/link/".concat(a)).then(function(e){var t=e.link;g(t)})):M.a.open({message:U.k.getLinksWarning,variant:"warning"})}},"Get Link")),l.a.createElement(H.a,{open:d,onClose:function(){s(!1)},wrapperCls:E.copyWrapper,header:l.a.createElement(F.a,{title:"Get Link"}),footer:l.a.createElement(G.a,{handleChange:function(){h&&(P()(h),s(!1),M.a.open({message:U.k.copyLinksSuccess,variant:"success",duration:5}))},handleDelete:function(){s(!1)},disabled:!h})},h||"loading...."))};$.propTypes={id:C.a.string.isRequired,promProdId:C.a.string.isRequired,valid:C.a.bool.isRequired,handleDeleteClick:C.a.func.isRequired};var K=$,Q=a(48),V=a(10),X=Object(r.default)(function(e){return{imgWrapper:{width:80,height:"inherit",borderRadius:"inherit","&:before":{width:"100%",paddingTop:100,content:'""',background:e.palette.background.disabled,display:"block"},"& > img":{position:"absolute"}},tableBody:{borderLeft:"1px solid ".concat(e.palette.border.borderEf),borderRight:"1px solid ".concat(e.palette.border.borderEf),"& td":{fontSize:e.typography.fontSizeMd}},tableHead:{background:e.palette.primary[100],"& th":{fontWeight:e.typography.fontNormal,padding:[[3,0]]}},name:{display:"flex",flexDirection:"column",justifyContent:"space-around",height:60,maxWidth:180,color:e.palette.text.color00,"& > span":{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},"& > span:first-child":{fontWeight:e.typography.fontWeight},"& > span:last-child":{textTransform:"uppercase"}},price:{fontWeight:e.typography.fontWeight,color:e.palette.text.color00},prodCateName:{textTransform:"capitalize",color:e.palette.text.color00},rate:{display:"flex",alignItems:"flex-end",color:e.palette.error.main,"& span:first-child":{marginRight:20,fontSize:e.typography.fontSizeLg,fontWeight:e.typography.fontWeight},"& span::last-child":{fontSize:e.typography.fontSize}},status:{color:e.palette.text.color00,textTransform:"capitalize"}}}),Y=function(e){var t=e.data,a=e.checkedAllBool,n=e.handleCheckChange,r=e.handleDeleteClick,o=e.handleCheckAllChange,i=X();return l.a.createElement(A.default,null,l.a.createElement(W.default,{className:i.tableHead},l.a.createElement(q.a,{align:"center"},l.a.createElement(B.a,{checked:a,onChange:o})),Q.m.tableHeadText.map(function(e){return l.a.createElement(q.a,{align:"left"},e)})),l.a.createElement(I.default,{className:i.tableBody},t.map(function(e,t){return l.a.createElement(z.default,null,l.a.createElement(q.a,{align:"center"},l.a.createElement(B.a,{checked:e.check,onChange:function(){n(t,e.id)}})),l.a.createElement(q.a,{align:"left"},l.a.createElement(L.a,{photo:e.prodImg,classes:{img:i.imgWrapper}})),l.a.createElement(q.a,{align:"left"},l.a.createElement("div",{className:i.name},l.a.createElement("span",null,e.prodName),l.a.createElement("span",null,e.storeName))),l.a.createElement(q.a,{align:"left"},l.a.createElement("span",{className:i.price},"$",e.prodPrice.toFixed(2))),l.a.createElement(q.a,{align:"left"},l.a.createElement("span",{className:i.prodCateName},e.prodCateName)),l.a.createElement(q.a,{align:"left"},l.a.createElement("div",{className:i.rate},l.a.createElement("span",null,"$",e.brokerageAmount.toFixed(2)),l.a.createElement("span",null,e.brokerageRate,"%"))),l.a.createElement(q.a,{align:"left"},l.a.createElement("span",{className:i.date},Object(V.h)(e.endTime))),l.a.createElement(q.a,{align:"left"},l.a.createElement("span",{className:i.status},e.valid?"Normal":"Invalid")),l.a.createElement(q.a,{align:"left"},l.a.createElement(K,{id:e.id,promProdId:e.promProdId,valid:e.valid,handleDeleteClick:r})))})))};Y.propTypes={data:C.a.objectOf(C.a.array).isRequired,handleCheckAllChange:C.a.func.isRequired,handleCheckChange:C.a.func.isRequired,handleDeleteClick:C.a.func.isRequired,checkedAllBool:C.a.bool.isRequired};var Z,ee=Y,te=a(271),ae=a(272),ne=3,le=Object(v.default)(function(e){return{root:{flex:1,padding:[[0,10]],background:e.palette.primary[50]},header:{width:"100%",height:54,display:"flex",justifyContent:"space-between",alignItems:"center"}}})(Z=function(e){function t(e){var a;return u()(this,t),(a=f()(this,b()(t).call(this,e))).getData=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.value,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.pageCurrent,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ne,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a.sort,r=a.state.checkedAllBool;return a.value=e,a.pageCurrent=t,Object(_.c)("/api/promotions/my",d()({page:t,size:n},e,{sort:l})).then(function(e){var t=e.total,n=e.pages,l=e.items;a._unmount&&(a.setState({data:Object(V.b)(l,a.isSingle&&r),pagination:{total:t,pages:n},loading:!1}),r&&!a.isSingle&&(a.setState({checkedAllBool:!1}),a.selectId.length=0),a.isSingle&&r&&(a.selectId.length=0,l.forEach(function(e){a.selectId.push(e.id)})),a.isSingle=!1)})},a.handleSelectChange=function(e){a.sort=e,a.getData().then()},a.handlePaginationChange=function(e){a.pageCurrent=e,a.getData().then()},a.handleCheckAllChange=function(e){var t=a.state.data,n=e.target.checked;a.setState({data:Object(V.b)(t,n),checkedAllBool:n}),a.selectId.length=0,n&&t.forEach(function(e){a.selectId.push(e.id)})},a.handleCheckChange=function(e,t){var n=a.state,l=n.data,r=n.checkedAllBool,o=l[e],i=o.check,c=o.id;i?a.selectId.splice(a.selectId.indexOf(t),1):a.selectId.push(c),l[e].check=!i,a.setState({data:l}),!a.selectId.length&&r&&a.setState({checkedAllBool:!1})},a.handleDeleteClick=function(e){var t=a.state,n=t.data,l=t.pagination;return a.isSingle=!0,l.pages===a.pageCurrent&&1===n.length&&(a.pageCurrent-=1,a.isSingle=!1),a.deleteRequest(e)},a.handleDelete=function(){var e=a.state,t=e.data,n=e.pagination;return a.selectId.length?(t.length<=a.selectId.length&&a.pageCurrent>1&&n.pages===a.pageCurrent&&(a.pageCurrent-=1),a.deleteRequest(a.selectId)):(M.a.open({message:U.i.deleteWarning,variant:"warning"}),Promise.resolve())},a.deleteRequest=function(e){if(!e)return Promise.resolve();var t=Array.isArray(e)?e.join(","):e;return Object(_.b)("/api/promotions/delete",{ids:t}).then(function(e){e.message===_.a&&(a.getData().then(),M.a.open({message:U.i.deleteSuccess,variant:"success",duration:2.5}))})},a.getAllLinks=function(){return Object(_.c)("/api/promotions/links","arraybuffer").then(function(e){M.a.open({message:U.i.downloadLinks,variant:"success"});var t=new Blob([e]),a=document.createElement("a");a.href=URL.createObjectURL(t),a.download="links.xls",a.style.display="none",document.body.appendChild(a),a.click(),a.remove()})},a.state={data:[],pagination:{},checkedAllBool:!1,loading:!0},a.sort=Q.m.productSort[0].value,a.pageCurrent=1,a.value=null,a.selectId=[],a.isSingle=!1,a}return E()(t,e),h()(t,[{key:"componentDidMount",value:function(){this._unmount=!0,this.getData().then()}},{key:"componentWillUnmount",value:function(){this._unmount=!1}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.data,n=t.pagination,r=t.checkedAllBool,o=t.loading;return l.a.createElement("div",{className:e.root},l.a.createElement("div",{className:e.header},l.a.createElement(w,{getAllLinks:this.getAllLinks,handleDeleteChange:this.handleDelete}),l.a.createElement(S.a,{selects:Q.m.productSort,onChange:this.handleSelectChange})),l.a.createElement(ae.a,{loading:o},a.length?l.a.createElement(ee,{data:a,checkedAllBool:r,handleDeleteClick:this.handleDeleteClick,handleCheckAllChange:this.handleCheckAllChange,handleCheckChange:this.handleCheckChange}):l.a.createElement(te.a,{height:284}),l.a.createElement(x.a,{total:n.total,pageSize:ne,pageCurrent:this.pageCurrent,change:this.handlePaginationChange})))}}]),t}(l.a.Component))||Z;le.propTypes={classes:C.a.objectOf(C.a.object).isRequired};var re=le,oe=Object(r.default)(function(){return{root:{display:"flex"}}});t.default=function(){var e=oe(),t=Object(n.useRef)();return l.a.createElement(o.a,{className:e.root},l.a.createElement(i.a,{viewRef:t,statusArr:Q.n}),l.a.createElement(re,{ref:t}))}}}]);