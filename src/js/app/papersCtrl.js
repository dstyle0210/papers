define(["angular","underscore","js/app/papers_createApp"],function(angular,_,app){

    app.controller("papersCtrl",function($scope,$http){

        // Query을 위한 구글스프레드 ID 수급.
        var query = ((location.href).split("papers=")[1]);
        $scope.spreadsheetId = (!query) ? "1g1SqqR6QawK8zJe2nRXJz9vB4VfqMLHI9AbfX6fisr8" : query.split("/")[0];
        $scope.spreadsheetJsonUrl = "https://spreadsheets.google.com/feeds/list/"+$scope.spreadsheetId+"/1/public/values?alt=json";

        // Query시작.
        $http.get($scope.spreadsheetJsonUrl).success(function(response){
            console.log(response);
            var cells = _.map(response.feed.entry,function(data){
                var o = {};
                // 1차정제(스프레드시트 데이터)
                for(key in data){
                    if(key.indexOf("gsx$")!= -1){
                        var nkey = key.split("gsx$")[1];
                        o[nkey] = data[key].$t;
                    }
                }
                return o;
            });
            cells = _.rest(cells); // 맨 처음 데이터를 지우고 리턴함.

            // 2차정제 (실제로 사용할 데이터)
            var conditionStats = {ready:"진행대기",done:"퍼블완료",edit:"검수중",finish:"개발가능"};
            var papers = _.map(cells,function(paper,idx){

                if(paper.section == ""){
                    paper.sect = cells[idx-1].sect;
                }else{
                    paper.sect = idx;
                }

                // 현재 상태를 보여주기 위핸 컨디션 변경.
                _.each(conditionStats,function(cond,key){
                    if(paper.condition==cond){
                        paper.conditionClass = key;
                    };
                });

                // 날짜를 별도로 구분하기 위한 정제.
                paper.enddate_yyyymmdd = paper.enddate;
                paper.enddate_mmdd = (paper.enddate).substring(5, 10);
                paper.enddate = paper.enddate_yyyymmdd;

                return paper;
            });


            // 3차정제 (section을 기준으로 BookGroup 재배치)
            var paperGroups = _.groupBy(papers,function(paper){
                return paper.sect;
            });
            var books = []; // 실제로 보여질 섹션별 paper들 (책으로 형상화 하여 명명)
            _.each(paperGroups,function(paperGroup,key){
                books.push({});
                var book = books[(books.length-1)];
                book.papers = _.rest(paperGroup); // 각 페이지별 정보.
                book.bookTitle = paperGroup[0].section; // 책의 타이틀 (섹션 이름)
                book.bookId = "sect"+key; // 책 고유 아이디
                book.size = _.size(book.papers); // 책의 paper 갯수.
                book.stats = _.extend((_.object(_.keys(conditionStats),[0,0,0,0])), _.countBy(book.papers,function(paper){ return paper.conditionClass; }) );
                _.each(book.stats,function(item,key){ // 각 책의 페이퍼 진행상태 비율
                    book.stats[key+"Per"] = (Math.floor((book.stats[key]/book.size)*10000))/100;
                })
            });

            $scope.response = response; // 원본데이터를 통째로 가지고 다님.
            $scope.papers = papers; // 페이지 단위로 생성된 데이터 던져쥼.
            $scope.books = books; // 전체 데이터 던져쥼.
            $scope.conditionStats = _.map(conditionStats,function(cond,key){ return {className:key,name:cond}; }); // 프로그래스 및 진행상태값 루프로 사용.
        });
    });

})
