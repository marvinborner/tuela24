import{g as W,h as j,k as G,l as H}from"../modules/unplugin-icons-DdQIwbVj.js";import{d as E,o as n,c,i as M,I as e,t as $,z as y,E as z,S as q,O,R as A,ah as J,a5 as K,b as k,e as t,l as o,k as g,h as N,g as Q,x as U,F as X}from"../modules/vue-DPv8DyWv.js";import{a as Y,u as Z,d as ee,c as te,s as se,e as oe,p as ne,h as ae,i as re,j as ie,k as le,_ as ce}from"../index-Da-oe7Cw.js";import{b as ue,c as me,a as F,S as de}from"./SlideWrapper-Ccnvj0Sw.js";import{r as pe,u as _e,a as fe,S as xe,_ as ve,G as ke,b as ge,c as be,o as ye}from"./shortcuts-TVJpHdJV.js";import{b as Ce}from"../monaco/bundled-types-B0l6HWZX.js";import{_ as he,C as Se}from"./NoteDisplay.vue_vue_type_style_index_0_lang-B38dLyf3.js";import{_ as we}from"./DrawingControls.vue_vue_type_style_index_0_lang-j1j1HRFG.js";import{_ as B}from"./IconButton.vue_vue_type_script_setup_true_lang-D92RVpEC.js";import"../modules/shiki-BNMsYMPq.js";import"../modules/file-saver-igGfcqei.js";import"./context-DlCOjm-I.js";const $e=E({__name:"NoteStatic",props:{no:{},class:{},clicksContext:{}},setup(C){const l=C,{info:i}=ue(l.no);return(u,p)=>{var _,f;return n(),c(he,{class:M(l.class),note:(_=e(i))==null?void 0:_.note,"note-html":(f=e(i))==null?void 0:f.noteHTML,"clicks-context":u.clicksContext},null,8,["class","note","note-html","clicks-context"])}}}),ze={class:"bg-main h-full slidev-presenter"},Ne={class:"relative grid-section next flex flex-col p-2 lg:p-4"},Fe={key:1,class:"h-full flex justify-center items-center"},Be={key:0,class:"grid-section note of-auto"},Ee={key:1,class:"grid-section note grid grid-rows-[1fr_min-content] overflow-hidden"},Me={class:"border-t border-main py-1 px-2 text-sm"},Pe={class:"grid-section bottom flex"},Re={class:"text-2xl pl-2 pr-6 my-auto tabular-nums"},De={class:"progress-bar"},Ie=E({__name:"presenter",setup(C){const l=$();pe(),_e(l),fe();const{clicksContext:i,currentSlideNo:u,currentSlideRoute:p,hasNext:_,nextRoute:f,slides:P,getPrimaryClicks:R,total:D}=Y(),{isDrawing:I}=me();Z({title:`Presenter - ${Ce}`}),$(!1);const{timer:T,resetTimer:h}=ee(),L=y(()=>P.value.map(v=>te(v))),a=y(()=>i.value.current<i.value.total?[p.value,i.value.current+1]:_.value?[f.value,0]:null),x=y(()=>a.value&&L.value[a.value[0].no-1]);z(a,()=>{x.value&&a.value&&(x.value.current=a.value[1])},{immediate:!0});const S=q();return O(()=>{const v=l.value.querySelector("#slide-content"),s=A(J()),b=K();z(()=>{if(!b.value||I.value||!oe.value)return;const r=v.getBoundingClientRect(),m=(s.x-r.left)/r.width*100,d=(s.y-r.top)/r.height*100;if(!(m<0||m>100||d<0||d>100))return{x:m,y:d}},r=>{se.cursor=r})}),(v,s)=>{var w;const b=W,r=j,m=G,d=H;return n(),k(X,null,[t("div",ze,[t("div",{class:M(["grid-container",`layout${e(ne)}`])},[t("div",{ref_key:"main",ref:l,class:"relative grid-section main flex flex-col"},[o(F,{key:"main",class:"p-2 lg:p-4 flex-auto","is-main":"",onContextmenu:e(ye)},{default:g(()=>[o(xe,{"render-context":"presenter"})]),_:1},8,["onContextmenu"]),(n(),c(Se,{key:(w=e(p))==null?void 0:w.no,"clicks-context":e(R)(e(p)),class:"w-full pb2 px4 flex-none"},null,8,["clicks-context"])),s[3]||(s[3]=t("div",{class:"absolute left-0 top-0 bg-main border-b border-r border-main px2 py1 op50 text-sm"}," Current ",-1))],512),t("div",Ne,[a.value&&x.value?(n(),c(F,{key:"next"},{default:g(()=>[(n(),c(de,{key:a.value[0].no,"clicks-context":x.value,route:a.value[0],"render-context":"previewNext"},null,8,["clicks-context","route"]))]),_:1})):(n(),k("div",Fe,s[4]||(s[4]=[t("div",{class:"text-gray-500"}," End of the presentation ",-1)]))),s[5]||(s[5]=t("div",{class:"absolute left-0 top-0 bg-main border-b border-r border-main px2 py1 op50 text-sm"}," Next ",-1))]),S.value&&e(ae)?(n(),k("div",Be,[o(e(S))])):(n(),k("div",Ee,[(n(),c($e,{key:`static-${e(u)}`,no:e(u),class:"w-full max-w-full h-full overflow-auto p-2 lg:p-4",style:N({fontSize:`${e(re)}em`}),"clicks-context":e(i)},null,8,["no","style","clicks-context"])),t("div",Me,[o(B,{title:"Increase font size",onClick:e(ie)},{default:g(()=>[o(b)]),_:1},8,["onClick"]),o(B,{title:"Decrease font size",onClick:e(le)},{default:g(()=>[o(r)]),_:1},8,["onClick"]),Q("v-if",!0)])])),t("div",Pe,[o(ve,{persist:!0}),s[6]||(s[6]=t("div",{"flex-auto":""},null,-1)),t("div",{class:"timer-btn my-auto relative w-22px h-22px cursor-pointer text-lg",opacity:"50 hover:100",onClick:s[2]||(s[2]=(...V)=>e(h)&&e(h)(...V))},[o(m,{class:"absolute"}),o(d,{class:"absolute opacity-0"})]),t("div",Re,U(e(T)),1)]),(n(),c(we,{key:2}))],2),t("div",De,[t("div",{class:"progress h-3px bg-primary transition-all",style:N({width:`${(e(u)-1)/(e(D)-1)*100+1}%`})},null,4)])]),o(ke),o(ge),o(be)],64)}}}),Qe=ce(Ie,[["__scopeId","data-v-536f23f4"]]);export{Qe as default};