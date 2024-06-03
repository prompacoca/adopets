document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const profileName = document.getElementById('profile-name');
    const profilePicture = document.getElementById('profile-picture');
    const profilePicForm = document.getElementById('profile-pic-form');
    const usernameForm = document.getElementById('username-form');
    const passwordForm = document.getElementById('password-form');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username === loggedInUser);

    if (loggedInUser) {
        profileName.textContent = `Nome de Usuário: ${loggedInUser}`;
        
        if (user && user.profilePicture) {
            profilePicture.src = user.profilePicture;
            profilePicture.style.display = 'block';
        }

        profilePicForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fileInput = document.getElementById('profile-pic');
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                const profilePictureURL = event.target.result;
                user.profilePicture = profilePictureURL;
                localStorage.setItem('users', JSON.stringify(users));
                profilePicture.src = profilePictureURL;
                profilePicture.style.display = 'block';
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });

        usernameForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newUsername = document.getElementById('new-username').value.trim();
            if (newUsername && !users.find(u => u.username === newUsername)) {
                user.username = newUsername;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('loggedInUser', newUsername);
                profileName.textContent = `Nome de Usuário: ${newUsername}`;
                alert('Nome de usuário alterado com sucesso.');
            } else {
                alert('Nome de usuário já existe ou é inválido.');
            }
        });

        passwordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newPassword = document.getElementById('new-password').value.trim();
            if (newPassword) {
                user.password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Senha alterada com sucesso.');
            } else {
                alert('Senha inválida.');
            }
        });
    } else {
        window.location.href = 'login.html';
    }
});

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
