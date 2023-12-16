function login() {
    const apiUrl = 'https://65774405197926adf62dd78f.mockapi.io/api/vi/user';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          alert('Login successful!');
          window.location.href = 'list.html'; //
        } else {
          alert('Invalid username or password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    login();
});
