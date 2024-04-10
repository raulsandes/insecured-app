document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form[action="/api/login"]');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form input values
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        // Send a POST request to the login endpoint
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the server responds with a JWT token in 'token' field
            const jwtToken = data.token;

            // Set the JWT token in localStorage
            localStorage.setItem('jwtToken', jwtToken);

            // Redirect to another page or perform other actions
            window.location.href = '/api/home'; // Redirect to the home page
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle login error (e.g., display an error message to the user)
        });
    });
});
