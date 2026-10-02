const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});
// Add new employee
app.post("/api/employees", (req, res) => {
  const { name, department, position, salary } = req.body;

  const sql = `
    INSERT INTO employees (name, department, position, salary)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, department, position, salary],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: "Failed to add employee",
        });
      }

      res.status(201).json({
        message: "Employee added successfully",
        employeeId: result.insertId,
      });
    }
  );
});
// Delete employee
app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        error: "Failed to delete employee",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });
  });
});
// Get all employees
app.get("/api/employees", (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Update employee
app.put("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, department, position, salary } = req.body;

  const sql = `
    UPDATE employees
    SET name = ?, department = ?, position = ?, salary = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, department, position, salary, id],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: "Failed to update employee",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Employee not found",
        });
      }

      res.json({
        message: "Employee updated successfully",
      });
    }
  );
});