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

		this.positionX = 0;
		this.count = 0;

		$data.forEach(function(row) {
			$imageLists.append('<li><div class="item"><img src="'+ row.imageUrl +'"/><div class="title">'+ row.title +'</div></div></li>');
		});

	},
	appendImages: function() {
		console.log(this.datatoLoad);
	},
	countList: function() {
		return $('.cover ul li').size();
	},
	next: function($answer) {
		var $selectedImage = $($('.cover ul li')[this.count]),
			selectedIndex = $selectedImage.index();

		this.positionX += $selectedImage.outerWidth(true);

		$('.cover ul').css('transform', 'translateX(-' + this.positionX + 'px)');

		// Store the set if they said YES
		if($answer === 'yes') {
			LocalStorage.store(this.data[selectedIndex]);
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
