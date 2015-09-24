/**
 * Created by Administrator on 2015-09-21.
 */
define(["angular","underscore","js/app/papers_createApp"],function(angular,_,app){
    app.controller("papers_topPanelCtrl",function($scope,panelQuery){
        // 구글스프레드시트 링크 생성
        $scope.spreadsheetPage = "https://docs.google.com/spreadsheets/d/"+$scope.spreadsheetId;

        // 구글스프레드 시트 탭타이틀 가져옴.
        $scope.$watch("response",function(){
            $scope.sheetTitle = $scope.response.feed.title.$t;
        });

        // 진도률 계산함.
        $scope.$watch("papers",function(){
            // 전체 진도률 계산함.
            var papers = _.filter($scope.papers,function(paper){return (paper.condition!="");});
            var size = _.size(papers);
            var count = _.countBy(papers,function(paper){ return paper.conditionClass; });
            _.each(count,function(item,key){ // 각 책의 페이퍼 진행상태 비율
                count[key+"Per"] = (Math.floor((item/size)*10000))/100;
            });
            $scope.totalCondition = count;

            // 제외함 빼고 진도률 계산함.
            var exclusionPapers = _.filter($scope.papers,function(paper){return (paper.condition!="" && paper.conditionClass!="del");});
            var exclusionSize = _.size(exclusionPapers);
            var exclusionCount = _.countBy(exclusionPapers,function(paper){ return paper.conditionClass; });
            _.each(exclusionCount,function(item,key){ // 각 책의 페이퍼 진행상태 비율
                exclusionCount[key+"Per"] = (Math.floor((item/exclusionSize)*10000))/100;
            });
            $scope.exclusionCondition = exclusionCount;
        });

        // 검색을 위한 데이터 바인딩 (factory : "panelQuery" ) by papers_createApp.js
        $scope.query = panelQuery;
    });
});
