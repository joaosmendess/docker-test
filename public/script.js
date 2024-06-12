document.addEventListener('DOMContentLoaded', () => {
    const userId = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const saveBtn = document.getElementById('saveBtn');
    const userList = document.getElementById('userList');

    const apiUrl = 'http://localhost:3000/users';

    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            const users = await response.json();
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${user.name} (${user.email})
                    <div>
                        <button class="edit-btn" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Editar</button>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">Excluir</button>
                    </div>
                `;
                userList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const saveUser = async () => {
        const id = userId.value;
        const name = nameInput.value;
        const email = emailInput.value;

        if (name && email) {
            const user = { name, email };
            try {
                if (id) {
                    await fetch(`${apiUrl}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user)
                    });
                } else {
                    await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user)
                    });
                }
                resetForm();
                fetchUsers();
            } catch (error) {
                console.error('Erro ao salvar usuário:', error);
            }
        }
    };

    window.editUser = (id, name, email) => {
        userId.value = id;
        nameInput.value = name;
        emailInput.value = email;
        saveBtn.textContent = 'Atualizar';
    };

    window.deleteUser = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            fetchUsers();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const resetForm = () => {
        userId.value = '';
        nameInput.value = '';
        emailInput.value = '';
        saveBtn.textContent = 'Salvar';
    };

    saveBtn.addEventListener('click', saveUser);

    fetchUsers();
});
