document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form[action="/login"]');

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

            if (data.token && data.redirectTo) {
                // Save token to local storage or session storage if needed
                const jwtToken = data.token;

                localStorage.setItem('jwtToken', jwtToken);
                // Redirect the user to the specified route
                window.location.href = data.redirectTo;
              }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle login error (e.g., display an error message to the user)
        });
    });
});
