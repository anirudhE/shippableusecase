angular.module('shippable', [])
    .controller('MainController', ['$http', '$scope', '$log', function ($http, $scope, $log) {
        $scope.url = "";
        //submit button invokes this function and returns issue details. 
        $scope.getRepoIssues = function () {
            //start of getting issues(To verify whether the repo url is correct and if correct private/public)
            $http.get("https://api.github.com/repos/" + $scope.url.slice(19))
                .then(function (response) {
                    $scope.totalIssues = response.data.open_issues_count;
                    $scope.issues_24h = 0;
                    $scope.issues_24h_7d = 0;
                    $scope.issues_7d= 0;
                    for(var i=1;i<=Math.ceil($scope.totalIssues/30);i++){
                        $http.get("https://api.github.com/repos/"+$scope.url.slice(19)+"/issues?q=is%3Aissue+is%3Aopen&page="+i)
                            .then(function(responseIssue){
                                var todayInMs=Date.parse(new Date());
                                var diff=0;
                                for(var j=0;j<responseIssue.data.length;j++){
                                    var createdDateInMs=Date.parse(responseIssue.data[j].created_at);
                                    createdDateInMs+=(5*60*60*1000);
                                    diff=todayInMs-createdDateInMs;
                                    
                                    if(diff<=(86400*1000))$scope.issues_24h++;
                                    else if(diff>(86400*1000) && diff<(86400*1000*7))$scope.issues_24h_7d++;
                                    else $scope.issues_7d++;
                                }
                            },function(reasonIssue){
                                console.log("error callback issue");
                            });
                    }
                }, function (reason) {
                    console.log("error callback");
                });
        }
    }]);