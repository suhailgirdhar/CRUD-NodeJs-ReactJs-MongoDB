const { Employee } = require("../database.js");

const addEmployee = (req, res, next) => {
  const { employeeId, name, department, salary } = req.body;

  try {
    Employee.insertMany({ employeeId, name, department, salary }, { new: true })
    .then((employee) => console.log(employee))
    .catch((error) => {
      console.log("error error error error :" , error);
    });
  } catch (error) {
    console.log("inside catch error :" , error);
    return next()
  }

};

module.exports = { addEmployee };
