var App = (function () {

	// Public variables	
	var defaults = {
		jsonURL: 'sample.json'
	};


	// Methods
	var getJson = function() {
		return $.getJSON(defaults.jsonURL);
	};

	return {
		json : getJson()
	};


})();

App.json.done(function($data) {
	console.log($data);
});

