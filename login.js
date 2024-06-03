document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();

        if (!username || !password) {
            loginError.textContent = 'Por favor, preencha todos os campos.';
            loginError.style.display = 'block';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (!user) {
            loginError.textContent = 'Nome de usuário ou senha incorretos.';
            loginError.style.display = 'block';
            return;
        }

        localStorage.setItem('loggedInUser', username);
        window.location.href = 'index.html';
    });
});
