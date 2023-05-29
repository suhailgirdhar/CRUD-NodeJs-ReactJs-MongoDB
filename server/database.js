const mongoose = require("mongoose");

// ----------- CONNECT DATABASE -------------

const connectMongoose = (db) => {
  mongoose
    .connect(`mongodb://localhost:27017/${db}`)
    .then(() => console.log(`Connected to ${db}`))
    .catch((err) => console.log("Not Connected to DB or " + err));
};

// --------- EMPLOYEE SCHEMA -----------

const employeeSchema = mongoose.Schema({
  employeeId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});

// --------- USER MODEL -----------

const Employee = mongoose.model("Employee", employeeSchema);

// --------- EXPORTS -----------

module.exports = { connectMongoose, employeeSchema, Employee };
