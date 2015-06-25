// App
var App = {

	// Methods
	getJson: function($date) {
		console.log($date);
		if(!$date) {
			$date = '2000';
		}

		json = $.getJSON('http://moov2-pubhack4.azurewebsites.net/api/feed/' + $date).done(function($data) {
			$('.js-current-year').html($date);
			Interface.init($data);
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

		loadCount = 0;

		// Load images
		Interface.appendImages();


	},
	appendImages: function() {
		row = this.datatoLoad[0];

		if(row) {
			$imageLists.append('<li><div class="item"><img src="'+ row.imageUrl +'"/><div class="title">'+ row.title +'</div></div></li>');
			$('li:last-child img').on('load',function(){
				Interface.appendImages();
			});

			this.datatoLoad.splice(0, 1);
		}
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
	},

	showLoading: function () {
		$('.js-year-selection').css('display', 'none');
		$('.js-year-loading').css('display', 'block');
	}
};

// Go to Next
$('.next').click(function(){
	$this = $(this);
	$answer = $this.attr('attr-data');
	Interface.next($answer);
});

$('.js-button-select-year').click(function() {
	$value = $('.js-input-year').val();
	Interface.showLoading();
	App.getJson($value);
});

$('.js-input-file-photo').change(function () {
	$('.js-upload-photo-form').submit();
});

$('.js-upload-photo-form').on('submit', function (e) {
	e.preventDefault();

	Interface.showLoading();

	$.ajax({
		url: '/api/face/upload',
		type: 'POST',
		data: new FormData(this),
		contentType: false,
		cache: false,
		processData:false,
		success: function(data) {
			if (!data || data.length === 0) {
				return;
			}

    		var range =  Math.round(Math.random() * (20 - 10) + 10),
				age = data[0].age - range;

			App.getJson(new Date().getFullYear() - age);
		}
	});
});

$('.js-take-snapshot').on("click", function () {
    Webcam.snap(function (data_uri) { processSnapshot(data_uri); });
});

var processSnapshot = function (data_uri) {
    console.log(data_uri);
    $.ajax({
        url: '/api/face/base64',
        type: 'POST',
        data: { image: data_uri },
        cache: false,
        success: function (data) {
            console.log("Success!");
            if (!data || data.length === 0) {
                return;
            }

            var range = Math.round(Math.random() * (20 - 10) + 10),
                age = data[0].age - range;

            App.getJson(new Date().getFullYear() - age);
        },
        error: function (data) {
            console.log(data);
        }
    });
}
function webcam_activate() {
    Webcam.set({
        width: 320,
        height: 240,
        dest_width: 320,
        dest_height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('.js-webcam');
    $('#activate-cam').hide();
    $('.js-take-snapshot').show();
}

$(document).ready(function () {
    $("#accordion").accordion();
});
