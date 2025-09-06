const pool = require("../../db"); 

// GET /viewstudent
exports.viewStudents = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.render("viewstudent", { students: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

// DELETE student

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Student not found");
    }

    const [students] = await pool.query("SELECT * FROM users");

    res.render("viewstudent", {
      students,
      message: "✅ Student Deleted Successfully!"
    });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).send("Database error");
  }
};
// GET /students/edit/:id
exports.editStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);

    if (result.length === 0) {
      return res.send("Student not found");
    }

    res.render("editstudent", { student: result[0], message: null });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).send("Database error");
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, address, contact, qualification, course, skills } = req.body;

  try {
    const sql = `
      UPDATE users
      SET name = ?, email = ?, address = ?, contact = ?, qualification = ?, course = ?, skills = ?
      WHERE user_id = ?
    `;
    await pool.query(sql, [name, email, address, contact, qualification, course, skills, id]);

    const [result] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);

    res.render("editstudent", {
      student: result[0],
      message: "Student Updated Successfully!"
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).send("Update failed");
  }
};

//enanle disable button
exports.toggleStudentStatus = async (req, res) => {
  const { id } = req.params;
  try {
    // Get current status
    const [student] = await pool.query("SELECT disabled FROM users WHERE user_id = ?", [id]);

    if (student.length === 0) {
      return res.status(404).send("Student not found");
    }

    // Toggle status (1 → 0, 0 → 1)
    const newStatus = student[0].disabled === 1 ? 0 : 1;

    await pool.query("UPDATE users SET disabled = ? WHERE user_id = ?", [newStatus, id]);

    // Refresh list
    const [students] = await pool.query("SELECT * FROM users");
    res.render("viewstudent", { students, message: "✅ Student status updated!" });
  } catch (err) {
    console.error("Error toggling status:", err);
    res.status(500).send("Database error");
  }
};

// Homepage
exports.homepage = (req, res) => {
  res.render("home.ejs");
};
