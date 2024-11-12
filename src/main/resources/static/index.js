// создание студента
document.getElementById('createForm').addEventListener('submit', function(event) {
	event.preventDefault();
	const formData = new FormData(this);

	fetch(this.action, {
		method: 'POST',
		body: formData
	})
		.then(response => response.text())
		.then(message => {
			document.getElementById('resultText').textContent = message;
		});
});

// обновление студента
document.getElementById('updateForm').addEventListener('submit', function(event) {
	event.preventDefault();
	const formData = new FormData(this);
	const id = document.getElementById('updateId').value;

	// получение старых данных
	fetch(`/students?id=${id}`)
		.then(response => {
			if (!response.ok) throw new Error('Студент не найден');
			return response.json();
		})
		.then(oldData => {
			// обновляем
			fetch(this.action, {
				method: 'POST',
				body: formData
			})
				.then(response => response.text())
				.then(newMessage => {
					// новые данные для отображения
					const newName = document.getElementById('updateName').value;
					const newEmail = document.getElementById('updateEmail').value;
					// показываем старые и новые данные
					document.getElementById('resultText').innerHTML = `
                            <strong>Студент обновлен:</strong><br>
                            <strong>Было:</strong><br>
                            Имя: ${oldData.name}<br>
                            Email: ${oldData.email}<br>
                            <strong>Новые данные:</strong><br>
                            Имя: ${newName}<br>
                            Email: ${newEmail}
                        `;
				});
		})
		.catch(error => {
			document.getElementById('resultText').textContent = error.message;
		});
});

//ПРАКТИКА2: 
//на 4 формi (видалення), якщо вказати рядок замiсть числа, то показати повiдомлення в елемент id="resultText"
//про те, що не вдалося перетворити рядок на число
// удаление студента
document.getElementById('deleteForm').addEventListener('submit', function(event) {
	event.preventDefault();
	const formData = new FormData(this);

	fetch(this.action, {
		method: 'POST',
		body: formData
	})
		.then(response => response.text())
		.then(message => {
			document.getElementById('resultText').textContent = message;
			if (formData.has)
		});
});

// чтение студента и заполнение формы для обновления
document.getElementById('readForm').addEventListener('submit', function(event) {
	event.preventDefault();
	const id = document.getElementById('readId').value;

	fetch(`/students?id=${id}`)
		.then(response => {
			if (!response.ok) throw new Error('Студент не найден');
			return response.json();
		})
		.then(data => {
			// отображаем данные студента в результате и заполняем поля для обновления
			document.getElementById('resultText').innerHTML = `
                        Имя: ${data.name}<br>
                        Email: ${data.email}
                    `;

			// заполняем поля формы для обновления
			document.getElementById('updateId').value = id;
			document.getElementById('updateName').value = data.name;
			document.getElementById('updateEmail').value = data.email;
		})
		.catch(error => {
			document.getElementById('resultText').textContent = error.message;
		});
});

function handleDelete(event) {
	event.preventDefault(); // отмена стандартного поведения формы
	const form = event.target;
	const formData = new FormData(form);

	fetch(form.action, {
		method: 'POST',
		body: formData
	})
		.then(response => {
			if (!response.ok) throw new Error('Ошибка при удалении студента');
			return response.text();
		})
		.then(message => {
			document.getElementById('resultText').textContent = message; // Отображаем сообщение в div
		})
		.catch(error => {
			document.getElementById('resultText').textContent = error.message; // Отображаем ошибку
		});
}