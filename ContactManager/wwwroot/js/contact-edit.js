const popover = document.getElementById('addContactPopover');

const form = document.getElementById('contactForm');

const idInput = document.getElementById('contactId');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('jobTitle');
const phoneInput = document.getElementById('phone');
const birthInput = document.getElementById('birthDate');

const avatarPreview = document.getElementById('avatarPreview');

const createTitle = document.querySelector('.create-title');
const editTitle = document.querySelector('.edit-title');

const saveButton = document.querySelector('.btn-save');

document.querySelector('.btn-add').addEventListener('click', () => {

    form.action = '/Contacts/Create';

    form.reset();

    idInput.value = '';

    avatarPreview.style.backgroundImage = '';
    avatarPreview.textContent = '+';

    popover.classList.remove('edit-mode');

    createTitle.style.display = 'block';
    editTitle.style.display = 'none';

    saveButton.textContent = 'Save';
});

document.querySelectorAll('.edit-contact-btn').forEach(btn => {

    btn.addEventListener('click', () => {

        form.action = '/Contacts/Update';

        idInput.value = btn.dataset.id;

        nameInput.value = btn.dataset.name;
        jobInput.value = btn.dataset.job;
        phoneInput.value = btn.dataset.phone;
        birthInput.value = btn.dataset.birth;

        if (btn.dataset.image) {
            avatarPreview.style.backgroundImage = `url('${btn.dataset.image}')`;
            avatarPreview.style.backgroundSize = 'cover';
            avatarPreview.style.backgroundPosition = 'center';
            avatarPreview.textContent = '';
        }
        else {
            avatarPreview.style.backgroundImage = '';
            avatarPreview.textContent = '+';
        }

        popover.classList.add('edit-mode');

        createTitle.style.display = 'none';
        editTitle.style.display = 'block';

        saveButton.textContent = 'Update';
    });

});

document.querySelector('input[name="ImageFile"]').addEventListener('change', e => {

    const file = e.target.files[0];

    if (file) {
        avatarPreview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
        avatarPreview.style.backgroundSize = 'cover';
        avatarPreview.style.backgroundPosition = 'center';
        avatarPreview.textContent = '';
    }
});