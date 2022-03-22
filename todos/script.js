const table = document.getElementById("todos");


function TodoForm(add) {
    const cont = document.createElement("form");
    cont.innerHTML = `
    <input type="text"/>
    <button>Add Todo</button>
    `;

    cont.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = cont.querySelector("input").value;
        add(value)
    });

    return cont;
}
function listItem(todo, onChange) {
    const cont = document.createElement("div");

    cont.innerHTML = `
    <label>
    <input type="checkbox" ${todo.completed ? "checked" : ""}/>
    ${todo.label}
    </label>
    `
    const input = cont.querySelector("input");
    input.addEventListener("change", (e) => {
        onChange(e.target.checked)

    })

    return cont;
}

function List(todos, onChange) {
    const cont = document.createElement("div")

    todos.map(todo => {
        return listItem(todo, (change) => {
            todo.completed = change;
            onChange();
        });
    }).forEach(el => {
        cont.appendChild(el);
    })

    return cont;
}

function todoFotter(todos, OnChange) {
    const cont = document.createElement("div");
    const completed = todos.filter(todo => (todo.completed === true)).length;


    cont.innerHTML = `
    <span>${completed}/ ${todos.length} </span>
    <button>Clear Completed Todos</button>
    
    `;

    const clear = cont.querySelector("button");
    clear.addEventListener("click", () => {
        OnChange(todos.filter((todo) => todo.completed != true))

    });
    return cont;

};

function App() {

    let todos = [
        { label: "learn JS", completed: false },
        { label: "learn React", completed: false },
        { label: "learn Node", completed: false }
    ];
    const cont = document.createElement("div");
    function render() {
        cont.innerHTML = ""
        cont.appendChild(TodoForm(function (Newtext) {
            todos.push({
                label: Newtext,
                completed: false
            })
            render();
        }));

        cont.appendChild(List(todos, () => {
            render();
        }));
        cont.appendChild(todoFotter(todos, (NewTodo) => {
            todos = NewTodo;
            render();
        }));
    }
    render();
    return cont;
}
table.appendChild(App());