var firebaseConfig = {
    apiKey: "AIzaSyC1nm-kayGNOY8Ctu-9YWiHP71mhXFD3v0",
    authDomain: "week7-3-4e033.firebaseapp.com",
    databaseURL: "https://week7-3-4e033.firebaseio.com",
    projectId: "week7-3-4e033",
    storageBucket: "week7-3-4e033.appspot.com",
    messagingSenderId: "650286186762",
    appId: "1:650286186762:web:c40d3caeffbc0bc7"
  }; 
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
    $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
      var trainName = $("#train-name-input").val();
      console.log("name is " + trainName);
      var trainDestination = $("#destination-input").val();
      console.log("dest is " + trainDestination);
      var trainFirstTime = $("#first-time-input").val();
      
      console.log("1st time is " + trainFirstTime);
      
      var trainFrequency = $("#frequency-input").val();
      console.log("freq is " + trainFrequency);
      
      var trainNext = "Next train";
      var trainMinutesAway = "minutes away";

    
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDestination),
          $("<td>").text(trainFrequency),
           $("<td>").text(trainNext),
          $("<td>").text(trainMinutesAway),
        );
    
      
      $("#schedule-table > table").append(newRow);
    
  }); 

  var currentTime = moment().format('LT');
  console.log("current local time is " + currentTime);