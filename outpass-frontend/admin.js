document.addEventListener('DOMContentLoaded', function() {
    renderOutpassTables();
    
    // Approve/Reject event delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('approve-btn')) {
            updateOutpassStatus(e.target.dataset.id, 'approved');
        } else if (e.target.classList.contains('reject-btn')) {
            updateOutpassStatus(e.target.dataset.id, 'rejected');
        }
    });
});

function renderOutpassTables() {
    const outpasses = JSON.parse(localStorage.getItem('outpasses')) || [];
    const pendingTableBody = document.querySelector('#pendingOutpassTable tbody');
    const allTableBody = document.querySelector('#allOutpassTable tbody');
    
    // Pending requests
    pendingTableBody.innerHTML = outpasses
        .filter(op => op.status === 'pending')
        .map(op => `
            <tr>
                <td>${op.id}</td>
                <td>${op.student}</td>
                <td>${op.reason}</td>
                <td>${formatDateTime(op.departure)}</td>
                <td>${formatDateTime(op.arrival)}</td>
                <td>
                    <button class="btn btn-sm btn-success approve-btn" data-id="${op.id}">Approve</button>
                    <button class="btn btn-sm btn-danger reject-btn" data-id="${op.id}">Reject</button>
                </td>
            </tr>
        `).join('');
    
    // All requests
    allTableBody.innerHTML = outpasses.map(op => `
        <tr>
            <td>${op.id}</td>
            <td>${op.student}</td>
            <td>${op.reason}</td>
            <td>${formatDateTime(op.departure)}</td>
            <td><span class="badge status-${op.status}">${op.status}</span></td>
        </tr>
    `).join('');
}

function updateOutpassStatus(id, status) {
    const outpasses = JSON.parse(localStorage.getItem('outpasses'));
    const updated = outpasses.map(op => 
        op.id == id ? {...op, status} : op
    );
    localStorage.setItem('outpasses', JSON.stringify(updated));
    renderOutpassTables();
    alert(`Outpass ${status} successfully!`);
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