define(["angular","underscore"],function(ng,_){
    var trCtrl = function(opt){
        // 정보 정제.
        var json = {};
        json.key = (opt.key) ? opt.key : "1g1SqqR6QawK8zJe2nRXJz9vB4VfqMLHI9AbfX6fisr8"; // 구글시트 아이디
        json.app = (opt.app) ? opt.app : "paperApp"; // 앵귤러 rootApp
        json.ctrl = (opt.ctrl) ? opt.ctrl : "sheetTrCtrl"; // 구글 스프레드시트 데이터가 repeat될 컨트롤러
        json.url = "https://spreadsheets.google.com/feeds/list/"+json.key+"/1/public/values?alt=json";

        // 앵귤러 시작
        var app = ng.module(json.app, []);
        app.controller(json.ctrl,function($scope,$http){
            $http.get(json.url).success(function(response) {
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
                $scope.cells = cells;
            });
        });
    }
    return trCtrl;
});