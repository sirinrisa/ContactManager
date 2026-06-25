const deleteButtons = document.querySelectorAll('.delete-contact-btn');

const deleteIdsContainer = document.getElementById('deleteIdsContainer');

const deleteForm = document.getElementById('deleteForm');




deleteButtons.forEach(btn => {

    btn.addEventListener('click', () => {

        deleteForm.action = '/Contacts/Delete';

        deleteIdsContainer.innerHTML = `
            <input type="hidden" name="id" value="${btn.dataset.id}">
        `;

    });

});




const deleteSelectedBtn = document.querySelector('.btn-delete-selected');

deleteSelectedBtn.addEventListener('click', () => {

    deleteForm.action = '/Contacts/DeleteSelected';

    deleteIdsContainer.innerHTML = '';

    const checked = document.querySelectorAll('.contact-checkbox:checked');

    checked.forEach(cb => {

        deleteIdsContainer.innerHTML += `
            <input type="hidden" name="ids" value="${cb.value}">
        `;

    });

});