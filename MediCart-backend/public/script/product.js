var app = angular.module('drugStoreApp', []);

        app.controller('productController', function ($scope, $http) {
            $scope.products = [];

            // Fetch all products
            $http.get("http://localhost:3000/products")
                .then(response => {
                    $scope.products = response.data;
                }, error => {
                    console.log(error);
                });

            $scope.addToCart = function (product) {
                const userId = "YOUR_USER_ID";  // You will replace it with logged-in user id
                const quantity = 1;  // Example, you can increase it

                $http.post("http://localhost:3000/add-to-cart", {
                    userId: userId,
                    productId: product._id,
                    quantity: quantity
                }).then(response => {
                    alert("Product added to cart");
                    product.stock -= quantity;
                }, error => {
                    alert("Error adding to cart: " + error.data);
                });
            };
        });