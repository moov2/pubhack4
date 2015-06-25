var $myData;
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

// Local Storage
var LocalStorage = {
	count: function() {
		return localStorage.length;
	},
	store: function($object) {
		localStorage.setItem(LocalStorage.count() + 1, JSON.stringify($object));
	},
	getAll: function() {
		var arr = [];
		for(var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage[key];
			arr.push(JSON.parse(value));

		}

		return arr;
	}
};


// Interface
var Interface = {
	init: function($data) {
		console.log($data);
		this.data = $data;

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
	countList: function() {
		return $('.cover ul li').size();
	},
	next: function($answer) {
		$selectedImage = $('.cover ul li.selected');

		$selectedIndex = $selectedImage.index();

		// Go to next set
		if($selectedIndex < Interface.countList() - 1) {
			$selectedImage.removeClass('selected');
			$('.cover ul li').eq($selectedIndex + 1).addClass('selected');
		}

		// Store the set if they said YES
		if($answer == 'yes') {
			// console.log();
			LocalStorage.store(this.data[$selectedIndex]);
		}
	}
};

App.json.done(function($data) {
	Interface.init($data);

});

// Go to Next
$('.next').click(function(){

	$this = $(this);
	$answer = $this.attr('attr-data');
	Interface.next($answer);
});