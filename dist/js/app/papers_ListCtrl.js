/**
 * Created by Administrator on 2015-09-21.
 */
define(["angular","underscore","js/app/papers_createApp"],function(angular,_,app){
    app.controller("papers_ListCtrl",function($scope){
        $scope.$watch("conditionStats");
    });
});
