const fs = require("fs");
const jwt = require("jsonwebtoken");
const { clone } = require("ramda");
const userdb = JSON.parse(fs.readFileSync("./data/users.json", "UTF-8"));
const SECRET_KEY = "M_SECRET";

// Check if the user exists
function isAuthenticated({ Username, Password }) {
  return (
    userdb.users.findIndex(
      (user) => user.Username === Username && user.Password === Password
    ) !== -1
  );
}

// Create a token
function createResponse(Username) {
  let user = clone(userdb.users.find((user) => user.Username === Username));

  delete user.Password;

  return {
    isAuthenticated: true,
    user,
  };
}

module.exports = { isAuthenticated, createResponse };
