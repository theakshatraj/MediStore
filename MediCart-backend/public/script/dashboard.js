// dashboard.js
angular.module('drugStoreApp').controller('DashboardController', function($scope) {
    // Sample product data
    $scope.products = [
        { id: 1, name: 'Aspirin', price: 10.00, description: 'Pain reliever and anti-inflammatory.' },
        { id: 2, name: 'Tylenol', price: 8.00, description: 'Pain reliever and fever reducer.' },
        { id: 3, name: 'Ibuprofen', price: 12.00, description: 'Anti-inflammatory medication.' },
        { id: 4, name: 'Amoxicillin', price: 15.00, description: 'Antibiotic for treating infections.' },
        { id: 5, name: 'Cetirizine', price: 7.00, description: 'Allergy relief medication.' },
        { id: 6, name: 'Loratadine', price: 9.00, description: 'Non-drowsy allergy relief.' },
        { id: 7, name: 'Metformin', price: 20.00, description: 'Diabetes medication.' },
        { id: 8, name: 'Lipitor', price: 25.00, description: 'Cholesterol-lowering medication.' }
    ];

    // Cart to hold selected products
    $scope.cart = [];

    // Function to add products to the cart
    $scope.addToCart = function(product) {
        $scope.cart.push(product);
        alert(product.name + " has been added to your cart!");
    };
});
