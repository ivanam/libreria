module.exports = function(grunt){
	//configuración de proyecto
	grunt.initConfig({

	jshint:{
	all:['main.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	//por defecto tarea
	grunt.registerTask('default',['jshint']);
};