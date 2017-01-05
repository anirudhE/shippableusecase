angular.module('shippable', [])
    .controller('MainController', ['$http', '$scope', function($http, $scope) {
        $scope.url = "";
        //submit button invokes this function and returns issue details. 
        $scope.getRepoIssues = function() {
            //function starts to get issues
            $http.get("https://api.github.com/repos/" + $scope.url.slice(19))//slice part gives the org and repo details if the url is correct.
                .then(function(response) {
                    $scope.totalIssues = response.data.open_issues_count;//total no.of open issues
                    $scope.issues_24h = 0;//total no. of open issues opened in last 24 hrs
                    $scope.issues_24h_7d = 0;//total no. of open issues opened in more than 24 hrs and less than 7 days.
                    $scope.issues_7d = 0;//total no. of open issues opened more than 7 days ago
                    for (var i = 1; i <= Math.ceil($scope.totalIssues / 30); i++) {
                        $http.get("https://api.github.com/repos/" + $scope.url.slice(19) + "/issues?q=is%3Aissue+is%3Aopen&page=" + i)
                            .then(function(responseIssue) {
                                var todayInMs = Date.parse((new Date()).toUTCString());//converting the user Time zone to UTC(GMT)
                                var diff = 0;
                                for (var j = 0; j < responseIssue.data.length; j++) {
                                    var createdDateInMs = Date.parse(responseIssue.data[j].created_at);  
                                    diff = todayInMs - createdDateInMs;
                                    
                                    //86400 secs per day(took all times in MS)
                                    if (diff <= (86400 * 1000)) $scope.issues_24h++;
                                    else if (diff > (86400 * 1000) && diff <= (86400 * 1000 * 7)) $scope.issues_24h_7d++;
                                    else $scope.issues_7d++;
                                }
                            }, function(reasonIssue) {
                                console.log("error callback issue, server Issue");
                            });
                    }
                }, function(reason) {
                    console.log("error callback,may be URL not recognized");
                });
        }
    }]);