const API = "https://backend-mz6c.onrender.com";

async function getSubjectWise() {
    const id = document.getElementById("viewSubjectId").value;

    const response = await fetch(`${API}/attendance/subjectwise/${id}`);
    const data = await response.json();

    let output = `<h3>Student: ${data.student_name}</h3>`;

    data.subjects.forEach(subject => {
        output += `
            <div class="card">
                <p><strong>Subject:</strong> ${subject.subject_name}</p>
                <p><strong>Total Classes:</strong> ${subject.total_classes}</p>
                <p><strong>Present:</strong> ${subject.present}</p>
                <p><strong>Percentage:</strong> ${subject.percentage}%</p>
                <p><strong>Status:</strong> ${subject.safe ? "Safe ✅" : "Below 75% ⚠️"}</p>
            </div>
        `;
    });

    document.getElementById("subjectResult").innerHTML = output;
}


async function getOverall() {
    const id = document.getElementById("viewSubjectId").value;

    const response = await fetch(`${API}/attendance/overall/${id}`);
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

