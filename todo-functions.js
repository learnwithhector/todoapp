"use strict";

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodos = (todos, filters) => {
  document.querySelector("#todos").innerHTML = "";

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const thingsTodo = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector("#todos").appendChild(generateSummaryDOM(thingsTodo));

  filteredTodos.forEach((todo) => {
    if (!filters.hideCompleted || (filters.hideCompleted && !todo.completed)) {
      document.querySelector("#todos").appendChild(generateTodoDOM(todo));
    }
  });
};

const removeTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index > -1) {
    todos.splice(index, 1);
  }
};

const toggleTodo = (id) => {
  const todoToToggle = todos.find((todo) => todo.id === id);
  if (todoToToggle) {
    todoToToggle.completed = !todoToToggle.completed;
  }
};

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const textEl = document.createElement("span");
  const button = document.createElement("button");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  textEl.textContent = todo.text;
  button.textContent = "x";

  todoEl.appendChild(checkbox);
  todoEl.appendChild(textEl);
  todoEl.appendChild(button);

  button.addEventListener("click", (e) => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  checkbox.addEventListener("change", (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummaryDOM = (thingsTodo) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${thingsTodo.length} things left to do.`;
  return summary;
};
