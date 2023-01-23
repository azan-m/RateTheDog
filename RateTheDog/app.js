$(document).ready(function() {
  // Fetches a random dog image from the API and display it on the page
  $.get("https://dog.ceo/api/breeds/image/random", function(data) {
    $("#dog-image").attr("src", data.message);
  });

  // Adds a form element that lets users submit their rating
  $("#rating-form").submit(function(e) {
    e.preventDefault();
    var rating = $("#rating").val();
    // add code to cache the dog and rating
    var dog = $("#dog-image").attr("src");
    addToHistory(dog, rating);
    $.get("https://dog.ceo/api/breeds/image/random", function(data) {
      $("#dog-image").attr("src", data.message);
    });
    $("#rating").val("");
  });

  // Adds a section to the app where you can review the history of your dog ratings with both the picture and rating
  var history = [];
  var sortDirection = "desc";
  function addToHistory(dog, rating) {
    history.push({dog: dog, rating: rating});
    sortHistory();
    displayHistory();
  }
  function sortHistory() {
    history.sort(function(a, b) {
      if (sortDirection === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
  }
  function displayHistory() {
    var historyList = "<ul id='history-list'>";
    for (var i = 0; i < history.length; i++) {
      historyList += "<li><img src='" + history[i].dog + "' width='100' height='100'><br>" + history[i].rating + "</li>";
    }
    historyList += "</ul>";
    $("#history").html(historyList);
  }
  //Adds sorting of the pictures into ascending order or descending order of ratings
  $("#sort-history").click(function() {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
    sortHistory();
    displayHistory();
  });

  $("#sort-direction").change(function() {
    sortDirection = $(this).val();
    sortHistory();
    displayHistory();
});

//Fetches the list of dog breeds from the API (FIX)
$.get("https://dog.ceo/api/breeds/list", function(data) {
    var breeds = data.message;
    var options = "";
    for (var i = 0; i < breeds.length; i++) {
      options += "<option value='" + breeds[i] + "'>" + breeds[i] + "</option>";
    }
    $("#breed-select").html(options);
  });
//Plugs in the users choice of breed to get the specified dog image
  $("#breed-select").change(function() {
    var breed = $(this).val();
    $.get("https://dog.ceo/api/breed/" + breed + "/images/random", function(data) {
      $("#dog-image").attr("src", data.message);
    });
  });
});

/*
// Fetches the list of dog breeds from the "dog-breeds.txt" file
fetch("dog-breeds.txt")
  .then(response => response.text())
  .then(text => {
    // Split the text by new line
    var breeds = text.split("\n");
    // Create options for the select element
    var options = "";
    for (var i = 0; i < breeds.length; i++) {
      options += "<option value='" + breeds[i] + "'>" + breeds[i] + "</option>";
    }
    // Adds the options to the select element
    $("#breed-select").html(options);
  })
  .catch(err => console.log(err)); //to print the error message
  
// Listens for the change event on the select element
$("#breed-select").change(function() {
    // Get the selected breed
    var breed = $(this).val();
    // Makes a request to the API to get a random image of the selected breed
    var url = "https://dog.ceo/api/breed/" + breed + "/images/random";
    $.get(url, function(data) {
      // Updates the image on the page
      $("#dog-image").attr("src", data.message);
    });
});
});
*/

