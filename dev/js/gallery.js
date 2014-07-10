(function(ns){

	var Galleryapp = {

		getTemplate: function (value) {
			var template = $("#gall-template").html();
			return Mustache.to_html(template, value);
		},
	

		getData: function() {
			var scope = this;
			$.getJSON('js/gallery.json', function(data) {
				scope.images = data;
				scope.photoCont.append(scope.getTemplate(scope.images.version.images[1]));
				console.log(scope.images.version.images[1]);
				// version.images[x];
			})
		},		


		init: function(){
			this.photoCont = $('#aqui');
			this.getData();
		},

	};

	Galleryapp.init();
	ns.galleryapp = Galleryapp;

}(window))

// (function(){
// 	$.getJSON('js/gallery.json', function(data){
// 		console.log("hola");
// 		var template = $("#gall-template").html();
// 		var html = Mustache.to_html(template, data);
// 		$("#aqui").html(html);

// 	});
// });