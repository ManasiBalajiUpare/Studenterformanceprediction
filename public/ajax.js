let searchCourse = (str) => {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    xhttp.open("get", "/searchCourseByName?course_name=" + str, true);

    xhttp.send();
}