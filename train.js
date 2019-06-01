
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

//Button for adding new train schedule
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

    // Saving form input
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#destination-input").val();
    var trainFirstTime = $("#first-time-input").val();
    //moment($("#first-time-input").val().trim();
    //, "HH:mm").format("HH:mm");
   //.val().trim()).format("LT") NEED TIME FORMAT   ;
    var trainFrequency = $("#frequency-input").val();
    //fake-out
    var trainNext = "Next train";
    var trainMinutesAway = "minutes away";
    
    console.log("name is " + trainName);
    console.log("dest is " + trainDestination);
    console.log("1st time is " + trainFirstTime);
    console.log("freq is " + trainFrequency);
    console.log(trainNext);
    console.log(trainMinutesAway);

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
      // Create the new table row
  
      var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text("trainNext"),
        $("<td>").text("trainMinutesAway"),
      );
  
    // Append the new row to the table
    $("#schedule-table > tbody").append(newRow);
   // console.log("newTrain has this: " + newTrain.name + newTrain.dest);
    database.ref().push(newTrain);  //send the train to the database
    //alert("Train Schedule successfully added");

    //Clear all of the text-boxes for next entry
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val(""); 
}); // end add schedule 

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry

 database.ref().on("child_added", function(childSnapshot) { //get existing data from database
 console.log(childSnapshot.val());

  // Store from database back into variables.
  
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().dest;
var trainFirstTime = childSnapshot.val().ftime;
var trainFrequency = childSnapshot.val().frequency;


// Calculate next arrival time
//  FIGURE THIS OUT, USE moment().fromNow();??ago?

//var n = moment.duration(30, 'm'); 
//console.log("30 mins from now is " + n);
//moment.duration().add(Number, String).format;
//moment.duration().as(String);  moment.duration().as('minutes');
//var trainNext = moment().diff(moment(empStart, "X"), "months" true);
var currentTime = moment().format('LT');
console.log("current local time is " + currentTime);