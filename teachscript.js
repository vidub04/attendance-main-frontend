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

async function addSubject() {
    const subjectName = document.getElementById("subjectName").value;

    if (!subjectName) {
        alert("Enter subject name");
        return;
    }

    try {
        const response = await fetch(
            `https://backend-mz6c.onrender.com/subjects?name=${subjectName}`,
            {
                method: "POST"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add subject");
        }

        alert("Subject added successfully!");
        document.getElementById("subjectName").value = "";
        loadSubjects();

    } catch (error) {
        console.error(error);
        alert("Error adding subject");
    }
}


/*add student */

async function addStudent() {
    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;

    if (!name || !email) {
        alert("Please enter both name and email");
        return;
    }

    try {
        const response = await fetch(
            `https://backend-mz6c.onrender.com/students?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
            {
                method: "POST"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        document.getElementById("studentMessage").innerHTML =
            "✅ Student added successfully";

        document.getElementById("studentName").value = "";
        document.getElementById("studentEmail").value = "";

        loadStudentsTable();


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
