document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const profileName = document.getElementById('profile-name');
    const profilePicture = document.getElementById('profile-picture');
    const profilePicForm = document.getElementById('profile-pic-form');
    const usernameForm = document.getElementById('username-form');
    const passwordForm = document.getElementById('password-form');
    const contactLinkForm = document.getElementById('contact-link-form');
    const deleteAccountBtn = document.getElementById('delete-account');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username === loggedInUser);

    if (loggedInUser) {
        profileName.textContent = loggedInUser;
        
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
                profileName.textContent = newUsername;
                alert('Nome de usuário alterado com sucesso.');
                document.getElementById('new-username').value = '';
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
                document.getElementById('new-password').value = '';
            } else {
                alert('Senha inválida.');
            }
        });

        contactLinkForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newContactLink = document.getElementById('new-contact-link').value.trim();
            if (newContactLink) {
                user.contactLink = newContactLink;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Link de contato alterado com sucesso.');
                document.getElementById('new-contact-link').value = '';
            } else {
                alert('Link de contato inválido.');
            }
        });

        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja excluir sua conta?')) {
                const userIndex = users.findIndex(u => u.username === loggedInUser);
                if (userIndex !== -1) {
                    users.splice(userIndex, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.removeItem('loggedInUser');
                    alert('Conta excluída com sucesso.');
                    window.location.href = 'index.html';
                }
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
