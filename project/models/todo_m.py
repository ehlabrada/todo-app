from datetime import date, timedelta

from flask_login import UserMixin

from project.extensions import db

# Get the current date
today = date.today()
# Add 1 day to the current date
tomorrow = today + timedelta(days=1)



class Todo(UserMixin, db.Model):
    __tablename__ = "todos"

    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.String(500))
    created = db.Column(db.Date, default=date.today())
    due_date = db.Column(db.Date, default=date(tomorrow.year, tomorrow.month, tomorrow.day))
    completed = db.Column(db.Boolean, default=False)

    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
