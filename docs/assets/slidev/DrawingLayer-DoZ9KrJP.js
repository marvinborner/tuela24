import{d as l,t as u,O as m,E as i,K as c,o as p,b as f,i as d,I as t}from"../modules/vue-DPv8DyWv.js";import{c as _}from"./SlideWrapper-Ccnvj0Sw.js";import{u as v}from"./context-DlCOjm-I.js";import"../index-Da-oe7Cw.js";import"../monaco/bundled-types-B0l6HWZX.js";import"../modules/file-saver-igGfcqei.js";import"../modules/shiki-BNMsYMPq.js";const y=l({__name:"DrawingLayer",setup(g){const{drauu:e,drawingEnabled:n,loadCanvas:s}=_(),r=v().$scale,o=u();return m(()=>{e.mount(o.value,o.value.parentElement),i(r,a=>e.options.coordinateScale=1/a,{immediate:!0}),s()}),c(()=>{e.unmount()}),(a,w)=>(p(),f("svg",{ref_key:"svg",ref:o,class:d(["w-full h-full absolute top-0",{"pointer-events-none":!t(n),"touch-none":t(n)}])},null,2))}});export{y as default};