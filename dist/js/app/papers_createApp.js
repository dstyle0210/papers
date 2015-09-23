/**
 * Created by Administrator on 2015-09-21.
 */
define(["angular"],function(angular) {
    var app =  angular.module('paperApp', []);

    // 검색을 위한 팩토리 생성.
    app.factory("panelQuery",function(){
        var queryString = {};
        queryString.word = "";
       return queryString;
    });

    // require에서 사용을 위한 리턴
    return app;
});