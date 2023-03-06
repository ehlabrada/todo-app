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
    if request.method == "POST":
        data = request.get_json()
        todo = data["todoInput"]

        new_todo = Todo(
            todo=todo
        )

        db.session.add(new_todo)
        db.session.commit()

        return jsonify({"message": "added successfully",
                        "todo": {"id": new_todo.id,
                                 "todo": new_todo.todo,
                                 "created": new_todo.due_date.strftime("%m-%d-%Y")}})

    return render_template("index.html")


@todo.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    todo = db.session.execute(db.select(Todo).where(Todo.id == id)).scalar()

    if todo:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({"message": "Element deleted successfully"})

    return jsonify({"message": "Element could not been found."})







































