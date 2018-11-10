
//function to not load javascript until htmls loads and page is ready
$( document ).ready(function() {

    //establish starter variables
    var trainName = ""; 
    var destination = "";
    var frequency = 0; 
    var nextArrival = 0; 
    var minutesAway = 0;
    

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4GLTMegSYCW7DkZ6knl6wI_jLuaDRaqk",
    authDomain: "train-schedule-45898.firebaseapp.com",
    databaseURL: "https://train-schedule-45898.firebaseio.com",
    projectId: "train-schedule-45898",
    storageBucket: "train-schedule-45898.appspot.com",
    messagingSenderId: "643061639145",
  };

  //initializing firebase config
  firebase.initializeApp(config);
   //Bring firebase down to connect for manipulation
  var database = firebase.database();

  //receive data from firebase and store in variables
  database.ref().on("child_added", function (snapshot) {
    
  trainName = snapshot.val().trainNameServ;
  destination = snapshot.val().destinationServ;
  frequency = snapshot.val().frequencyServ;
  nextArrival = snapshot.val().nextArrivalServ;
  minutesAway = snapshot.val().minutesAwayServ;

           
  //Sppend data to table
  $("#tbody").append("<tr> <td>" + trainName + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + nextArrival + "</td> <td>" + minutesAway + "</td> </tr>");

});

  //trigger button to run when data is submitted
  $("#submit-button").on("click", function (event) {
      event.preventDefault()

      //Getting data from form fields and putting it in variables
      trainName = $("#trainName-input").val()
      destination = $("#destination-input").val()
      firstTime = $("#first-time-input").val()
      frequency = $("#frequency-input").val()
      
      // First time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
      
    //Next arrival time
    var nextArrival = moment().add(tMinutesTillTrain, 'minutes').format("hh:mm A");
    
    //Firebase command to push data in variables to firebase database
    database.ref().push({
      trainNameServ: trainName,
      destinationServ: destination,
      frequencyServ: frequency,
      nextArrivalServ: nextArrival,
      minutesAwayServ: tMinutesTillTrain,
    });
  });
  
  


});