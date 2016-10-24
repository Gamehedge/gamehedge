(function(){var e,t,n,i,o,r,a,s,l,c,u,p,h,d,g,S,f,m,v,T,C,y,w,k,M=[].slice,E=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};e=window.jQuery||window.Zepto||window.$,e.payment={},e.payment.fn={},e.fn.payment=function(){var t,n;return n=arguments[0],t=2<=arguments.length?M.call(arguments,1):[],e.payment.fn[n].apply(this,t)},o=/(\d{1,4})/g,e.payment.cards=i=[{type:"elo",patterns:[401178,401179,431274,438935,451416,457393,457631,457632,504175,506699,5067,509,627780,636297,636368,650,6516,6550],format:o,length:[16],cvcLength:[3],luhn:!0},{type:"maestro",patterns:[5018,502,503,506,56,58,639,6220,67],format:o,length:[12,13,14,15,16,17,18,19],cvcLength:[3],luhn:!0},{type:"forbrugsforeningen",patterns:[600],format:o,length:[16],cvcLength:[3],luhn:!0},{type:"dankort",patterns:[5019],format:o,length:[16],cvcLength:[3],luhn:!0},{type:"visa",patterns:[4],format:o,length:[13,16],cvcLength:[3],luhn:!0},{type:"mastercard",patterns:[51,52,53,54,55,22,23,24,25,26,27],format:o,length:[16],cvcLength:[3],luhn:!0},{type:"amex",patterns:[34,37],format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,length:[15],cvcLength:[3,4],luhn:!0},{type:"dinersclub",patterns:[30,36,38,39],format:/(\d{1,4})(\d{1,6})?(\d{1,4})?/,length:[14],cvcLength:[3],luhn:!0},{type:"discover",patterns:[60,64,65,622],format:o,length:[16],cvcLength:[3],luhn:!0},{type:"unionpay",patterns:[62,88],format:o,length:[16,17,18,19],cvcLength:[3],luhn:!1},{type:"jcb",patterns:[35],format:o,length:[16],cvcLength:[3],luhn:!0}],t=function(e){var t,n,o,r,a,s,l,c;for(e=(e+"").replace(/\D/g,""),r=0,s=i.length;s>r;r++)for(t=i[r],c=t.patterns,a=0,l=c.length;l>a;a++)if(o=c[a],n=o+"",e.substr(0,n.length)===n)return t},n=function(e){var t,n,o;for(n=0,o=i.length;o>n;n++)if(t=i[n],t.type===e)return t},h=function(e){var t,n,i,o,r,a;for(i=!0,o=0,n=(e+"").split("").reverse(),r=0,a=n.length;a>r;r++)t=n[r],t=parseInt(t,10),(i=!i)&&(t*=2),t>9&&(t-=9),o+=t;return o%10===0},p=function(e){var t;return null!=e.prop("selectionStart")&&e.prop("selectionStart")!==e.prop("selectionEnd")||!(null==("undefined"!=typeof document&&null!==document&&null!=(t=document.selection)?t.createRange:void 0)||!document.selection.createRange().text)},w=function(e,t){var n,i,o,r,a,s;try{i=t.prop("selectionStart")}catch(e){r=e,i=null}return a=t.val(),t.val(e),null!==i&&t.is(":focus")?(i===a.length&&(i=e.length),a!==e&&(s=a.slice(i-1,+i+1||9e9),n=e.slice(i-1,+i+1||9e9),o=e[i],/\d/.test(o)&&s===""+o+" "&&n===" "+o&&(i+=1)),t.prop("selectionStart",i),t.prop("selectionEnd",i)):void 0},m=function(e){var t,n,i,o,r,a,s,l;for(null==e&&(e=""),i="\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19",o="0123456789",a="",t=e.split(""),s=0,l=t.length;l>s;s++)n=t[s],r=i.indexOf(n),r>-1&&(n=o[r]),a+=n;return a},f=function(t){var n;return n=e(t.currentTarget),setTimeout(function(){var e;return e=n.val(),e=m(e),e=e.replace(/\D/g,""),w(e,n)})},g=function(t){var n;return n=e(t.currentTarget),setTimeout(function(){var t;return t=n.val(),t=m(t),t=e.payment.formatCardNumber(t),w(t,n)})},s=function(n){var i,o,r,a,s,l,c;return r=String.fromCharCode(n.which),!/^\d+$/.test(r)||(i=e(n.currentTarget),c=i.val(),o=t(c+r),a=(c.replace(/\D/g,"")+r).length,l=16,o&&(l=o.length[o.length.length-1]),a>=l||null!=i.prop("selectionStart")&&i.prop("selectionStart")!==c.length)?void 0:(s=o&&"amex"===o.type?/^(\d{4}|\d{4}\s\d{6})$/:/(?:^|\s)(\d{4})$/,s.test(c)?(n.preventDefault(),setTimeout(function(){return i.val(c+" "+r)})):s.test(c+r)?(n.preventDefault(),setTimeout(function(){return i.val(c+r+" ")})):void 0)},r=function(t){var n,i;return n=e(t.currentTarget),i=n.val(),8!==t.which||null!=n.prop("selectionStart")&&n.prop("selectionStart")!==i.length?void 0:/\d\s$/.test(i)?(t.preventDefault(),setTimeout(function(){return n.val(i.replace(/\d\s$/,""))})):/\s\d?$/.test(i)?(t.preventDefault(),setTimeout(function(){return n.val(i.replace(/\d$/,""))})):void 0},S=function(t){var n;return n=e(t.currentTarget),setTimeout(function(){var t;return t=n.val(),t=m(t),t=e.payment.formatExpiry(t),w(t,n)})},l=function(t){var n,i,o;return i=String.fromCharCode(t.which),/^\d+$/.test(i)?(n=e(t.currentTarget),o=n.val()+i,/^\d$/.test(o)&&"0"!==o&&"1"!==o?(t.preventDefault(),setTimeout(function(){return n.val("0"+o+" / ")})):/^\d\d$/.test(o)?(t.preventDefault(),setTimeout(function(){var e,t;return e=parseInt(o[0],10),t=parseInt(o[1],10),t>2&&0!==e?n.val("0"+e+" / "+t):n.val(""+o+" / ")})):void 0):void 0},c=function(t){var n,i,o;return i=String.fromCharCode(t.which),/^\d+$/.test(i)?(n=e(t.currentTarget),o=n.val(),/^\d\d$/.test(o)?n.val(""+o+" / "):void 0):void 0},u=function(t){var n,i,o;return o=String.fromCharCode(t.which),"/"===o||" "===o?(n=e(t.currentTarget),i=n.val(),/^\d$/.test(i)&&"0"!==i?n.val("0"+i+" / "):void 0):void 0},a=function(t){var n,i;return n=e(t.currentTarget),i=n.val(),8!==t.which||null!=n.prop("selectionStart")&&n.prop("selectionStart")!==i.length?void 0:/\d\s\/\s$/.test(i)?(t.preventDefault(),setTimeout(function(){return n.val(i.replace(/\d\s\/\s$/,""))})):void 0},d=function(t){var n;return n=e(t.currentTarget),setTimeout(function(){var e;return e=n.val(),e=m(e),e=e.replace(/\D/g,"").slice(0,4),w(e,n)})},y=function(e){var t;return!(!e.metaKey&&!e.ctrlKey)||32!==e.which&&(0===e.which||(e.which<33||(t=String.fromCharCode(e.which),!!/[\d\s]/.test(t))))},T=function(n){var i,o,r,a;return i=e(n.currentTarget),r=String.fromCharCode(n.which),/^\d+$/.test(r)&&!p(i)?(a=(i.val()+r).replace(/\D/g,""),o=t(a),o?a.length<=o.length[o.length.length-1]:a.length<=16):void 0},C=function(t){var n,i,o;return n=e(t.currentTarget),i=String.fromCharCode(t.which),/^\d+$/.test(i)&&!p(n)?(o=n.val()+i,o=o.replace(/\D/g,""),!(o.length>6)&&void 0):void 0},v=function(t){var n,i,o;return n=e(t.currentTarget),i=String.fromCharCode(t.which),/^\d+$/.test(i)&&!p(n)?(o=n.val()+i,o.length<=4):void 0},k=function(t){var n,o,r,a,s;return n=e(t.currentTarget),s=n.val(),a=e.payment.cardType(s)||"unknown",n.hasClass(a)?void 0:(o=function(){var e,t,n;for(n=[],e=0,t=i.length;t>e;e++)r=i[e],n.push(r.type);return n}(),n.removeClass("unknown"),n.removeClass(o.join(" ")),n.addClass(a),n.toggleClass("identified","unknown"!==a),n.trigger("payment.cardType",a))},e.payment.fn.formatCardCVC=function(){return this.on("keypress",y),this.on("keypress",v),this.on("paste",d),this.on("change",d),this.on("input",d),this},e.payment.fn.formatCardExpiry=function(){return this.on("keypress",y),this.on("keypress",C),this.on("keypress",l),this.on("keypress",u),this.on("keypress",c),this.on("keydown",a),this.on("change",S),this.on("input",S),this},e.payment.fn.formatCardNumber=function(){return this.on("keypress",y),this.on("keypress",T),this.on("keypress",s),this.on("keydown",r),this.on("keyup",k),this.on("paste",g),this.on("change",g),this.on("input",g),this.on("input",k),this},e.payment.fn.restrictNumeric=function(){return this.on("keypress",y),this.on("paste",f),this.on("change",f),this.on("input",f),this},e.payment.fn.cardExpiryVal=function(){return e.payment.cardExpiryVal(e(this).val())},e.payment.cardExpiryVal=function(e){var t,n,i,o;return o=e.split(/[\s\/]+/,2),t=o[0],i=o[1],2===(null!=i?i.length:void 0)&&/^\d+$/.test(i)&&(n=(new Date).getFullYear(),n=n.toString().slice(0,2),i=n+i),t=parseInt(t,10),i=parseInt(i,10),{month:t,year:i}},e.payment.validateCardNumber=function(e){var n,i;return e=(e+"").replace(/\s+|-/g,""),!!/^\d+$/.test(e)&&(n=t(e),!!n&&(i=e.length,E.call(n.length,i)>=0&&(n.luhn===!1||h(e))))},e.payment.validateCardExpiry=function(t,n){var i,o,r;return"object"==typeof t&&"month"in t&&(r=t,t=r.month,n=r.year),!(!t||!n)&&(t=e.trim(t),n=e.trim(n),!!(/^\d+$/.test(t)&&/^\d+$/.test(n)&&t>=1&&12>=t)&&(2===n.length&&(n=70>n?"20"+n:"19"+n),4===n.length&&(o=new Date(n,t),i=new Date,o.setMonth(o.getMonth()-1),o.setMonth(o.getMonth()+1,1),o>i)))},e.payment.validateCardCVC=function(t,i){var o,r;return t=e.trim(t),!!/^\d+$/.test(t)&&(o=n(i),null!=o?(r=t.length,E.call(o.cvcLength,r)>=0):t.length>=3&&t.length<=4)},e.payment.cardType=function(e){var n;return e?(null!=(n=t(e))?n.type:void 0)||null:null},e.payment.formatCardNumber=function(n){var i,o,r,a;return n=n.replace(/\D/g,""),(i=t(n))?(r=i.length[i.length.length-1],n=n.slice(0,r),i.format.global?null!=(a=n.match(i.format))?a.join(" "):void 0:(o=i.format.exec(n),null!=o?(o.shift(),o=e.grep(o,function(e){return e}),o.join(" ")):void 0)):n},e.payment.formatExpiry=function(e){var t,n,i,o;return(n=e.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/))?(t=n[1]||"",i=n[2]||"",o=n[3]||"",o.length>0?i=" / ":" /"===i?(t=t.substring(0,1),i=""):2===t.length||i.length>0?i=" / ":1===t.length&&"0"!==t&&"1"!==t&&(t="0"+t,i=" / "),t+i+o):""}}).call(this);