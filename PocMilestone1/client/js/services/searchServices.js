var searchServices = app.service('searchServices', function (httpServices) {
    this.search = {};
    this.searchResult = {places :[]};
    this.addToSearch = function (key,value) {
        this.search[key] = value;
    };
    this.setSearch = function (value){
        angular.copy(value,this.search);
    };
    this.getSearch = function (){
        return this.search;
    };
    this.setSearchResult = function (value){
        angular.copy(value,this.searchResult);
    };
    this.getSearchResult = function (){
        return this.searchResult;
    };
    this.getSearchResultsDB = function () {
          if (!httpServices.isStatic()){
              //TODO: real rest call
          } else {
              httpServices.getRequest(
                  "http://127.0.0.1:8000/static/client/mock/getSearchResultsMock.json",
                  angular.bind(this,function (dataDB) {
                      this.setSearchResult(dataDB[this.search.place.formatted_address]);
                  }),
                  function () {
                  }
              )
          }
    };
});
