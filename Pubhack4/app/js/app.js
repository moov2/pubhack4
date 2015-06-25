var App = (function () {

	// Public variables	
	var defaults = {
		jsonURL: 'http://local.pubhack4.com/sample.json'
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

