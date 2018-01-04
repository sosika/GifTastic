
var animals = ["Elephant", "Fox", "Lion"];

//-------------------------------------------------------------
//	Insert function for still gif
//-------------------------------------------------------------

String.prototype.insert = function (index, string) {
  var ind = index < 0 ? this.length + index  :  index;
  return  this.substring(0, ind) + string + this.substring(ind, this.length);
};

//-------------------------------------------------------------
//	Create buttons
//-------------------------------------------------------------
function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#animalButtons").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("animal-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#animalButtons").append(a);
        }
      }

//-------------------------------------------------------------
//	Grap gifs
//-------------------------------------------------------------
function displayAnimalInfo() {

        var animal = $(this).attr("animal-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        		animal + "&api_key=5LtcSFnJ8jHlV449Iu4zgap8aFft8yyA&limit=10";
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        		var results = response.data;
          
	          	for (var i = 0; i < results.length; i++) {

	          		if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

	            	var animalDiv = $("<div>");

	            	var p = $("<p>").text("Rating: " + results[i].rating);

	            	var animalImage = $("<img>");
	            
	            	animalImage.attr("src", results[i].images.fixed_height_still.url);
	            	animalDiv.append(p);
	            	animalDiv.append(animalImage);
	            	// console.log(results[i].images.fixed_height_small_still.url);

	            	$("#gifs-appear-here").prepend(animalDiv);
	            	} // End rating condition
        		} // End for loop
//-------------------------------------------------------------
//	Change still state
//-------------------------------------------------------------

        		$("img").on("click", function() {
			      // alert("you click image");
			      var imgURL = $(this).attr('src');
			      
			      if (imgURL.substr(-5, 1) === "s") {
			      	var newImgURL = imgURL.replace("_s", "");
			      	$(this).attr("src", newImgURL);
			      }
			      else {
			      	var newImgURL = imgURL.insert(-4,'_s');
			      	$(this).attr("src", newImgURL);
			      }
        		}); // End of img click function
        	}); // End response
    }; // End displayAnimalInfo function

//-------------------------------------------------------------
//	Take animal input
//-------------------------------------------------------------

$("#addAnimal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        $("#animal-input").val("");
});

//-------------------------------------------------------------
//	Button on click event
//-------------------------------------------------------------

$(document).on("click", ".animal", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

