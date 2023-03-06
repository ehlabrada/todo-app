	function addTodoToDOM(todo) {
        console.log("Add todo to DOM called", todo)
        var mainContainer = document.querySelector("#main-todo-container");
        var newTodoNode = `<ul data-id='${todo.id}' id="todos-list-${todo.id}"
								class="list-group list-group-horizontal rounded-0 bg-transparent">
								<li
										class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
									<div class="form-check">
										<input  class="form-check-input me-0" type="checkbox" value=""
											   id="todo_checkbox"
											   aria-label="..."/>
									</div>
								</li>
								<li
										class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
									<p class="lead fw-normal mb-0">${todo.todo}</p>
								</li>
								<li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
									<div class="d-flex flex-row justify-content-end mb-1">
										<a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
												class="fas fa-pencil-alt me-3"></i></a>
										<a type="button" href="" class="text-danger delete-btn"
										   data-mdb-toggle="tooltip"
										   title="Delete todo"><i
												class="fas fa-trash-alt"></i></a>

									</div>
									<div class="text-end text-muted">
										<a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
											<p class="small mb-0"><i class="fas fa-info-circle me-2"></i>
												${todo.created}
											</p>
										</a>
									</div>
								</li>
							</ul>`

		mainContainer.insertAdjacentHTML("beforeend", newTodoNode);
}


//    Add TODO
	form = document.getElementById("add-todo");
	form.addEventListener('submit', function(event) {
        event.preventDefault();
        var todoInput = form.elements['todo'].value.trim();
        console.log("TODO input", todoInput)
        const data = { todoInput };

        fetch("/add-todo", {
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
            console.log("Data", data)
            addTodoToDOM(data.todo);
        })
        .catch(function(error) {
            console.log("GETTING SOME ERROR");
            console.log(error);
        });
    // Clear the form input
    form.elements['todo'].value = '';
});





 // This function is to capture the click to the delete button, then I call to the url that deletes and
 // todo and send it the current object id
	const deleteButtons = document.querySelectorAll('.delete-btn');
	deleteButtons.forEach(button => {
		button.addEventListener("click", (event) => {
		    event.preventDefault();
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
				return response.json()
			})
			.then(function(data){
				todoItem.remove()  //  Removes the current selected UL element from DOM, and also from DB because
				                    // It sent the petition to the URL
			})
			.catch(error => {
				console.error(error);
			});
		});
	});




