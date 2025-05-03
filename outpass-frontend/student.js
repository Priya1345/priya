// Initialize outpasses array in localStorage if not exists
if (!localStorage.getItem('outpasses')) {
    localStorage.setItem('outpasses', JSON.stringify([]));
}

document.getElementById('outpassForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const reason = document.getElementById('reason').value;
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    
    // Validate dates
    if (new Date(arrival) <= new Date(departure)) {
        alert('Arrival must be after departure');
        return;
    }
    
    // Create new outpass
    const outpasses = JSON.parse(localStorage.getItem('outpasses'));
    const newOutpass = {
        id: Date.now(),
        student: currentUser.username,
        reason,
        departure,
        arrival,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    outpasses.push(newOutpass);
    localStorage.setItem('outpasses', JSON.stringify(outpasses));
    
    // Refresh table and reset form
    renderOutpasses();
    this.reset();
    alert('Outpass submitted successfully!');
});

function renderOutpasses() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const outpasses = JSON.parse(localStorage.getItem('outpasses'));
    const studentOutpasses = outpasses.filter(op => op.student === currentUser.username);
    const tableBody = document.querySelector('#outpassTable tbody');
    
    tableBody.innerHTML = studentOutpasses.map(outpass => `
        <tr>
            <td>${outpass.id}</td>
            <td>${outpass.reason}</td>
            <td>${formatDateTime(outpass.departure)}</td>
            <td>${formatDateTime(outpass.arrival)}</td>
            <td><span class="badge status-${outpass.status}">${outpass.status}</span></td>
        </tr>
    `).join('');
}

function formatDateTime(datetimeStr) {
    if (!datetimeStr) return '';
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(datetimeStr).toLocaleString('en-US', options);
}

// Initial render
document.addEventListener('DOMContentLoaded', renderOutpasses);