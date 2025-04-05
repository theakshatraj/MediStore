var app = angular.module('drugStoreApp', ['ngRoute']);

// Configure routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        })
        .when('/signup', {
            templateUrl: 'signup.html',
            controller: 'SignupController'
        })
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController'
        })
        .when('/profile', {
            templateUrl: 'profile.html',
            controller: 'ProfileController'
        })
        .when('/order-history', {
            templateUrl: 'order-history.html',
            controller: 'OrderHistoryController'
        })
        .when('/cart', {
            templateUrl: 'cart.html',
            controller: 'CartController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

// Main Controller for the landing page
app.controller('MainController', function($scope) {
    $scope.navigateTo = function(page) {
        window.location.href = '#!' + page;  // Use hash-based routing
    };
});

// Signup Controller
app.controller('SignupController', ['$scope', '$http', function($scope, $http) {
    $scope.signupData = {
        email: '',
        password: ''
    };

    $scope.signup = async function() {
        try {
            console.log('Signup data:', $scope.signupData); // Check the data being sent
            
            const response = await $http.post('http://localhost:2025/signup', $scope.signupData);
            alert(response.data); // Show success message
            
            // Redirect to login page after successful signup
            window.location.href = '#!/login'; 
        } catch (error) {
            const errorMessage = error.data || 'Signup failed: An unknown error occurred';
            alert(errorMessage); // Show error message
        }
    };
}]);

// Login Controller
app.controller('LoginController', ['$scope', '$http', function($scope, $http) {
    $scope.loginData = {
        email: '',
        password: ''
    };

    $scope.login = async function() {
        try {
            const response = await $http.post('http://localhost:2025/login', $scope.loginData);
            // Store userId in localStorage after successful login
            localStorage.setItem('userId', response.data.userId);
            // Redirect to dashboard
            window.location.href = '#!/dashboard';
        } catch (error) {
            const errorMessage = error.data || 'Login failed: Invalid email or password';
            alert(errorMessage); // Show error message
        }
    };
}]);

// Dashboard Controller
app.controller('DashboardController', ['$scope', '$http', function($scope, $http) {
    $scope.products = [];
    $scope.cart = [];

    // Fetch products
    const fetchProducts = async function() {
        try {
            const response = await $http.get('http://localhost:2025/products');
            $scope.products = response.data;
        } catch (error) {
            alert('Failed to fetch products: ' + (error.data || error.message));
        }
    };

    // Add product to cart
    $scope.addToCart = async function(product) {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please log in to add products to your cart.');
            return;
        }

        try {
            await $http.post('http://localhost:2025/add-to-cart', { productId: product._id });
            alert('Product added to cart');
        } catch (error) {
            alert('Failed to add product to cart: ' + (error.data || error.message));
        }
    };

    // Initialize the dashboard by fetching products
    fetchProducts();
}]);

// Profile Controller
app.controller('ProfileController', ['$scope', '$http', function($scope, $http) {
    $scope.userData = {};
    $scope.updateMessage = '';
    $scope.isUpdate = false; // Track whether the profile is already submitted or not

    // Fetch user data based on stored user ID
    const fetchUserData = async function() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const response = await $http.get(`http://localhost:2025/user/${userId}`);
            $scope.userData = response.data;
            $scope.isUpdate = true; // If user data exists, this is an update scenario
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to fetch user data: ' + (error.data || error.message));
        }
    };

    // Submit new profile (for first-time creation)
    $scope.submitProfile = async function() {
        try {
            const response = await $http.post('http://localhost:2025/user', $scope.userData);
            $scope.updateMessage = 'Profile created successfully!';
            // Save userId in localStorage for subsequent operations
            localStorage.setItem('userId', response.data.userId); // Assuming the API returns a userId
            $scope.isUpdate = true; // After submission, change to update mode
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('Failed to create profile: ' + (error.data || error.message));
        }
    };

    // Update existing user profile
    $scope.updateProfile = async function() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const response = await $http.put(`http://localhost:2025/user/${userId}`, $scope.userData);
            $scope.updateMessage = 'Profile updated successfully!';
            fetchUserData(); // Refresh the user data to show updated info
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile: ' + (error.data || error.message));
        }
    };

    fetchUserData(); // Call to fetch user data on initialization
}]);

// Order History Controller
app.controller('OrderHistoryController', ['$scope', '$http', function($scope, $http) {
    $scope.orders = [];

    // Fetch order history based on stored user ID
    const fetchOrderHistory = async function() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const response = await $http.get(`http://localhost:2025/order-history/${userId}`);
            $scope.orders = response.data;
        } catch (error) {
            alert('Failed to fetch order history: ' + (error.data || error.message));
        }
    };

    fetchOrderHistory(); // Call to fetch order history on initialization
}]);

app.controller('CartController', ['$scope', '$http', function($scope, $http) {
    $scope.cartItems = [];

    // Fetch cart items based on stored user ID
    const fetchCartItems = async function() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const response = await $http.get(`http://localhost:2025/cart/${userId}`);
            $scope.cartItems = response.data; // Ensure the correct data structure
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
            alert('Failed to fetch cart items: ' + (error.data || error.message));
        }
    };

    // Calculate total price
    $scope.total = function() {
        return $scope.cartItems.reduce((sum, item) => sum + item.price, 0);
    };

    // Remove product from cart
    $scope.removeFromCart = async function(productId) {
        try {
            await $http.delete(`http://localhost:2025/cart/${productId}`);
            alert('Product removed from cart');
            fetchCartItems(); // Refresh cart items
        } catch (error) {
            console.error('Failed to remove product from cart:', error);
            alert('Failed to remove product from cart: ' + (error.data || error.message));
        }
    };

    // Checkout functionality
    $scope.checkout = function() {
        alert('Proceeding to checkout...');
        // Here, implement the checkout functionality, like calling a payment API or redirecting to a payment page.
    };

    fetchCartItems(); // Fetch cart items when controller is initialized
}]);
