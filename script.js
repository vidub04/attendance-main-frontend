const API = "https://YOUR_BACKEND_URL.onrender.com";

// Add Student
async function addStudent() {
    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;

    const res = await fetch(`${API}/students?name=${name}&email=${email}`, {
        method: "POST"
    });

    alert("Student Added");
}

// Add Subject
async function addSubject() {
    const name = document.getElementById("subjectName").value;

    const res = await fetch(`${API}/subjects?name=${name}`, {
        method: "POST"
    });

    alert("Subject Added");
}

// Mark Attendance
async function markAttendance() {
    const studentId = document.getElementById("studentId").value;
    const subjectId = document.getElementById("subjectId").value;
    const status = document.getElementById("status").value;

    await fetch(`${API}/attendance?student_id=${studentId}&subject_id=${subjectId}&status=${status}`, {
        method: "POST"
    });

    alert("Attendance Marked");
}

// Subject Wise
async function getSubjectWise() {
    const id = document.getElementById("viewStudentId").value;

    const res = await fetch(`${API}/attendance/subjectwise/${id}`);
    const data = await res.json();

    document.getElementById("output").innerText =
        JSON.stringify(data, null, 2);
}

// Overall
async function getOverall() {
    const id = document.getElementById("viewStudentId").value;

    const res = await fetch(`${API}/attendance/overall/${id}`);
    const data = await res.json();

    document.getElementById("output").innerText =
        JSON.stringify(data, null, 2);
}

// AI Advice
async function getAdvice() {
    const id = document.getElementById("viewStudentId").value;

    const res = await fetch(`${API}/ai/advice/${id}`);
    const data = await res.json();

    document.getElementById("output").innerText =
        JSON.stringify(data, null, 2);
}
