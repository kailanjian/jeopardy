(this.webpackJsonpjeopardy=this.webpackJsonpjeopardy||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(6),l=a.n(r),c=(a(13),a(4)),s=a(7),u=a(1),i=(a(14),{intro:"/assets/jeopardy-intro.mp3",right:"/assets/jeopardy-right.mp3",wrong:"/assets/jeopardy-wrong.mp3","board-fill":"/assets/jeopardy-board-fill.mp3",outro:"/assets/jeopardy-outro.mp3"});function m(e){var t=e.category,a=e.question,n=e.answer,r=e.value,l=e.airDate,c=e.showAnswer;return o.a.createElement("div",null,o.a.createElement("div",{className:"Jeopardy-box flex-box-column",style:{height:"7em"}},o.a.createElement("div",{style:{"font-size":"2em","text-shadow":"2px 2px 0px black","font-weight":"bold"}},t.toUpperCase()," (",r,")"),o.a.createElement("div",{style:{"font-size":"1em","text-shadow":"2px 2px 0px black","font-style":"italic"}},"AIRED IN ".concat(l))),o.a.createElement("div",{className:"Jeopardy-box flex-box-column",style:{height:"18em","overflow-y":"auto"}},o.a.createElement("div",{style:{"font-size":"2em",padding:"0.5em"}},c?n:a)))}var d=function(){var e,t=Object(n.useState)({question:"...",answer:"...",category:"...",value:"",showAnswer:!1,airDate:"..."}),a=Object(u.a)(t,2),r=a[0],l=a[1],d=Object(n.useState)(""),p=Object(u.a)(d,2),h=p[0],b=p[1],f=Object(n.useState)("Welcome to Jeopardy! Here are your clues for today..."),w=Object(u.a)(f,2),y=w[0],v=w[1],g=Object(n.useState)(0),E=Object(u.a)(g,2),x=E[0],j=E[1],S=Object(n.useState)([]),C=Object(u.a)(S,2),k=C[0],N=C[1],O=function(e){var t=e,a={},n={};return Object.keys(i).forEach((function(e){n[e]=new Audio(i[e])})),a.playSound=function(e){n[e].currentTime=0,n[e].play()},a.playSpeech=function(e){var a=t.getVoices().find((function(e){return"Microsoft Clara Online (Natural) - English (Canada)"===e.name})),n=new SpeechSynthesisUtterance(e);n.voice=a,window.speechSynthesis.speak(n)},a}(window.speechSynthesis),A=function(e,t,a,n,o,r){N([].concat(Object(s.a)(k),[{question:e,answer:t,category:a,value:n,userAnswer:o,isCorrect:r}]))},q=function e(){b(""),6!==k.length?(j(1),fetch("http://jservice.io/api/random").then((function(t){t.json().then((function(t){var a=t[0];console.log(a),a.value?(l({question:a.question,answer:a.answer,category:a.category.title,value:a.value||0,showAnswer:!1,airDate:new Date(a.airdate).getFullYear()}),O.playSpeech("".concat(a.category.title," for ").concat(a.value,". ").concat(a.question)),v('"'.concat(a.category.title,'" for ').concat(a.value,"..."))):e()}))}))):j(3)},D=function(){j(2),W()?(O.playSound("right"),A(r.question,r.answer,r.category,r.value,h,!0),v("Right!")):(O.playSound("wrong"),A(r.question,r.answer,r.category,r.value,h,!1),I(),v("Wrong!"))},J=function(){W()||(O.playSound("right"),v("Incorrectly marked as wrong... points added back to your score!"),function(){var e=k;e[k.length-1].isCorrect=!0,N(e)}())},I=function(){l(Object(c.a)(Object(c.a)({},r),{},{showAnswer:!r.showAnswer}))},W=function(){return h.toLowerCase()===r.answer.toLowerCase()},z=function(){return o.a.createElement("div",{class:"container flex-box-column"},o.a.createElement("button",{className:"btn btn-primary btn-lg m-4",onClick:function(){j(1),q()}},"Play"))};return o.a.createElement("div",{className:"App flex-box-column",style:{"background-color":"#00003A",minHeight:"100%"}},o.a.createElement("div",{className:"Jeopardy-title"},"Jeopardy"),0==(e=x)?z():3==e?o.a.createElement("div",{class:"container flex-box-column"},o.a.createElement("p",null,"Summary:"),o.a.createElement("p",null,"You answered ",k.filter((function(e){return e.isCorrect})).length," correctly, out of today's ",k.length," clues"),o.a.createElement("p",null,"On the show you would have made $",k.reduce((function(e,t){return t.isCorrect?e+t.value:e-t.value}),0)),o.a.createElement("table",{class:"table-dark table-bordered table-hover"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{scope:"col"},"#"),o.a.createElement("th",{scope:"col"},"Question"),o.a.createElement("th",{scope:"col"},"Answer"),o.a.createElement("th",{scope:"col"},"Clue Value"))),o.a.createElement("tbody",null,k.map((function(e,t){return o.a.createElement("tr",null,o.a.createElement("th",{scope:"row"},t+1),o.a.createElement("td",null,e.question),o.a.createElement("td",null,e.answer),o.a.createElement("td",null,e.value))}))))):o.a.createElement("div",{className:"flex-box-column"},o.a.createElement("div",null,o.a.createElement(m,{value:r.value,category:r.category,question:r.question,answer:r.answer,airDate:r.airDate,showAnswer:r.showAnswer})),o.a.createElement("div",{className:"form-group form-inline mt-4",autocomplete:"off"},o.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},o.a.createElement("input",{autocomplete:"off",disabled:2===x,className:"form-control",value:h,onChange:function(e){b(e.target.value)},type:"text"}),o.a.createElement("button",{disabled:2===x,className:"btn btn-primary mx-2",onClick:D},"Guess"),2===x&&o.a.createElement("button",{className:"btn btn-success",type:"button",onClick:q},"Next Clue"))),o.a.createElement("div",null,o.a.createElement("button",{className:"btn btn-outline-danger btn-sm mr-2",type:"button",onClick:I},r.showAnswer?"Show Question":"Show Answer"),o.a.createElement("span",null,1===x?o.a.createElement("button",{className:"btn btn-outline-warning btn-sm",type:"button",onClick:q},"Skip Clue"):o.a.createElement("button",{onClick:J,className:"btn btn-outline-secondary btn-sm"},"I was right!"))),o.a.createElement("div",null,o.a.createElement("p",{className:"mt-4 h4"},y)),o.a.createElement("div",null,o.a.createElement("p",{className:"mt-4 h4"},"You have: ",k.filter((function(e){return e.isCorrect})).length," right, out of ",k.length," answered."))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(15);l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,a){e.exports=a(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.26ca3ad7.chunk.js.map