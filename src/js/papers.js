/**
 * requirejs preload
 */
require.config({
    baseUrl : "",
    paths : {
        "angular": "js/lib/angular.min",
        "underscore":"js/lib/underscore",
        "jquery":"js/lib/jquery",
        "bootstrap":"js/lib/bootstrap"
    },
    shim : {
        "angular": { exports: "angular"},
        "bootstrap" : { "deps" :['jquery'] }
    }
});
requirejs(["js/app/jq_tooltip","js/app/jq_panelToggle","js/app/jq_papersTitle"],function(){ });
requirejs(["js/app/papers_createApp","js/app/papersCtrl","js/app/papers_topPanelCtrl","js/app/papers_ListCtrl"],function(app){ });

