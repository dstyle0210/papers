/**
 * Created by Administrator on 2015-09-21.
 */
define(["angular","underscore","js/app/papers_createApp"],function(angular,_,app){
    app.controller("papers_ListCtrl",function($scope,panelQuery){
        $scope.$watch("conditionStats");

        // 검색을 위한 데이터 바인딩 (factory : "panelQuery" ) by papers_createApp.js
        $scope.query = panelQuery;
    });
});
