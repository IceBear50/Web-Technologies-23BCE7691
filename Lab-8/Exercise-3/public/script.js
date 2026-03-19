class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        const info = `Course: ${this.courseName}, Instructor: ${this.instructor}`;
        console.log(info);
        return info;
    }
}

const course1 = new Course("Web Technologies", "Dr. Kumar");

const courseInfoDiv = document.getElementById("courseInfo");
courseInfoDiv.textContent = course1.displayCourse();

const enrollCourse = new Promise((resolve, reject) => {
    let seatsAvailable = true;

    if (seatsAvailable) {
        resolve("Enrollment Successful");
    } else {
        reject("Course Full");
    }
});

const statusHeader = document.getElementById("statusMessage");

enrollCourse
    .then(msg => {
        console.log(msg);
        statusHeader.textContent = msg;
        statusHeader.style.color = "green";
    })
    .catch(err => {
        console.log(err);
        statusHeader.textContent = err;
        statusHeader.style.color = "red";
    });