const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// --------- CONNECT MONGOOSE ---------

const { connectMongoose } = require("./database.js");
connectMongoose("ducktaleDB");

// --------- CONFIGURED MODULES -------------

const { getData } = require("./controllers/getData.js");
const { getFields } = require("./controllers/getFields.js");
const { addEmployee } = require("./controllers/addEmployee.js");
const { deleteEmployee } = require("./controllers/deleteEmployee.js");
const { updateEmployee } = require("./controllers/updateEmployee.js");

app.get("/", getData)

app.get("/get-fields", getFields)

app.post("/add-employee", addEmployee);

app.post("/delete-employee", deleteEmployee);

app.post("/update-employee", updateEmployee);

const port = 8080;
app.listen(port, () => console.log(`server is running on port ${port}`));
