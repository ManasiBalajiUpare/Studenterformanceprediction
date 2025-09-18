document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchBox = document.getElementById("searchBox");
    const courseTable = document.getElementById("courseTable");

    searchForm.addEventListener("submit", async(e) => {
        e.preventDefault(); // prevent page reload
        const query = searchBox.value.trim();

        try {
            const res = await fetch(`/courses/search?query=${encodeURIComponent(query)}`);
            const courses = await res.json();

            courseTable.innerHTML = "";

            if (courses.length === 0) {
                courseTable.innerHTML = `<tr><td colspan="6" class="text-center">No courses found</td></tr>`;
                return;
            }

            courses.forEach(course => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${course.course_id}</td>
                    <td>${course.course_name}</td>
                    <td>${course.description || ""}</td>
                    <td>${course.total_credits}</td>
                    <td>
                        <form action="/deletecourse/${course.course_id}" method="POST" style="display:inline;">
                            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure to delete this course?')">Delete</button>
                        </form>
                    </td>
                    <td>
                        <a href="/editcourse/${course.course_id}" class="btn btn-primary btn-sm">Update</a>
                    </td>
                `;
                courseTable.appendChild(row);
            });

        } catch (err) {
            console.error(err);
        }
    });
});