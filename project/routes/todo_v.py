from flask import Blueprint, render_template, request, jsonify, redirect, url_for

from project.extensions import db
from project.forms import AddTodoForm
from project.models.todo_m import Todo

todo = Blueprint("todo", __name__)


@todo.route("/")
def home():
    all_todos = list(db.session.execute(db.select(Todo)).scalars())
    return render_template("index.html", todos=all_todos, form=AddTodoForm())


@todo.route("/add-todo", methods=['POST', 'GET'])
def add_todo():
    add_todo_form = AddTodoForm()

    if request.method == "POST":
        todo = add_todo_form.todo.data
        new_todo = Todo(
            todo=todo
        )

        db.session.add(new_todo)
        db.session.commit()
        return redirect(url_for('todo.home'))
    return render_template("index.html")


@todo.route("/delete/<int:id>", methods=["DELETE", "GET"])
def delete(id):
    todo = db.session.execute(db.select(Todo).where(Todo.id == id)).scalar()
    print(todo)
    if todo:
        print("here")
        db.session.delete(todo)
        db.session.commit()
        return redirect(url_for('todo.home'))
    return redirect(url_for('todo.home'))







































