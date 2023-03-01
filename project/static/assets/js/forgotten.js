	function addTodoToDOM(todo) {
  // Create a new li element for the todo
  const li = document.createElement("li");
  li.className = "list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent";

  // Create the checkbox input
  const input = document.createElement("input");
  input.className = "form-check-input me-0";
  input.type = "checkbox";
  input.value = "";
  input.id = `checkbox-${todo.id}`;
  input.setAttribute("aria-label", "...");
  input.checked = todo.completed;

  // Create the label for the todo
  const label = document.createElement("label");
  label.className = "form-check-label ms-2 mb-0";
  label.setAttribute("for", `checkbox-${todo.id}`);
  label.innerText = todo.description;

  // Add the checkbox and label to the li element
  li.appendChild(input);
  li.appendChild(label);

  // Create the edit and delete buttons
  const div = document.createElement("div");
  div.className = "d-flex flex-row justify-content-end mb-1";

  const editButton = document.createElement("a");
  editButton.href = "#!";
  editButton.className = "text-info me-3";
  editButton.setAttribute("data-mdb-toggle", "tooltip");
  editButton.title = "Edit todo";
  editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "text-danger delete-btn";
  deleteButton.setAttribute("data-mdb-toggle", "tooltip");
  deleteButton.title = "Delete todo";
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

  // Add the edit and delete buttons to the div element
  div.appendChild(editButton);
  div.appendChild(deleteButton);

  // Create the created date element
  const dateElem = document.createElement("p");
  dateElem.className = "small mb-0";
  dateElem.innerHTML = `<i class="fas fa-info-circle me-2"></i>${todo.created_date}`;

  // Create the created date link
  const dateLink = document.createElement("a");
  dateLink.href = "#!";
  dateLink.className = "text-muted";
  dateLink.setAttribute("data-mdb-toggle", "tooltip");
  dateLink.title = "Created date";
  dateLink.appendChild(dateElem);

  // Create the date container
  const dateContainer = document.createElement("div");
  dateContainer.className = "text-end text-muted";
  dateContainer.appendChild(dateLink);

  // Add the div and date container to the li element
  li.appendChild(div);
  li.appendChild(dateContainer);

  // Get the ul element for the todo list
  const ul = document.getElementById("todo-list");

  // Append the new todo li element to the ul
  ul.appendChild(li);
}


	function allTodos() {
	  fetch('{{ url_for('todo.add_todo') }}')
		.then(response => response.json())
		.then(data => {
		console.log("data", data)
		  const todosList = document.getElementById('main-todo-container');
		  //todosList.innerHTML = '';

		  data.todos.forEach(todo => {
		  	// UL Element
			var ul = document.createElement('ul');
			ul.className= "list-group list-group-horizontal rounded-0 bg-transparent"

			// LIST Elements
			var li = document.createElement('li');
			li.textContent = todo.todo;
			todosList.appendChild(li);
		  });
		});
}

	form = document.getElementById("add-todo");
	form.addEventListener('submit', function(event) {
    event.preventDefault();
    var todoInput = form.elements['todo'].value.trim();
    const data = { todoInput };
    fetch('{{ url_for('todo.add_todo') }}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(function(response) {
        return response.json() // extract JSON from the response
    })
    .then(function(data) {
        allTodos();
        console.log("CAled")
    })
    .catch(function(error) {
    	console.log("GETTING SOME ERROR");
        console.log(error);
    });
    // Clear the form input
    todoInput.value = '';
});





 // This function is to capture the click to the delete button, then I call to the url that deletes and
 // todo and send it the current object id
	const deleteButtons = document.querySelectorAll('.delete-btn');
	deleteButtons.forEach(button => {
		button.addEventListener("click", () => {
			const todoItem = button.closest('ul');
			const my_id = parseInt(todoItem.getAttribute('data-id'));
			console.log(my_id);
			fetch("/delete/"+ my_id + "", {
				method: "DELETE",
				headers: {
    				'Content-Type': 'application/json'
  				},
			})
			.then(response => {
				console.log(response);
				return response.json()
			})
			.then(function(data){
				todoItem.remove()
				console.log(data);
			})
			.catch(error => {
				console.error(error);
			});
		});
	});




