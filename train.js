// My web app's Firebase configuration
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
console.log(currentTime);
$(".card-header").append(" Local Time is " + currentTime);

//data in the database?
//var childSnapshot;
//database.ref().on("child_added", function(childSnapshot) { //get existing data from database
//console.log("this is childSnapshot.val " + childSnapshot.val());
//});
// Store from database back into variables.
//trainName = childSnapshot.name;
//trainDestination = childSnapshot.val().dest;
//trainFirstTime = childSnapshot.val().ftime;
//trainFrequency = childSnapshot.val().frequency;


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
  };

    console.log("newTrain has this: " + newTrain.name + newTrain.dest + newTrain.trainNext);
    database.ref().push(newTrain);  //send the train to the database

    // Create the new table row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainNext),
      $("<td>").text(trainMinutesAway),
    );
    
    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);
    

    //Clear form next entry
    //formClear();
    
}); // end add schedule 

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry

//database.ref().on("child_added", function(childSnapshot) { //get existing data from database
//console.log(childSnapshot.val());
//};
// Store from database back into variables.
//var trainName = childSnapshot.val().name;
//var trainDestination = childSnapshot.val().dest;
//var trainFirstTime = childSnapshot.val().ftime;
//var trainFrequency = childSnapshot.val().frequency;

console.log("the current time is " + currentTime);