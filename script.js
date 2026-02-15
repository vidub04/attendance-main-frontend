const API = "https://backend-mz6c.onrender.com";

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
                <p><strong>Subject:</strong> ${subject.subject_name}</p>
                <p>Total Classes: ${subject.total_classes}</p>
                <p>Present: ${subject.present}</p>
                <p>Percentage: ${subject.percentage}%</p>
                <p>${subject.safe ? "Safe ✅" : "Below 75% ⚠️"}</p>
            </div>
        `;
    });

    document.getElementById("subjectResult").innerHTML = output;
}



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
            <p><strong>Total Classes:</strong> ${data.total_classes}</p>
            <p><strong>Present:</strong> ${data.present}</p>
            <p><strong>Overall Percentage:</strong> ${data.overall_percentage}%</p>
            <p><strong>Status:</strong> ${data.safe ? "Safe ✅" : "Below 75% ⚠️"}</p>
        </div>
    `;
}

document.getElementById("studentIdInput").addEventListener("input", () => {
    document.getElementById("overallResult").innerHTML = "";
    document.getElementById("subjectResult").innerHTML = "";
});



