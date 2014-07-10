// $("#search").keyup(function(){
// 	$.getJSON('js/getAll.json', function(data){
// 		var actualSearch = $("#search").val();
// 		var lookFor = new RegExp(actualSearch, "i");
// 		var output = "";
// 		// console.log(lookFor)
// 		$.each(data, function(key, val){
// 			if((val.model.search(actualSearch)!== -1)||(val.index.search(actualSearch)!== -1)){
// 				console.log(actualSearch.length);
// 				for(var i = 0; i< actualSearch.length; i++){
// 					if(actualSearch[i] == (val.model[i])||(val.index[i])){
// 				output += '<div class="auto-box">';
// 				output += "<h3>"+ val.model + "</h3>";
// 				output += "<h4>"+ val.index + "</h4>";
// 				// output += "<img src='img/"+ val.thumb + ".png'/>";
// 				output += "<p> Desde $"+ val.price + "<p>";
// 				output += '</div>';
// 					}
// 				}
// 			}	
// 		});
// 		$('#resultados').html(output);
// 	});	
// });


// Sacar el json
// $("#search").keyup(function(){
// 	$.getJSON('js/getAll.json', function(data){
// 		var actualSearch = $("#search").val();
// 		var lookFor = new RegExp(actualSearch, "i");
// 		var output = "";
// 		// console.log(lookFor)
// 		$.each(data, function(key, val){
// 			if((val.model.search(lookFor)!== -1)||(val.index.search(lookFor)!== -1)){
					
// 				output += '<div class="auto-box">';
// 				output += "<h3>"+ val.model + "</h3>";
// 				output += "<h4>"+ val.index + "</h4>";
// 				output += "<img src='img/"+ val.thumb + ".png'/>";
// 				output += "<p> Desde $"+ val.price + "<p>";
// 				output += '</div>';
					
				
// 			}	
// 		});
// 		$('#resultados').html(output);
// 	});	
// });

// $(function(){
// 	$.getJSON('js/getAll.json', function(data){
// 		var template = $("#cars-template").html();
// 		var html = Mustache.to_html(template, data[0]);
// 		$("#resultados").html(html);
// 	});
// });

/*/

(function () {

	var allModels = null;
	var isDataLoaded = false;

	$.getJSON('js/getAll.json', function(data) {
		allModels = data;
		isDataLoaded = true;	
	});	


	$("#search").keyup(function(){
		
		if (!isDataLoaded) {
			return;
		};

		var actualSearch = $("#search").val();
		var lookFor = new RegExp(actualSearch, "i");
		var output = "";
		$('#resultados').empty();
		// console.log(lookFor)
		$.each(allModels, function(key, val){
			if((val.model.search(lookFor)!== -1)||(val.index.search(lookFor)!== -1)){
				var template = $("#cars-template").html();
				var html = Mustache.to_html(template, val);
				$('#resultados').append(html);		
			}	
		})
	});


}())
/*/


//OBJECT ORIENTED SOLUTION

// (function(ns) {

// 	var Application = {
// 		allModels: [],
// 		searchInputField:null,
// 		resultsContainer:null,
// 		initInputText: function() {  
			
// 			var scope = this;

// 			$("#search").keyup(function() {

// 				var actualSearch = scope.searchInputField.val();
// 				var lookFor = new RegExp(actualSearch, "i");
// 				var output = "";
// 				scope.resultsContainer.empty();
				
// 				$.each(scope.allModels, function(key, val) {
// 					if ((val.model.search(lookFor) !== -1) || (val.index.search(lookFor) !== -1)) {
// 						scope.resultsContainer.append(scope.getTemplate(val));
// 					}
// 				})
// 			});
// 		},
// 		getTemplate: function (value) {
// 			var template = $("#cars-template").html();
// 			return Mustache.to_html(template, value);
// 		}
// 		getData: function() {
// 			var scope = this;
// 			$.getJSON('js/getAll.json', function(data) {
// 				scope.allModels = data;
// 				scope.initInputText();
// 			})
// 		},
// 		init: function() {
// 			this.searchInputField = $("#search");
// 			this.resultsContainer = $('#resultados');
// 			this.getData();
// 		}

// 	}

// 	Application.init();


// 	ns.application = Application;

// }(window))
//*/

(function(ns) {

	var Application = {
		allModels: [],
		searchInputField:null,
		resultsContainer:null,
		modelsToshow: [],
		initInputText: function() {
			
			var scope = this;

			$("#search").keyup(function() {

				var actualSearch = scope.searchInputField.val();

				var filter_array = scope.filterModels(actualSearch);
				scope.resultsContainer.empty();

				for(x = 0; x < filter_array.length; x ++){
					scope.resultsContainer.append(scope.getTemplate(filter_array[x]));
				}
				
			});
		},
		filterModels: function (value) {
			var results = [];

			for (var i = this.allModels.length - 1; i >= 0; i--) {
				var item = this.allModels[i];
				var modelName = item.model.toLowerCase();
				var version =  item.index.toLowerCase();
				var searchValue = value.toLowerCase();
				if((version.indexOf(searchValue) !== -1)||(modelName.indexOf(searchValue) !== -1)){ 
					results.push(item);
				console.log(results);
				};
			}

			return results;
		},
		getTemplate: function (value) {
			var template = $("#cars-template").html();
			return Mustache.to_html(template, value);
		},
		getData: function() {
			var scope = this;
			$.getJSON('js/getAll.json', function(data) {
				scope.allModels = data;
				scope.initInputText();
			})
		},
		init: function() {
			this.searchInputField = $("#search");
			this.resultsContainer = $('#resultados');
			this.getData();
		}

	}

	Application.init();


	ns.application = Application;

}(window))

// USANDO UNDERSCORE JS
// (function(ns) {

// 	var Application = {
// 		allModels: [],
// 		searchInputField:null,
// 		resultsContainer:null,
// 		modelsToshow: [],
// 		initInputText: function() {
			
// 			var scope = this;

// 			$("#search").keyup(function() {

// 				var actualSearch = scope.searchInputField.val();

// 				//var filter_array = scope.filterModels(actualSearch);
				
// 				var filter_array = _.filter(scope.allModels, function(item){ 
// 					var modelName = item.model.toLowerCase();
// 					var version =  item.index.toLowerCase();
// 					var searchValue = actualSearch.toLowerCase();
// 					if((version.indexOf(searchValue) !== -1)||(modelName.indexOf(searchValue) !== -1)){ 
// 						return item;
// 					};
// 				});
				
// 				scope.resultsContainer.empty();

// 				_.each(filter_array, function (item) {
// 					scope.resultsContainer.append(scope.getTemplate(item));
// 				});
				
// 			});
// 		},
// 		filterModels: function (value) {
// 			var results = [];

// 			for (var i = this.allModels.length - 1; i >= 0; i--) {
// 				var item = this.allModels[i];
// 				var modelName = item.model.toLowerCase();
// 				var version =  item.index.toLowerCase();
// 				var searchValue = value.toLowerCase();
// 				if((version.indexOf(searchValue) !== -1)||(modelName.indexOf(searchValue) !== -1)){ 
// 					results.push(item);
// 				};
// 			}

// 			return results;
// 		},
// 		getTemplate: function (value) {
// 			var template = $("#cars-template").html();
// 			return Mustache.to_html(template, value);
// 		},
// 		getData: function() {
// 			var scope = this;
// 			$.getJSON('js/getAll.json', function(data) {
// 				scope.allModels = data;
// 				scope.initInputText();
// 			})
// 		},
// 		init: function() {
// 			this.searchInputField = $("#search");
// 			this.resultsContainer = $('#resultados');
// 			this.getData();
// 		}

// 	}

// 	Application.init();


// 	ns.application = Application;

// }(window))


