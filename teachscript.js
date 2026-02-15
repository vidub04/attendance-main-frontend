const API = "https://backend-mz6c.onrender.com";

/* ================= LOAD SUBJECTS ================= */

async function loadSubjects() {
    const response = await fetch(`${API}/subjects`);
    const subjects = await response.json();
    const select = document.getElementById("subjectSelect");

    if (!select) {
        console.error("subjectSelect not found in HTML");
        return;
    }

    select.innerHTML = `<option value="">Select Subject</option>`;

    subjects.forEach(subject => {
        select.innerHTML += `
            <option value="${subject.id}">
                ${subject.name}
            </option>
        `;
    });
}

/* ================= LOAD STUDENTS TABLE ================= */

async function loadStudentsTable() {
    const subjectId = document.getElementById("subjectSelect").value;

    if (!subjectId) return;

    const response = await fetch(`${API}/students`);
    const students = await response.json();

    const tbody = document.querySelector("#attendanceTable tbody");

    if (!tbody) {
        console.error("attendanceTable tbody not found");
        return;
    }

    tbody.innerHTML = "";

    students.forEach(student => {
        tbody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>
                    <input type="radio" 
                           name="attendance_${student.id}" 
                           value="present">
                </td>
                <td>
                    <input type="radio" 
                           name="attendance_${student.id}" 
                           value="absent">
                </td>
            </tr>
        `;
    });
}

/*add subject */

function addSubject() {
    const subjectName = document.getElementById("subjectName").value;

    fetch("https://backend-mz6c.onrender.com/subjects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: subjectName
        })
    })
    .then(res => res.json())
    .then(data => {
        alert("Subject added successfully!");
    })
    .catch(error => console.error(error));
}

/*add student */

async function addStudent() {
    const name = document.getElementById("studentName").value;

    if (!name) {
        alert("Please enter student name");
        return;
    }

    try {
        const response = await fetch("https://backend-mz6c.onrender.com/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        document.getElementById("studentMessage").innerHTML =
            "✅ Student added successfully";

        document.getElementById("studentName").value = "";

        // Reload student list in table
        loadStudents();

    } catch (error) {
        console.error(error);
        document.getElementById("studentMessage").innerHTML =
            "❌ Error adding student";
    }
}


/* ================= SUBMIT ATTENDANCE ================= */

async function submitAttendance() {
    const subjectId = document.getElementById("subjectSelect").value;

    if (!subjectId) {
        alert("Select subject first");
        return;
    }

    const response = await fetch(`${API}/students`);
    const students = await response.json();

    for (let student of students) {
        const selected = document.querySelector(
            `input[name="attendance_${student.id}"]:checked`
        );

        if (selected) {
            await fetch(
                `${API}/attendance?student_id=${student.id}&subject_id=${subjectId}&status=${selected.value}`,
                { method: "POST" }
            );
        }
    }

    document.getElementById("attendanceMessage").innerHTML =
        "<p>Attendance submitted successfully ✅</p>";
}

/* ================= LOAD ON PAGE START ================= */

window.onload = loadSubjects;
