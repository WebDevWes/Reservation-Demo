const express = require("express");
const path = require("path");
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const customers = [];

const waitlist = [];

  
  // Routes
  // =============================================================
  
  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  // Displays all characters
  app.get("/api/tables", function(req, res) {
    return res.json(customers);
  });

  app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });
  
  // Displays a single character, or returns false
//   app.get("/api/characters/:character", function(req, res) {
//     var chosen = req.params.character;
  
//     console.log(chosen);
  
//     for (var i = 0; i < characters.length; i++) {
//       if (chosen === characters[i].routeName) {
//         return res.json(characters[i]);
//       }
//     }
  
//     return res.json(false);
//   });
  
  // Create New Characters - takes in JSON input
  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
   
    // Using a RegEx Pattern to remove spaces from newCustomer
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();
  
    console.log(newReservation);
    if (customers.length < 5){
        customers.push(newReservation)
        newReservation.type = "Reservation"
    }
    else{
        waitlist.push(newReservation);
        newReservation.type = "Waitlist"
    }
    res.json(newReservation);
    
  });

  app.post("/api/waitlist", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newWaitlist = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCustomer
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newWaitlist.routeName = newWaitlist.customerName.replace(/\s+/g, "").toLowerCase();
  
    console.log(newWaitlist);
  
    waitlist.push(newWaitlist);
  
    res.json(newWaitlist);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });