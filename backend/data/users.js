const bcrypt = require("bcryptjs");

const Users = [
  {
    name: "admin",
    email: "admin123@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "user1",
    email: "user1@admin.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user2",
    email: "user2@users.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = Users;
