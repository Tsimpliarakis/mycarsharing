import{Q as _}from"./QPage.e7766711.js";import{aK as f,r as i,s as p,J as h,z as e,L as o,C as d,A as s,I as v,ak as g,al as k,B as x}from"./index.fbbb49e6.js";import{C as y}from"./CarThumbnailHorizontal.c4bc7273.js";import"./QCard.d1c40a8f.js";import"./use-dark.03fbf057.js";import"./plugin-vue_export-helper.21dcd24c.js";const B={key:0},C={key:1,class:"text-h6"},L={key:2,class:"text-h6"},q={__name:"SearchResults",setup(m){const l=f(),a=i([]),r=i(!1);return p(async()=>{r.value=!0;const{city:n,date:c}=l.query,{data:t,error:u}=await h.from("cars").select("*").eq("location",n).eq("start_date",c);r.value=!1,u?console.log("Error: ",u):a.value=t||[]}),(n,c)=>(e(),o(_,{class:"flex flex-center column"},{default:d(()=>[r.value?(e(),s("div",B,"Loading...")):a.value&&a.value.length>0?(e(),s("div",C," Found "+v(a.value.length)+" result(s) ",1)):(e(),s("div",L,"No results found :(")),(e(!0),s(g,null,k(a.value,t=>(e(),o(y,{key:t.id,car:t},null,8,["car"]))),128))]),_:1}))}},N={__name:"SearchPage",setup(m){return(l,a)=>(e(),o(_,null,{default:d(()=>[x(q)]),_:1}))}};export{N as default};
