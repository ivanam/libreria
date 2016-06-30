var app = angular.module('angularTodo', [])


app.controller('mainController', function mainController($scope, $http) {  
    $scope.formData = {};
    $scope.LibrosResultados=[];

    // Cuando se cargue la página, pide del API Libro
    $http.get('/api/libro')
        .success(function(data) {
            $scope.libro = data;
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

    $scope.buscar = function(){
        //en base a una propiedad si es true es nuestro
        console.log($scope.libro);
        //limpiar la busqueda anterior
        $scope.LibrosResultados=[];
       $http.get('/api/libro/'+$scope.libro.titulo)
        .success(function(data) {
            items=data.items;
            angular.forEach(items, function(item) {
                Precio = "Falta";
                Thumbnail = "/images/noDisponible.png";
                Title = "Titulo No disponible";
                Language= "Lenguaje no disponible";
                Author = "Autor no disponible";
                Description= "Descripcion no disponible";
                Id="ERROR";//VER ESTO
                Reactions={
                    like: 0,
                    angry: 0,
                    wow: 0,
                    haha: 0,
                    sad:0
                }

                if (validar(item.id_google)){
                    //Esta en local
                    Precio = item.precios_locales;
                    Title = item.title;
                    Id = item.id_google;
                    Reactions = item.reactions; //VERTODO esto, falta el thumbnail, languagem auhor, description

                }else{//esta en la api de google

                   if (validar(item.saleInfo)){
                        if (validar(item.saleInfo.listPrice)){
                            if (validar(item.saleInfo.listPrice.amount)){
                                Precio = item.saleInfo.listPrice.amount;
                            }
                        }
                   }; //buscar la forma de hacer mas simple en un Y
                   
                   if (validar(item.volumeInfo)){
                        if (validar(item.volumeInfo.imageLinks) && validar(item.volumeInfo.imageLinks.thumbnail)){
                            Thumbnail = item.volumeInfo.imageLinks.thumbnail;
                        }
                        if (validar(item.volumeInfo.language)){
                            Language = item.volumeInfo.language;
                        }
                        if (validar(item.volumeInfo.authors)){
                            Author= item.volumeInfo.authors[0]; //ver
                        }
                        if (validar(item.volumeInfo.description)){
                            Description = item.volumeInfo.description.substring(0,250);
                        }
                        if (validar(item.volumeInfo.title)){
                            Title = item.volumeInfo.title;
                        }
                   } 
                   if (validar(item.id)){
                    Id = item.id;
                   }
                }
                $scope.LibrosResultados.push({
                    thumbnail: Thumbnail,
                    title: Title,
                    language: Language,
                    author: Author,
                    description: Description,
                    precio: Precio,
                    id: Id
                });
                $('#resultados').show();
                $('#resultados').html('Resultados encontrados:'+$scope.LibrosResultados.length);
                console.log("Resultados:"+$scope.LibrosResultados.length);           
            });
       })
        .error(function(data) {
            $('#resultados').hide();
            console.log('Error: ' + data);
        });
        
    }
    $scope.mostrar = function() {
        console.log("test");
    }
    /*Verifica si un campo se encuentra no definido*/
    function validar(campo){
        if (campo === undefined){
            return false;
        }else{
            return true;
        }
    }
});