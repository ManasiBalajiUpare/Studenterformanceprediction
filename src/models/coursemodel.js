/*let conn = require("../../db.js");
exports.getSearchCourseByName = (course_name) => {
    return new Promise((resolver, reject) => {
        conn.query("select * from courses where course_name like '%" + course_name + "%'", (err, result) => {
            if (err) {
                reject(err);
            } else {

                resolver(result);
            }
        });

    });

} */
let conn = require("../../db.js");

exports.getSearchCourseByName = (course_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM courses WHERE course_name LIKE ?", [`%${course_name}%`], // ✅ use parameterized query to avoid SQL injection
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};