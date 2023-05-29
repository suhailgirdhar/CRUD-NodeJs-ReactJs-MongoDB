const { Employee } = require("../database.js");

const updateEmployee = (req, res, next) => {

  const { employeeId, name, department, salary } = req.body;

  console.log(employeeId, name, department, salary);

  Employee.findOneAndUpdate(
    { employeeId },
    { name, department, salary },
    { new: true }
  )
    .then((employee) => {
      console.log(employee);
      console.log("updated");
    })
    .catch((err) => console.log("error :", err));
};

module.exports = { updateEmployee };
