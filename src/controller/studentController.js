const conn = require("../../db"); 
// GET /viewstudent
exports.viewStudents = (req, res) => {
  const name = "Student Panel";

  conn.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.log("Error fetching students:", err);
      return res.status(500).send("Database error");
    }
    res.render("viewstudent", { students: results, name });
  });
};
//delete student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM students WHERE student_id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).send('Database error');
        }

        // Fetch updated list of students
        db.query("SELECT * FROM students", (err2, students) => {
            if (err2) {
                console.error("Error fetching students:", err2);
                return res.status(500).send('Database error');
            }

            res.render('viewstudent', {
                students,
                message: "Student Deleted Successfully......."
            });
        });
    });
};

exports.editStudent = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM students WHERE student_id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error while fetching student:", err);
            return res.send("Update Failed");
        }

        if (result.length === 0) {
            console.warn("No student found with ID:", id);
            return res.send("Student not found");
        }

        console.log(result);
        console.log('isArray result:', Array.isArray(result));

        res.render('editstudent', { student: result[0] });
    });
};


exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { student_name, description, total_credits } = req.body;

    const sql = "UPDATE students SET student_name = ?, description = ?, total_credits = ? WHERE student_id = ?";
    db.query(sql, [student_name, description, total_credits, id], (err, result) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).send("Update failed");
        }

        db.query("SELECT * FROM students", (err2, students) => {
            res.render("viewstudent", {
                students,
                message: "Student Updated Successfully!"
            });
        });
    });
};















exports.homepage=(req,res)=>{
  res.render("home.ejs");
}