// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC1nm-kayGNOY8Ctu-9YWiHP71mhXFD3v0",
  authDomain: "week7-3-4e033.firebaseapp.com",
  databaseURL: "https://week7-3-4e033.firebaseio.com",
  projectId: "week7-3-4e033",
  storageBucket: "week7-3-4e033.appspot.com",
  messagingSenderId: "650286186762",
  appId: "1:650286186762:web:c40d3caeffbc0bc7"
}; //end config

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//Initialize variables
var trainName;
var trainDestination;
var trainFirstTime;
var trainFrequency;
var currentTime = moment().format('LT');
var trainKey;
var deleteButton = "<button type='button' class='btn btn-delete' id='key' onclick='trainDelete()'><span class='fas fa-times' aria-label='Delete'></span></button>";

 function trainDelete() {
   event.preventDefault();
   var deleteKey = $(this).attr("id"); 
   console.log("trainKey" + trainKey);  
   database.ref(trainKey).remove();
   location.reload();
}; //end train delete 

//add current local time to jumbotron
$("#jumbo").append("<br> Local Time is " + currentTime);

//Button for adding new train schedule
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Saving form input
  trainName = $("#train-name-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  trainFirstTime = $("#first-time-input").val().trim();
  trainFrequency = $("#frequency-input").val().trim();

  //time calculations
  var firstTime = trainFirstTime;
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); // Difference between the times
  var tRemainder = diffTime % trainFrequency; // Time apart (remainder)
  var trainMinutesAway = trainFrequency - tRemainder; // Minutes until next train
  var trainNext = moment().add(trainMinutesAway, "minutes").format("hh:mm a"); // time of next train

  // Creating local "temporary" object for holding train data (to send to database)
  var newTrain = {
    name: trainName,
    dest: trainDestination,
    ftime: trainFirstTime,
    frequency: trainFrequency,
    trainNext: trainNext,
    trainMinutesAway: trainMinutesAway,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  }

  database.ref().push(newTrain);  //send the new train to the database


//Clear form for next entry
document.getElementById("form").reset();
}); //end database call  
 
//get data back from database
database.ref().on("child_added", function(childSnapshot) { 
  console.log(childSnapshot.val());
  trainKey = childSnapshot.key;
  console.log("train key = " + trainKey);
  

  // Store from database back into variables for the table.
  trainName = childSnapshot.val().name;
  trainDestination = childSnapshot.val().dest;
  var trainFirstTime = childSnapshot.val().ftime; 
  var trainFrequency = childSnapshot.val().frequency;
  var trainNext = childSnapshot.val().trainNext;
  var trainMinutesAway = childSnapshot.val().trainMinutesAway;
              

// Create the new table row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),
  $("<td>").text(trainNext),
  $("<td>").text(trainMinutesAway),
  $("<td>").html(deleteButton),
);
    
// Append the new row to the table
$("#schedule-table > tbody").append(newRow);
}); // end add train

