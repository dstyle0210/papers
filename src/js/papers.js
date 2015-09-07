/**
 * requirejs preload
 */

var gateKey = "1g1SqqR6QawK8zJe2nRXJz9vB4VfqMLHI9AbfX6fisr8"; // 구글스프레드시트 ID (정적사용)

require.config({
    baseUrl : "src",
    paths : {
        "jquery" : "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
        "jquery-ui" : "http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min",
        "angular" : "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.3/angular",
        "underscore":"http://jashkenas.github.io/underscore/underscore"
    },
    shim : {
        "jquery-ui" : {
            deps : [ "jquery" ],
            exports : 'jQueryUI'
        },
        "angular" : {
            exports : "angular"
        }
    }
    // End of shims
});

requirejs(["angular","underscore"],function(ng,_){
    var key = gateKey;
    var url = "https://spreadsheets.google.com/feeds/list/"+key+"/1/public/values?alt=json";
    var app = ng.module('gateApp', []);
    app.controller("customersCtrl",function($scope,$http){
        $http.get(url).success(function(response){
            var idx = 0;
            var cells = _.map(response.feed.entry,function(data){
                var o = {};
                for(key in data){
                    if(key.indexOf("gsx$")!= -1){
                        var nkey = key.split("gsx$")[1];
                        o[nkey] = data[key].$t;
                    }
                }
                return o;
            });

            cells = _.rest(cells); // 맨 처음 데이터를 지우고 리턴함.
            $scope.cells = cells; // 맨 처음 데이터를 지우고 리턴함.
        });
    });
});

requirejs(["jquery"],function($){
    var l = $("td").length;
    console.log(l);
});