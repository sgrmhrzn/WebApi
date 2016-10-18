var app = angular.module("myApp", [])
.filter('sumOfValue', function () {
    return function (data, key) {
        //debugger;
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;
        var sum = 0;

        angular.forEach(data, function (v, k) {
            sum = sum + parseInt(v[key]);
        });
        return sum;
    }
}).filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {
        if (angular.isUndefined(data) && angular.isUndefined(key1) && angular.isUndefined(key2))
            return 0;

        var sum = 0;
        angular.forEach(data, function (v, k) {
            sum = sum + (parseInt(v[key1]) * parseInt(v[key2]));
        });
        return sum;
    }
}).filter('dateRange', function () {
    return function (sales, fromDate, toDate) {

        var filtered = [];
        //here you will have your desired input
        //var from_date = Date.parse(fromDate);
        //var to_date = Date.parse(toDate);
        //var fdate = '/Date(' + from_date + ')/';
        //var tdate = '/Date(' + to_date + ')/';

        //console.log(sales);

        angular.forEach(sales, function (obj) {
            var receivedDate = obj.date;
            console.log(receivedDate);
            if (receivedDate >= fromDate && receivedDate <= toDate) {
                filtered.push(obj);
            }
        });
        return filtered;
    };
});


