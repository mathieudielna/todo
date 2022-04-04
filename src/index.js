import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

//console.log(form, input);

form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    addTodo(value);
});

const todos = [{
    text: "Déclaration d'imposition",
    done: false,
    editMode: false
}, {
    text: "exposé GFE",
    done: true,
    editMode: true
}];

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        if (todo.editMode) {
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    console.log(todosNode);
    ul.innerHTML = "";
    ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Supprimer";
    buttonDelete.addEventListener("click", event => {
        event.stopPropagation();
        deleteTodo(index);
    });
    const buttonModify = document.createElement("button");
    buttonModify.innerHTML = "Modifier";
    buttonModify.addEventListener("click", event => {
        event.stopPropagation();
        todoEdit(index);
    });
    li.innerHTML = `
    <span class="todo ${todo.done
    ? "done"
    : ""}"></span>
    <p> ${todo.text} </p >
 `;
    li.addEventListener("click", event => {
        doneTodo(index);
    });
    li.append(buttonModify, buttonDelete);
    return li;
};

const createTodoEditElement = (todo, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    const buttonSave = document.createElement("button");
    buttonSave.innerHTML = "Sauvegarder";
    buttonSave.addEventListener("click", event => {
        event.stopPropagation();
        todoChange(input.value, index);
        todoEdit(index);
    });
    const buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Annuler";
    buttonCancel.addEventListener("click", event => {
        event.stopPropagation();
        todoEdit(index);
    });
    li.append(input, buttonCancel, buttonSave);
    return li;
};

const addTodo = text => {
    todos.push({ text, done: false });
    displayTodo();
};

const deleteTodo = index => {
    todos.splice(index, 1);
    displayTodo();
};

const doneTodo = index => {
    todos[index].done = !todos[index].done;
    displayTodo();
};

const todoEdit = index => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
};

const todoChange = (text, index) => {
    todos[index].text = text;
    displayTodo();
};

displayTodo();