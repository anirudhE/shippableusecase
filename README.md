# shippableusecase

* application is live@URL: http://shippableusecasebyanirudherabelly.azurewebsites.net/
* It is built using angularjs(for API call) and bootstrap(for styling).
* Here all the time calculations are done in according with UTC format(i.e GMT) because we are considere only with the difference between times to know the status.
* Firstly made a call to github api to get given repository details and from that extracted the total open issue count.
* As github api gives only 30 issues per api call, used math.ceil(totalOpenIssues/30) for getting total no.of pages and made subsequent api calls to get page by page results. 

### Scope for Improvements

* As per github api pull requests are also considered in issues, we can filter them seperatley. :+1:
