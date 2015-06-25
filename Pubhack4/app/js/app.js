// App
var App = {

	// Methods
	getJson: function($date) {
		console.log('clicked');

		if(!$date) {
			$date = '2000';
		}

		json = $.getJSON('http://moov2-pubhack4.azurewebsites.net/api/feed/' + $date).done(function($data) {
			Interface.init($data);
			console.log('Data loaded');
		});
		return {json: json};
	}
};

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
		$('.date-view').hide();
		$('.cover-view').show();


		this.data = $data;
		this.datatoLoad = $data;

		$imageLists = $('.cover ul');

		var $count = 0;
		var $class;
		this.data.forEach(function(row) {

			if($count === 0) {
				$class = 'selected';
			} else {
				$class = '';
			}

			$loadCount = 0;
			if($loadCount < 1) {
				$imageLists.append('<li class="'+ $class +'"><img src="'+ row.imageUrl +'"/><div class="title">'+ row.title +'</div></li>');

				$('li.selected img').on('load',function(){
					Interface.appendImages();
				});
			}
			$count++;
		});

	},
	appendImages: function() {
		console.log(this.datatoLoad);
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
			LocalStorage.store(this.data[$selectedIndex]);
		}
	}
};

// Go to Next
$('.next').click(function(){

	$this = $(this);
	$answer = $this.attr('attr-data');
	Interface.next($answer);
});

$('button').click(function() {
	$value = $('input').val();
	App.getJson($value);
});