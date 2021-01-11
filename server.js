const express = require("express");
const path = require("path");
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Global variables - empty array to store waitlist and customers
const customers = [];

const waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the proper pages
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Sends waitlist and customer list to client
app.get("/api/tables", function (req, res) {
  return res.json(customers);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Create new customer and pushes to waitlist or customer array
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCustomer
  newReservation.routeName = newReservation.customerName
    .replace(/\s+/g, "")
    .toLowerCase();

  //console.log(newReservation);
  // If customer array is greater than 5, push to waitlist instead
  if (customers.length < 5) {
    customers.push(newReservation);
    newReservation.type = "Reservation";
  } else {
    waitlist.push(newReservation);
    newReservation.type = "Waitlist";
  }
  // returns json
  res.json(newReservation);
});

app.post("/api/waitlist", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newWaitlist = req.body;

  // Using a RegEx Pattern to remove spaces from newCustomer
  newWaitlist.routeName = newWaitlist.customerName
    .replace(/\s+/g, "")
    .toLowerCase();

  console.log(newWaitlist);

  waitlist.push(newWaitlist);

  res.json(newWaitlist);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
