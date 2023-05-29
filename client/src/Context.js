import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
const Context = React.createContext();

function ContextProvider({ children }) {
  const [columnHeading, setColumnHeading] = useState();
  const [employees, setEmployees] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [sortOrder, setSortOrder] = useState();
  const [sortedList, setSortedList] = useState();

  const [input, setInput] = React.useState({
    employeeId: "",
    name: "",
    department: "",
    salary: "",
  });

  //-------------ADD-------------

  function Add() {
    const totalNumbers = [...employees.map((employee) => employee.employeeId)];

    const { employeeId, name, department, salary } = input;

    //   /*
    //   Add function will carry out following three checks:
    //   1. Input cannot be blank.
    //   2. (Edit Scenario) - if employeeId already exists, then update existing record.
    //   3. (Add Scenario) - if employeeId do not exist, then add new item
    //   */

    if (name === "" || salary === "") {
      alert("Please enter all input fields");
    }

    if (name !== "" && salary !== "") {
      //---EDIT EXISTING RECORD------
      if (totalNumbers.includes(employeeId)) {
        Axios.post("http://localhost:8080/update-employee", input)
          .then((response) => console.log("response: ", response))
          .catch((error) => {
            console.log("error");
          });

        setInput({
          employeeId: "",
          name: "",
          department: "",
          salary: "",
        });

        setUpdateUI((prevValue) => !prevValue);
      }

      //----------ADD NEW RECORD----------
      if (!totalNumbers.includes(employeeId)) {
        Axios.post("http://localhost:8080/add-employee", input)
          .then((response) => console.log("response: ", response))
          .catch((error) => {
            console.log("error");
          });

        setInput({
          employeeId: "",
          name: "",
          department: "",
          salary: "",
        });
        setUpdateUI((prevValue) => !prevValue);
      }
    }
    setSortedList();
  }

  //-------CLEAR-----------

  function Clear() {
    setInput({
      employeeId: "",
      name: "",
      department: "",
      salary: "",
    });
  }

  // //---------EDIT--------------

  function Edit(event) {
    const i = event.target.value;

    setInput(() => {
      if (sortedList !== undefined) {
        const { employeeId, name, department, salary } = sortedList[i];
        return { employeeId, name, department, salary };
      } else {
        const { employeeId, name, department, salary } = employees[i];
        return { employeeId, name, department, salary };
      }
    });
  }

  // //---------Delete--------------

  function Delete(event) {
    const id = event.target.value;

    Axios.post("http://localhost:8080/delete-employee", { id })
      .then((response) => console.log("response: ", response))
      .catch((error) => {
        console.log("error");
      });
    setSortedList();
    setUpdateUI((prevValue) => !prevValue);
  }

  //-------------SORT-------------

  const Sort = async (heading) => {
    let tempArr = employees.sort((a, b) => {
      if (heading === "employeeId" || heading === "salary") {
        if (sortOrder !== `${heading} asc`) {
          setSortOrder(`${heading} asc`);
          return a[heading] - b[heading];
        }

        if (sortOrder !== `${heading} desc`) {
          setSortOrder(`${heading} desc`);
          return b[heading] - a[heading];
        }
      }

      if (heading === "name") {
        if (sortOrder !== `${heading} asc`) {
          setSortOrder(`${heading} asc`);
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
        }
        if (sortOrder !== `${heading} desc`) {
          setSortOrder(`${heading} desc`);
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
        }
      }

      if (heading === "department") {
        if (sortOrder !== `${heading} asc`) {
          if (a.department.toLowerCase() < b.department.toLowerCase()) {
            return -1;
          }
          setSortOrder(`${heading} asc`);
        }

        if (sortOrder !== `${heading} desc`) {
          setSortOrder(`${heading} desc`);
          if (a.department.toLowerCase() > b.department.toLowerCase()) {
            return -1;
          }
        }
      }
    });

    setSortedList(tempArr);
  };

  // //---------HANDLE CHANGE--------------
  function HandleChange(event) {
    const { name, value } = event.target;

    const eNumbers = [...employees.map((employee) => employee.employeeId)];

    let newId;

    eNumbers.length === 0 && (newId = 1);

    eNumbers.length > 0 && (newId = Math.max(...eNumbers) + 1);

    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
        employeeId: eNumbers.includes(input.employeeId)
          ? input.employeeId
          : newId,
      };
    });
  }

  return (
    <Context.Provider
      value={{
        columnHeading,
        setColumnHeading,
        employees,
        setEmployees,
        updateUI,
        setUpdateUI,
        sortedList,
        setSortedList,
        sortOrder,
        setSortOrder,
        input,
        setInput,
        HandleChange,
        Add,
        Clear,
        Edit,
        Delete,
        Sort,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
export { Context };
