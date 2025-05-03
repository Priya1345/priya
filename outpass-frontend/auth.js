document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    
    // Simple validation
    if (!username || !role) {
        alert('Please fill all fields');
        return;
    }
    
    // Store user session
    sessionStorage.setItem('currentUser', JSON.stringify({
        username,
        role
    }));
    
    // Redirect based on role
    if (role === 'student') {
        window.location.href = 'student.html';
    } else if (role === 'admin') {
        window.location.href = 'admin.html';
    }
});