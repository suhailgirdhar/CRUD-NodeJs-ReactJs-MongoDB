const { employeeSchema } = require("../database.js");

const getFields = (req, res, next) => {
    let tempArr = []

    for (let field in employeeSchema.obj) {
        tempArr.push(field)
    }
    
    res.json(tempArr)
};

module.exports = { getFields };
