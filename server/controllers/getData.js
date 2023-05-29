const { Employee } = require("../database.js");

const getData = (req, res, next) => {
  Employee.find({}).then(employee => {
    res.json(employee)
  })
};

module.exports = { getData };
