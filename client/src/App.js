import { useEffect, useState, useContext, useMemo } from "react";
import { Context } from "./Context";
import Axios from "axios";
import "./App.css";

function App() {
  const {
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
  } = useContext(Context);

  //-------------USE EFFECT STATEMENTS-------------

  useEffect(() => {
    Axios.get("http://localhost:8080/get-fields")
      .then((res) => {
        setColumnHeading(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateUI]);

  useEffect(() => {
    Axios.get("http://localhost:8080/")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateUI]);

  // -------- CUSTOM CONTROLLERS ----------

  const inputValue = (heading) => {
    for (let field in input) {
      if (field === heading) {
        if (input[field] === "") return "";
        return input[heading];
      }
    }
  };

  const inputType = (heading) => {
    let type;
    if (heading === "salary") {
      type = "number";
    } else {
      type = "text";
    }

    return type;
  };

  // --------- RETURN STATEMENT ----------

  return (
    <div>
      <h1>Employees Data</h1>

      <table>
        <tbody>
          <tr>
            {columnHeading &&
              columnHeading.map((heading, index) => {
                return (
                  <th key={index} name={heading} onClick={() => Sort(heading)}>
                    <span>{heading}</span>

                    {sortOrder && sortOrder.includes(heading) ? (
                      sortOrder.includes("asc") ? (
                        <i className="fa-solid fa-arrow-up-long"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down-long"></i>
                      )
                    ) : (
                      <i className="fa-solid fa-arrows-up-down"></i>
                    )}
                  </th>
                );
              })}
          </tr>

          <tr>
            {columnHeading &&
              columnHeading.map((heading, index) => {
                return heading === "employeeId" ? (
                  <td key={index}>
                    <p>{input.employeeId}</p>
                  </td>
                ) : (
                  <td key={index}>
                    {heading === "department" ? (
                      <select
                        name={heading}
                        value={inputValue(heading)}
                        onChange={HandleChange}
                      >
                        <option value="Front-end">Front-end</option>
                        <option value="Back-end">Back-end</option>
                      </select>
                    ) : (
                      <input
                        type={inputType(heading)}
                        name={heading}
                        placeholder={heading}
                        value={inputValue(heading)}
                        onChange={HandleChange}
                      />
                    )}
                  </td>
                );
              })}
            <td>
              <button onClick={Add}>Add</button>
            </td>
            <td>
              <button onClick={Clear}>Clear</button>
            </td>
          </tr>

          {sortedList !== undefined ? (
            sortedList.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button onClick={Edit} value={index}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={Delete} value={employee._id}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : employees.length > 0 ? (
            employees.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button onClick={Edit} value={index}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={Delete} value={employee._id}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
