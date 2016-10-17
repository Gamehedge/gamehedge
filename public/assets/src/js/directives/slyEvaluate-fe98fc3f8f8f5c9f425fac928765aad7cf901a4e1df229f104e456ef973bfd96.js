defineScalyrAngularModule("slyEvaluate",["gatedScope"]).directive("slyEvaluateOnlyWhen",["$parse",function(e){return{scope:!0,restrict:"A",compile:function(){return{pre:function(t,a,n){var i=null,o=!1,r=e(n.slyEvaluateOnlyWhen),s=null;if(hasProperty(n,"slyAlwaysEvaluate")&&(s=n.slyAlwaysEvaluate,isStringEmpty(s)))throw new Exception("Empty string is illegal for value of slyAlwaysEvaluate");t.$addWatcherGate(function(){var e=r(t);if(!o)return o=!0,i=e,!0;var a=i!==e;return i=e,a},function(e){return isNull(s)||!(isStringNonempty(e)&&e.indexOf(s)>=0)},!0)}}}}}]).directive("slyAlwaysEvaluate",function(){return{restrict:"A",link:function(){}}}).directive("slyShow",["$animate",function(e){function t(e){if(e&&0!==e.length){var t=""+e;t=isString(t)?t.toLowerCase():t,e=!("f"==t||"0"==t||"false"==t||"no"==t||"n"==t||"[]"==t)}else e=!1;return e}return{restrict:"A",link:function(a,n,i){a.$watch(i.slyShow,function(a){e[t(a)?"removeClass":"addClass"](n,"ng-hide")},!1,"slyShow")}}}]).directive("slyPreventEvaluationWhenHidden",function(){return{restrict:"A",scope:!0,compile:function(){return{pre:function(e,t){e.$addWatcherGate(function(){return!t.hasClass("ng-hide")},function(e,t,a,n){return!isDefined(n)||"slyShow"!=n})}}}}});