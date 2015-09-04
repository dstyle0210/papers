/**
 * requirejs preload
 */
requirejs.config({
	"baseUrl": "./js",
	"paths": {
		"app": "./app", // (A.K.A "./js/app" )
		"jquery": "http://code.jquery.com/jquery-2.1.4.min",
		"angular":"lib/angular",
        "routes":"lib/angular-route"
        // "res":"https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-resource.min",
		// "underscore":"http://jashkenas.github.io/underscore/underscore"
	},
	shim:{
		"angular": {deps:["jquery"],exports: "angular"},
        "routes":{deps:["angular"]}
        // "res":{deps:["routes"]}
	}
});

requirejs(["angular","routes"], function(angular) {

});


