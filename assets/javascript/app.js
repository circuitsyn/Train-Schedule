$( document ).ready(function() {


    var trainName; 
    var destination;
    var frequency; 
    var nextArrival; 
    var minutesAway;
    

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4GLTMegSYCW7DkZ6knl6wI_jLuaDRaqk",
    authDomain: "train-schedule-45898.firebaseapp.com",
    databaseURL: "https://train-schedule-45898.firebaseio.com",
    projectId: "train-schedule-45898",
    storageBucket: "train-schedule-45898.appspot.com",
    messagingSenderId: "643061639145",
  };

  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  database.ref().on("child_added", function (snapshot) {
  
    if (snapshot.child("trainName").exists()) {
      trainName = snapshot.val().trainNameServ;
      destination = snapshot.val().destinationServ;
      frequency = snapshot.val().frequencyServ;
      nextArrival = snapshot.val().nextArrivalServ;

        var monthsWorked = moment().diff(moment(startDate), "months");
        

        $("#tbody").append("<tr> <td>" + trainName + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + nextArrival + "</td> <td>" + rate + "</td> <td>" + minutesAway + "</td> </tr>");
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


  $("#submit-button").on("click", function (event) {
      event.preventDefault()
      console.log("submitted")
      trainName = $("#trainName-input").val()
      destination = $("#destination-input").val()
      firstTime = $("#first-time-input").val()
      frequency = $("#frequency-input").val()
      console.log('Name: ' + trainName);
      console.log('destination: ' + destination);
      console.log('initial time: ' + firstTime);
      console.log('frequency: ' + frequency);

      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

      // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      database.ref().push({
        trainNameServ: trainName,
        destinationServ: destination,
        frequencyServ: frequency,
        nextArrivalServ: nextArrival,
        minutesAwayServ: tMinutesTillTrain,
      })
  })
  
  


});