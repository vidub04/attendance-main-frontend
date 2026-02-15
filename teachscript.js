const API = "https://backend-mz6c.onrender.com";

/* ================= LOAD STUDENTS & SUBJECTS ================= */

async function loadData() {
    await loadStudents();
    await loadSubjects();
}

async function loadStudents() {
    const response = await fetch(`${API}/students`);
    const students = await response.json();

    const select = document.getElementById("studentSelect");
    select.innerHTML = "";

    students.forEach(student => {
        select.innerHTML += `
            <option value="${student.id}">
                ${student.name}
            </option>
        `;
    });
}

async function loadSubjects() {
    const response = await fetch(`${API}/subjects`);
    const subjects = await response.json();

    const select = document.getElementById("subjectSelect");
    select.innerHTML = "";

    subjects.forEach(subject => {
        select.innerHTML += `
            <option value="${subject.id}">
                ${subject.name}
            </option>
        `;
    });
}

window.onload = loadData;


/* ================= ADD SUBJECT ================= */

async function addSubject() {
    const name = document.getElementById("subjectName").value;

    if (!name) {
        alert("Enter subject name");
        return;
    }

    await fetch(`${API}/subjects?name=${name}`, {
        method: "POST"
    });

    document.getElementById("subjectMessage").innerHTML =
        "<p>Subject added successfully ✅</p>";

    document.getElementById("subjectName").value = "";
    loadSubjects();
}


/* ================= ADD STUDENT ================= */

async function addStudent() {
    const name = document.getElementById("studentName").value;

    if (!name) {
        alert("Enter student name");
        return;
    }

    await fetch(`${API}/students?name=${name}`, {
        method: "POST"
    });

    document.getElementById("studentMessage").innerHTML =
        "<p>Student added successfully ✅</p>";

    document.getElementById("studentName").value = "";
    loadStudents();
}


/* ================= MARK ATTENDANCE ================= */

async function markAttendance() {
    const studentId = document.getElementById("studentSelect").value;
    const subjectId = document.getElementById("subjectSelect").value;
    const status = document.getElementById("statusSelect").value;

    if (!studentId || !subjectId) {
        alert("Select student and subject");
        return;
    }

    const response = await fetch(
        `${API}/attendance?student_id=${studentId}&subject_id=${subjectId}&status=${status}`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        alert("Failed to mark attendance ❌");
        return;
    }

    document.getElementById("attendanceMessage").innerHTML =
        "<p>Attendance marked successfully ✅</p>";
}


