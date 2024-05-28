document.addEventListener('DOMContentLoaded', function() {
    const petsList = document.getElementById('pets-list');

    function loadPets() {
        const storedPets = localStorage.getItem('pets');
        return storedPets ? JSON.parse(storedPets) : [];
    }

    function savePets(pets) {
        localStorage.setItem('pets', JSON.stringify(pets));
    }

    let pets = loadPets();

    function displayPets() {
        petsList.innerHTML = '';
        pets.forEach((pet, index) => {
            const petCard = document.createElement('div');
            petCard.classList.add('pet-card');

            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h2>${pet.name}</h2>
                <p><strong>Idade:</strong> ${pet.age} anos</p>
                <p><strong>Raça:</strong> ${pet.breed}</p>
                <p>${pet.description}</p>
                <button class="remove-pet" data-index="${index}">Remover</button>
            `;

            petsList.appendChild(petCard);
        });

        document.querySelectorAll('.remove-pet').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removePet(index);
            });
        });
    }

    function removePet(index) {
        pets.splice(index, 1);
        savePets(pets);
        displayPets();
    }

    const petForm = document.getElementById('pet-form');
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red';

    function isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    petForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = event.target.name.value.trim();
        const age = event.target.age.value.trim();
        const breed = event.target.breed.value.trim();
        const image = event.target.image.value.trim();
        const description = event.target.description.value.trim();

        if (!name || !age || !breed || !image || !description) {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            petForm.prepend(errorMessage);
            return;
        }

        if (!isValidURL(image)) {
            errorMessage.textContent = 'Por favor, insira uma URL válida para a imagem.';
            petForm.prepend(errorMessage);
            return;
        }

        const newPet = {
            name,
            age: parseInt(age),
            breed,
            image,
            description
        };

        pets.push(newPet);
        savePets(pets);
        displayPets();
        petForm.reset();
        if (errorMessage.parentNode) {
            errorMessage.parentNode.removeChild(errorMessage);
        }
    });

    displayPets();
});
