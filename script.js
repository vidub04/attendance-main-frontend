const API = "https://backend-mz6c.onrender.com";

async function getSubjectWise() {
    const id = document.getElementById("viewSubjectId").value;

    const response = await fetch(`${API}/attendance/subjectwise/${id}`);
    const data = await response.json();

    document.getElementById("subjectResult").innerHTML = `
        <div class="card">
            <p><strong>Total Classes:</strong> ${data.total_classes}</p>
            <p><strong>Present:</strong> ${data.present}</p>
            <p><strong>Percentage:</strong> ${data.percentage}%</p>
            <p><strong>Status:</strong> ${data.safe ? "Safe ✅" : "Below 75% ⚠️"}</p>
        </div>
    `;
}

async function getOverall() {
    const response = await fetch(`${API}/attendance/overall`);
    const data = await response.json();

    document.getElementById("overallResult").innerHTML = `
        <div class="card">
            <p><strong>Overall Percentage:</strong> ${data.overall_percentage}%</p>
            <p><strong>Status:</strong> ${data.safe ? "Safe ✅" : "Below 75% ⚠️"}</p>
        </div>
    `;
}
