from flask import Flask

from project.extensions import db
from project.routes.todo_v import todo
from project.routes.user_v import user


def create_app(config_file='settings.py'):
    app = Flask(__name__)
    app.app_context().push()

    app.config.from_pyfile(config_file)

    # Extensions initializations
    db.init_app(app)

    db.create_all()

    app.register_blueprint(user)
    app.register_blueprint(todo)

    return app
