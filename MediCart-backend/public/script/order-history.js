var app = angular.module('drugStoreApp', []);

app.controller('orderHistoryController', function ($scope, $http) {
    const userId = "YOUR_USER_ID";  // You will replace it with logged-in user id
    $scope.orders = [];

    // Fetch order history for the user
    $http.get("http://localhost:3000/order-history/" + userId)
        .then(response => {
            $scope.orders = response.data;
        }, error => {
            console.log(error);
        });
});