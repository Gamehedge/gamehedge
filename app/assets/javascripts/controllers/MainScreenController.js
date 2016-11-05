controllers = angular.module('gamehedge')

controllers.controller('MainScreenController', function($scope,$rootScope){
    $rootScope.load_complete = false;
    $scope.$watch(function() {
        return $rootScope.load_complete;
    }, function(newValue, oldValue) {
        // if(newValue == true && oldValue == false){
        //     var htm='<script>(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"5255950"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");</script><noscript><img src="//bat.bing.com/action/0?ti=5255950&Ver=2" height="0" width="0" style="display:none; visibility: hidden;" /></noscript>    <script>!function(e,n,u,a){e.twq||(a=e.twq=function(){a.exe?a.exe.apply(a,arguments):a.queue.push(arguments);},a.version="1",a.queue=[],t=n.createElement(u),t.async=!0,t.src="//static.ads-twitter.com/uwt.js",s=n.getElementsByTagName(u)[0],s.parentNode.insertBefore(t,s))}(window,document,"script");twq("init","nuys0");twq("track","PageView");</script>'
        //     $("#initial_scripts").html(htm);
        //     console.log("added scripts");
        // };
    }, true);
});