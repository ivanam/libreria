angular.module('angularTodo', []);  
function mainController($scope, $http) {  
    $scope.formData = {};

    // Cuando se cargue la página, pide del API Libro
    $http.get('/api/libro')
        .success(function(data) {
            $scope.libro
       = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo Libro, manda el texto a la API
    $scope.createLibro = function(){
        $http.post('/api/libros', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.libros = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra un Libro despues de checkearlo como acabado
    $scope.deleteLibro = function(id) {
        $http.delete('/api/libros/' + id)
            .success(function(data) {
                $scope.libros = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };


}





