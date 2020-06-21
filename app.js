//Book class: Represents a book
class Task {
    constructor(title, desc, due) {
        this.title = title;
        this.desc = desc;
        this.due = due;
    }
}


//UI Class: Handle UI Tasks

class UI {
    static displayTasks() {

        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task));

    }
    static addTaskToList(task) {
        const list = document.querySelector('#task-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.desc}</td>
        <td>${task.due}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteTask(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#task-form');
        container.insertBefore(div, form);
        //Vanish in 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#desc').value = '';
        document.querySelector('#due').value = '';

    }

}


//Store Class : Handles Storage
class Store {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(title) {
        const tasks = Store.getTasks();
        console.log(title);
        tasks.forEach((task, index) => {
            if (task.title === title) {
                tasks.splice(index, 1);

            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}





//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayTasks);
document.querySelector('#task-form').addEventListener('submit', (e) => {

    //prevent actual submit
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value;
    const due = document.querySelector('#due').value;

    //validate
    if (title === '' || desc === '') {
        UI.showAlert('please fill the necessary fields', 'danger');
    } else {

        //Iniatiate book
        const task = new Task(title, desc, due);

        //Add task to UI
        UI.addTaskToList(task);

        Store.addTask(task);

        //show sucess message
        UI.showAlert('Task Added', 'success');

        //ClearFields
        UI.clearFields();
    }
});

//Event :Remove a task

document.querySelector('#task-list').addEventListener('click', (e) => {
    //Remove task from UI
    UI.deleteTask(e.target);

    //Remove Task from storage
    Store.removeTask(e.target.parentElement.parentElement.children[0].textContent);

    UI.showAlert('Task Removed', 'info');
});


$(function () {

    $('#due').datetimepicker();

});


function jan(hello) {
    console.log(hello);
}

jan(() => 10 + 20);
