// cart.js
angular.module('drugStoreApp').controller('CartController', function($scope) {
    // This would be where you would typically retrieve the cart from a service or local storage.
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to remove an item from the cart
    $scope.removeFromCart = function(item) {
        const index = $scope.cart.indexOf(item);
        if (index > -1) {
            $scope.cart.splice(index, 1);
            alert(item.name + " has been removed from your cart.");
            localStorage.setItem('cart', JSON.stringify($scope.cart)); // Update local storage
        }
    };

    // Function to calculate the total price
    $scope.total = function() {
        return $scope.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    };

    // Function to handle checkout process
    $scope.checkout = function() {
        alert("Checkout process initiated!");
        // Clear the cart and update local storage
        $scope.cart = [];
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    };
});
