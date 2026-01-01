// Fetch stored students or initialize empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

// Render students on page load
displayStudents();

// It lets submission of form by using getElementById method.
form.addEventListener("submit", function (details) {
    details.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const editIndex = document.getElementById("editIndex").value;

    // Validation
  // Empty field check
if (
    name === "" ||
    studentId === "" ||
    email === "" ||
    contact === ""
) {
    alert("All fields are required");
    return;
}

// Name Validation 
//Condition 2 matching - Name must contain only letters and spaces.
for (let char of name) {

    // Allow uppercase letters
    if (char >= 'A' && char <= 'Z') {
        continue;
    }

    // Allow lowercase letters
    if (char >= 'a' && char <= 'z') {
        continue;
    }

    // Allow space
    if (char === ' ') {
        continue;
    }

    // If any other character is found
    alert("Name must contain only characters");
    return;
}

//Student ID Validation
// Condition 2 matching - Student ID must contain only digits.
for (let char of studentId) {
    if (char < '0' || char > '9') {
        alert("Student ID must contain only numbers");
        return;
    }
}

//Email Validation
let atPosition = email.indexOf("@");
let dotPosition = email.lastIndexOf(".");

// Condition 3 matching - Email must contain @ and .(dot) in correct order.
if (atPosition < 1) {
    alert("Enter a valid email address");
    return;
}

if (dotPosition < atPosition + 2) {
    alert("Enter a valid email address");
    return;
}

if (dotPosition === email.length - 1) {
    alert("Enter a valid email address");
    return;
}

// Contact Number Validation
// Foe checking that contact must contain only digits.
for (let char of contact) {
    if (char < '0' || char > '9') {
        alert("Contact number must contain only digits");
        return;
    }
}

// Condition 4 matching  - Contact must have at least 10 digits.
if (contact.length < 10) {
    alert("Contact number must have at least 10 digits");
    return;
}


    const studentData = { name, studentId, email, contact };

    if (editIndex === "") {
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        document.getElementById("editIndex").value = "";
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    displayStudents();
});

// For Displaying students data and to update InnerHTML method is used. 
function displayStudents() {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        const div = document.createElement("div");
        div.className = "student-card";

        div.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Contact:</strong> ${student.contact}</p>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;

        studentList.appendChild(div);
    });
}

// It Edits the stored student record.As we have given ID to each section in HTML file we have used (getElementById) method.
function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    document.getElementById("editIndex").value = index;
}

// For Deleting student record.
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}