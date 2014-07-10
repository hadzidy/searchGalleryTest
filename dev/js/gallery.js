(function(ns){

	var Galleryapp = {
		imagesUrl: null,

		urlAssing: function(){
			var scope = this;
			for(var i = 0; i < scope.imagesUrl.length; i++){
				scope.photoCont.append(scope.getTemplate(scope.imagesUrl[i]));
			}
		},

		getTemplate: function (value) {
			var template = $("#gall-template").html();
			return Mustache.to_html(template, value);
		},
	
		getData: function() {
			var scope = this;
			$.getJSON('js/gallery.json', function(data) {
				scope.imagesUrl = data.version.images;
				scope.urlAssing();
			// for(var i = 0; i < scope.imagesUrl.length; i++){
			// 	scope.photoCont.append(scope.getTemplate(scope.imagesUrl[i]));
			// }
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