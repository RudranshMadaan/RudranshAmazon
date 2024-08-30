document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // Check login status on page load
    if (localStorage.getItem('loggedIn')) {
        loginTab.textContent = 'Logout';
        loginTab.id = 'logoutTab';
    }

    // Open the modal
    loginTab.addEventListener('click', (e) => {
        e.preventDefault();
        if (localStorage.getItem('loggedIn')) {
            localStorage.removeItem('loggedIn');
            location.reload();
        } else {
            loginModal.style.display = 'block';
        }
    });

    // Close the modal
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (e) => {
        if (e.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation
        if (username && password) {
            localStorage.setItem('loggedIn', 'true');
            loginMessage.textContent = `Welcome, ${username}! You have successfully logged in.`;
            loginMessage.style.color = 'green';
            setTimeout(() => {
                loginModal.style.display = 'none';
                location.reload();
            }, 1000);
        } else {
            loginMessage.textContent = 'Please enter both username and password.';
            loginMessage.style.color = 'red';
        }
    });

    // Restrict access to pages
    const restrictedPages = ['about.html', 'howitworks.html', 'products.html', 'contact.html', 'survey.html'];
    const currentPage = location.pathname.split('/').pop();

    if (restrictedPages.includes(currentPage) && !localStorage.getItem('loggedIn')) {
        alert('You must be logged in to access this page.');
        window.location.href = 'index.html';
    }
});
