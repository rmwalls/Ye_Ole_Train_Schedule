// 1. Initialize Firebase

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
var database = firebase.databaseURL();

// Steps to complete:
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate when the next train will come and how many minutes away it is
// 5. use moment.js formatting 


// 2. Button for adding new train schedule
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Saving form input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTime = moment($("#first-time-input").val().trim(), "MM/DD/YYYY").format("X") //NEED TIME FORMAT   ;
    var trainFrequency = $("#frequency-input").val().trim();

  // Creating local "temporary" object for holding train data (to send to database)
    var newTrain = {
      name: trainName,
      dest: trainDestination,
      ftime: trainFirstTime,
      frequency: trainFrequency
    };
    database.ref().push(newTrain);  //send the train to the database
    alert("Train Schedule successfully added");

  // Clear all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
}); // end add schedule

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry

  database.ref().on("child_added", function(childSnapshot) { //get existing data from database
  console.log(childSnapshot.val());

  // Store everything into variables.
  
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().dest;
  var trainFirstTime = childSnapshot.val().ftime;
  var trainFrequency = childSnapshot.val().frequency;


  // Prettify the train time NEEDED? FIGURE OUT
	//var trainFirstPretty = moment.unix(empStart).format("MM/DD/YYYY");



  // Calculate next arrival time
//  FIGURE THIS OUT, USE moment().fromNow();??ago?
// var n = moment.duration().add(30, 'm'); ????
//moment.duration().add(Number, String);
//moment.duration().as(String);  moment.duration().as('minutes');
//var trainNext = moment().diff(moment(empStart, "X"), "months" true);
//console.log(empMonths);


//WANT TO USE LOCAL TIME W/OUT SECONDS (LT)<--input
  
 // Calculate the minutes away FIGURE THIS OUT

//var empBilled = empMonths * empRate;

  //console.log(empBilled);

  // Create the new table row

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
    	$("<td>").text(trainFrequency),
     	$("<td>").text(trainFirstPretty),
      $("<td>").text(trainMinutesAway),
    );



  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
