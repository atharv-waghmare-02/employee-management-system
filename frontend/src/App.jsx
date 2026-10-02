import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    position: "",
    salary: "",
  });

  // Get employees from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);
  const addEmployee = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://localhost:5000/api/employees",
      newEmployee
    );

    alert("Employee added successfully!");

    // Get updated employee list
    const response = await axios.get(
      "http://localhost:5000/api/employees"
    );

    setEmployees(response.data);

    // Clear form
    setNewEmployee({
      name: "",
      department: "",
      position: "",
      salary: "",
    });

    setShowForm(false);

  } catch (error) {
    console.error("Error adding employee:", error);

    alert("Failed to add employee");
  }
};

  return (
    <div className="app">

      <header>
        <h1>Employee Management System</h1>
        <p>Manage your employees easily</p>
      </header>

      <main>

        <div className="dashboard">

          <div className="card">
            <h3>Total Employees</h3>
            <p>{employees.length}</p>
          </div>

          <div className="card">
            <h3>Departments</h3>
            <p>
              {new Set(employees.map((employee) => employee.department)).size}
            </p>
          </div>

          <div className="card">
            <h3>Active Employees</h3>
            <p>{employees.length}</p>
          </div>

        </div>

        <div className="employee-section">

          <div className="section-header">

            <h2>Employee List</h2>

            <button onClick={() => setShowForm(!showForm)}>
              + Add Employee
            </button>

          </div>

          {showForm && (
            <form onSubmit={addEmployee} className="employee-form">

              <input
                type="text"
                placeholder="Employee Name"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Department"
                value={newEmployee.department}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    department: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Position"
                value={newEmployee.position}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    position: e.target.value,
                  })
                }
                required
              />

              <input
                type="number"
                placeholder="Salary"
                value={newEmployee.salary}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    salary: e.target.value,
                  })
                }
                required
              />

              <button type="submit">
                Save Employee
              </button>

            </form>
          )}
          {editingEmployee && (
  <form onSubmit={updateEmployee} className="employee-form">


    <h3>Edit Employee</h3>


    <input
      type="text"
      placeholder="Employee Name"
      value={editingEmployee.name}
      onChange={(e) =>
        setEditingEmployee({
          ...editingEmployee,
          name: e.target.value,
        })
      }
      required
    />


    <input
      type="text"
      placeholder="Department"
      value={editingEmployee.department}
      onChange={(e) =>
        setEditingEmployee({
          ...editingEmployee,
          department: e.target.value,
        })
      }
      required
    />


    <input
      type="text"
      placeholder="Position"
      value={editingEmployee.position}
      onChange={(e) =>
        setEditingEmployee({
          ...editingEmployee,
          position: e.target.value,
        })
      }
      required
    />


    <input
      type="number"
      placeholder="Salary"
      value={editingEmployee.salary}
      onChange={(e) =>
        setEditingEmployee({
          ...editingEmployee,
          salary: e.target.value,
        })
      }
      required
    />


    <button type="submit">
      Update Employee
    </button>


    <button
      type="button"
      onClick={() => setEditingEmployee(null)}
    >
      Cancel
    </button>


  </form>
)}

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {employees.map((employee) => (

                <tr key={employee.id}>

                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>₹{employee.salary}</td>
                  <td>₹{employee.salary}</td>

                  <td>
                  <button
                  className="edit"
                  onClick={() => setEditingEmployee({ ...employee })}
                  >
                  Edit
                  </button>

                  <button
                  className="delete"
                  onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

const deleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await axios.delete(
      `http://localhost:5000/api/employees/${id}`
    );

    alert("Employee deleted successfully!");

    const response = await axios.get(
      "http://localhost:5000/api/employees"
    );

    setEmployees(response.data);

  } catch (error) {
    console.error("Error deleting employee:", error);

    alert("Failed to delete employee");
  }
};

const updateEmployee = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `http://localhost:5000/api/employees/${editingEmployee.id}`,
      editingEmployee
    );

    alert("Employee updated successfully!");

    const response = await axios.get(
      "http://localhost:5000/api/employees"
    );

    setEmployees(response.data);
    setEditingEmployee(null);

  } catch (error) {
    console.error("Error updating employee:", error);

    alert("Failed to update employee");
  }
};

export default App;

