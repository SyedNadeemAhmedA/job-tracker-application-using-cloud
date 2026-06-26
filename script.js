// ========== LOGIN FUNCTIONALITY ==========
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("loggedIn", "true");
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        showError("Invalid username or password. Try admin / admin123");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

// Check if user is already logged in
if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
}

// ========== APPLICATION MANAGEMENT ==========
const form = document.getElementById("applicationForm");
const applicationList = document.getElementById("applicationList");

let applications = JSON.parse(localStorage.getItem("applications")) || [];

// Display applications on page load
displayApplications();

// Add new application
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    if (company && role && date) {
        applications.push({
            company,
            role,
            date,
            status
        });

        localStorage.setItem("applications", JSON.stringify(applications));
        displayApplications();
        form.reset();
        showSuccess("Application added successfully!");
    }
});

function displayApplications() {
    applicationList.innerHTML = "";

    if (applications.length === 0) {
        applicationList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-inbox" style="font-size: 32px; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
                    No applications yet. Add one to get started!
                </td>
            </tr>
        `;
        updateStats();
        drawChart();
        return;
    }

    applications.forEach((app, index) => {
        const statusClass = getStatusClass(app.status);
        const formattedDate = formatDate(app.date);

        applicationList.innerHTML += `
            <tr>
                <td>
                    <strong>${escapeHtml(app.company)}</strong>
                </td>
                <td>${escapeHtml(app.role)}</td>
                <td>${formattedDate}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="status-badge ${statusClass}">
                            ${app.status}
                        </span>
                        <select onchange="updateStatus(${index}, this.value)" style="min-width: 140px;">
                            <option value="Applied" ${app.status === "Applied" ? "selected" : ""}>Applied</option>
                            <option value="Shortlisted" ${app.status === "Shortlisted" ? "selected" : ""}>Shortlisted</option>
                            <option value="Interview Scheduled" ${app.status === "Interview Scheduled" ? "selected" : ""}>Interview Scheduled</option>
                            <option value="Rejected" ${app.status === "Rejected" ? "selected" : ""}>Rejected</option>
                            <option value="Selected" ${app.status === "Selected" ? "selected" : ""}>Selected</option>
                        </select>
                    </div>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteApplication(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateStats();
    drawChart();
}

// ========== SEARCH FUNCTIONALITY ==========
document.getElementById("search").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    if (keyword === "") {
        displayApplications();
        return;
    }

    applicationList.innerHTML = "";
    const filtered = applications.filter(app =>
        app.company.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
        applicationList.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-search" style="font-size: 32px; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
                    No applications found for "${escapeHtml(keyword)}"
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach((app, index) => {
        const statusClass = getStatusClass(app.status);
        const formattedDate = formatDate(app.date);
        const actualIndex = applications.indexOf(app);

        applicationList.innerHTML += `
            <tr>
                <td><strong>${escapeHtml(app.company)}</strong></td>
                <td>${escapeHtml(app.role)}</td>
                <td>${formattedDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${app.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteApplication(${actualIndex})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
});

// ========== STATISTICS ==========
function updateStats() {
    const total = applications.length;
    const interviews = applications.filter(app => app.status === "Interview Scheduled").length;
    const rejected = applications.filter(app => app.status === "Rejected").length;
    const selected = applications.filter(app => app.status === "Selected").length;

    document.getElementById("total").innerText = total;
    document.getElementById("interviews").innerText = interviews;
    document.getElementById("rejected").innerText = rejected;
    document.getElementById("selected").innerText = selected;
}

// ========== UPDATE AND DELETE ==========
function updateStatus(index, newStatus) {
    applications[index].status = newStatus;
    localStorage.setItem("applications", JSON.stringify(applications));
    displayApplications();
}

function deleteApplication(index) {
    if (confirm("Are you sure you want to delete this application?")) {
        applications.splice(index, 1);
        localStorage.setItem("applications", JSON.stringify(applications));
        displayApplications();
        showSuccess("Application deleted");
    }
}

// ========== CHART ==========
function drawChart() {
    const applied = applications.filter(app => app.status === "Applied").length;
    const shortlisted = applications.filter(app => app.status === "Shortlisted").length;
    const interview = applications.filter(app => app.status === "Interview Scheduled").length;
    const rejected = applications.filter(app => app.status === "Rejected").length;
    const selected = applications.filter(app => app.status === "Selected").length;

    const ctx = document.getElementById('myChart');

    if (window.myChartInstance) {
        window.myChartInstance.destroy();
    }

    window.myChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Applied', 'Shortlisted', 'Interview', 'Rejected', 'Selected'],
            datasets: [{
                label: 'Number of Applications',
                data: [applied, shortlisted, interview, rejected, selected],
                backgroundColor: [
                    '#0ea5e9',  // Applied - Blue
                    '#06b6d4',  // Shortlisted - Cyan
                    '#f59e0b',  // Interview - Amber
                    '#ef4444',  // Rejected - Red
                    '#10b981'   // Selected - Green
                ],
                borderColor: 'transparent',
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#f1f5f9',
                        font: { size: 14, weight: '600' },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f1f5f9',
                    bodyColor: '#cbd5e1',
                    borderColor: '#475569',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(applied, shortlisted, interview, rejected, selected) + 2,
                    grid: {
                        color: '#334155',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: { size: 12 },
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#cbd5e1',
                        font: { size: 12, weight: '500' }
                    }
                }
            }
        }
    });
}

// ========== UTILITY FUNCTIONS ==========

function getStatusClass(status) {
    const statusMap = {
        'Applied': 'status-applied',
        'Shortlisted': 'status-shortlisted',
        'Interview Scheduled': 'status-interview',
        'Rejected': 'status-rejected',
        'Selected': 'status-selected'
    };
    return statusMap[status] || 'status-applied';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background: #10b981; color: white;' 
            : 'background: #ef4444; color: white;'}
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);