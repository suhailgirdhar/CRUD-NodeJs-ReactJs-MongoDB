const { Employee } = require("../database.js");

const deleteEmployee = (req, res, next) => {
  const _id = req.body.id;
 
  Employee.deleteOne({_id}).then((response) => {
    console.log(response);
    console.log("deleted");
    return next()
  }).catch((error) => {
    console.log("error error error : ", error)
  })
};

module.exports = { deleteEmployee };
