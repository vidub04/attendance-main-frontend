const API = "https://backend-mz6c.onrender.com";

/* ================= SUBJECT-WISE ================= */

async function getSubjectWise() {
    const id = document.getElementById("studentIdInput").value;

    if (!id) {
        alert("Please enter Student ID");
        return;
    }

    const response = await fetch(`${API}/attendance/subjectwise/${id}`);

    if (!response.ok) {
        document.getElementById("subjectResult").innerHTML =
            "<p>Student not found ❌</p>";
        return;
    }

    const data = await response.json();

    let output = `<h3>${data.student_name}</h3>`;

    data.subjects.forEach(subject => {
        output += `
        <div class="card">
        <h3>${subject.subject_name}</h3>
        <p>Total Classes: ${subject.total_classes}</p>
        <p>Present: ${subject.present}</p>
        <p>Attendance: ${subject.percentage}%</p>
        <p class="${subject.safe ? "safe" : "warning"}">
            ${subject.safe ? "Safe ✅" : "Below 75% ⚠️"}
        </p>
    </div>
`;

    });

    document.getElementById("subjectResult").innerHTML = output;
}


/* ================= OVERALL ================= */

async function getOverall() {
    const id = document.getElementById("studentIdInput").value;

    if (!id) {
        alert("Please enter Student ID");
        return;
    }

    const response = await fetch(`${API}/attendance/overall/${id}`);

    if (!response.ok) {
        document.getElementById("overallResult").innerHTML =
            "<p>Student not found ❌</p>";
        return;
    }

    const data = await response.json();

    document.getElementById("overallResult").innerHTML = `
    <div class="card">
        <h3>${data.student_name}</h3>
        <p>Total Classes: ${data.total_classes}</p>
        <p>Present: ${data.present}</p>
        <p>Overall Attendance: ${data.overall_percentage}%</p>
        <p class="${data.safe ? "safe" : "warning"}">
            ${data.safe ? "Safe ✅" : "Below 75% ⚠️"}
        </p>
    </div>
`;

}


/* ================= CLEAR RESULTS ON INPUT CHANGE ================= */

document.getElementById("studentIdInput").addEventListener("input", () => {
    document.getElementById("overallResult").innerHTML = "";
    document.getElementById("subjectResult").innerHTML = "";
});
