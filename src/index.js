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
    done: false
}, {
    text: "exposé GFE",
    done: true
}];

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        return createTodoElement(todo, index);
    });
    console.log(todosNode);
    ul.innerHTML = "";
    ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
    const li = document.createElement("li");
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = `<button>Supprimer</button>`;
    buttonDelete.addEventListener("click", event => {
        deleteTodo(index);
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
    li.appendChild(buttonDelete);
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
    if (todos[index].done === false) {
        todos[index].done = true;
        displayTodo();
    } else {
        todos[index].done = false;
        displayTodo();
    }
};

displayTodo();