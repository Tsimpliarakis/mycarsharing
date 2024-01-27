import{a as o,c as y,r as s,w as I,n as j,h as l,aa as D,d as q,aE as E,g as P}from"./index.fbbb49e6.js";import{u as F,a as H}from"./use-dark.03fbf057.js";const L={ratio:[String,Number]};function M(e,i){return o(()=>{const n=Number(e.ratio||(i!==void 0?i.value:void 0));return isNaN(n)!==!0&&n>0?{paddingBottom:`${100/n}%`}:null})}const O=16/9;var W=y({name:"QImg",props:{...L,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:O},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:i,emit:n}){const g=s(e.initialRatio),f=M(e,g);let a=null,v=!1;const r=[s(null),s(S())],u=s(0),c=s(!1),d=s(!1),k=o(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),z=o(()=>({width:e.width,height:e.height})),B=o(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),T=o(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));I(()=>b(),_);function b(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function S(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function _(t){a!==null&&(clearTimeout(a),a=null),d.value=!1,t===null?(c.value=!1,r[u.value^1].value=S()):c.value=!0,r[u.value].value=t}function Q({target:t}){v!==!0&&(a!==null&&(clearTimeout(a),a=null),g.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,C(t,1))}function C(t,m){v===!0||m===1e3||(t.complete===!0?N(t):a=setTimeout(()=>{a=null,C(t,m+1)},50))}function N(t){v!==!0&&(u.value=u.value^1,r[u.value].value=null,c.value=!1,d.value=!1,n("load",t.currentSrc||t.src))}function R(t){a!==null&&(clearTimeout(a),a=null),c.value=!1,d.value=!0,r[u.value].value=null,r[u.value^1].value=S(),n("error",t)}function w(t){const m=r[t].value,h={key:"img_"+t,class:B.value,style:T.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...m};return u.value===t?(h.class+=" q-img__image--waiting",Object.assign(h,{onLoad:Q,onError:R})):h.class+=" q-img__image--loaded",l("div",{class:"q-img__container absolute-full",key:"img"+t},l("img",h))}function $(){return c.value!==!0?l("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},q(i[d.value===!0?"error":"default"])):l("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},i.loading!==void 0?i.loading():e.noSpinner===!0?void 0:[l(E,{color:e.spinnerColor,size:e.spinnerSize})])}return _(b()),j(()=>{v=!0,a!==null&&(clearTimeout(a),a=null)}),()=>{const t=[];return f.value!==null&&t.push(l("div",{key:"filler",style:f.value})),d.value!==!0&&(r[0].value!==null&&t.push(w(0)),r[1].value!==null&&t.push(w(1))),t.push(l(D,{name:"q-transition--fade"},$)),l("div",{class:k.value,style:z.value,role:"img","aria-label":e.alt},t)}}}),A=y({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(e,{slots:i}){const n=o(()=>`q-card__section q-card__section--${e.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>l(e.tag,{class:n.value},q(i.default))}}),G=y({name:"QCard",props:{...F,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:i}){const{proxy:{$q:n}}=P(),g=H(e,n),f=o(()=>"q-card"+(g.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>l(e.tag,{class:f.value},q(i.default))}});export{W as Q,A as a,G as b};
