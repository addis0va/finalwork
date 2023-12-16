function register() {
    const apiUrl = 'https://65774405197926adf62dd78f.mockapi.io/api/vi/user';
    const newUsername = document.getElementById('username').value;
    const newEmail = document.getElementById('email').value
    const newPassword = document.getElementById('password').value;

    // Check if the username is not empty
    if (!newUsername.trim()) {
        alert('Please enter a username.');
       
        return;
    }
    if (!newEmail.trim()) {
        alert('Please enter an e-mail.');
        return;
    }
    // Check if the password is not empty
    if (!newPassword.trim()) {
        alert('Please enter a password.');
        return;
    }

    // Perform the registration
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: newUsername,
            email: newEmail,
            password: newPassword,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Registration successful!');
        window.location.href = 'list.html';
        // Optionally, you can redirect the user to the login page or perform other actions.
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Registration failed. Please try again.');
    });
}

