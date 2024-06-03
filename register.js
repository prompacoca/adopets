document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const registerError = document.createElement('p');
    registerError.style.color = 'red';

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = event.target.username.value.trim();
        const password = event.target.password.value.trim();
        const confirmPassword = event.target['confirm-password'].value.trim();

        if (!username || !password || !confirmPassword) {
            registerError.textContent = 'Por favor, preencha todos os campos.';
            registerForm.prepend(registerError);
            return;
        }

        if (password !== confirmPassword) {
            registerError.textContent = 'As senhas não coincidem.';
            registerForm.prepend(registerError);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            registerError.textContent = 'Nome de usuário já existe. <a href="login.html">Clique aqui para fazer login</a>.';
            registerError.style.display = 'block';
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', username);
        registerForm.reset();
        window.location.href = 'index.html';
    });
});
