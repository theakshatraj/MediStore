// script/login.js
angular.module('drugStoreApp').controller('LoginController', ['$scope', '$http', function($scope, $http) {
    $scope.loginData = {
        email: '',
        password: ''
    };

    $scope.login = async function() {
        try {
            // Sending login data to the server
            const response = await $http.post('http://localhost:2025/login', $scope.loginData);
            
            // Ensure response structure is as expected
            if (response.data && response.data.userId) {
                alert('Login successful!'); // Show success message
                localStorage.setItem('userId', response.data.userId); // Store user ID in local storage
                
                // Redirect to dashboard.html after successful login
                window.location.href = 'dashboard.html'; 
            } else {
                alert('Login failed: Invalid response from server'); // Handle unexpected response
            }
        } catch (error) {
            const errorMessage = error.data ? error.data : 'Login failed: An unknown error occurred';
            alert(errorMessage); // Show error message
        }
    };
}]);
