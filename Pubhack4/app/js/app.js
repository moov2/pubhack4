
// App
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


// Interface
var Interface = {
	init: function($data) {
		console.log($data);

		$imageLists = $('.cover ul');

		var $count = 0;
		var $class;
		$data.forEach(function(row) {

			if($count === 0) {
				$class = 'selected';
			} else {
				$class = '';
			}

			$imageLists.append('<li class="'+ $class +'"><img src="'+ row.imageUrl +'"/><div class="title">'+ row.title +'</div></li>');

			$count++;
		});

	},
	count: function() {
		return $('.cover ul li').size();
	},
	next: function() {
		$selectedImage = $('.cover ul li.selected');

		$selectedIndex = $selectedImage.index();


		console.log(Interface.count());
		console.log($selectedIndex);

		if($selectedIndex < Interface.count() - 1) {
			$selectedImage.removeClass('selected');
			$('.cover ul li').eq($selectedIndex + 1).addClass('selected');
		}
	}
};

App.json.done(function($data) {

	Interface.init($data);

});

// Go to Next
$('.next').click(function(){

	Interface.next();
});