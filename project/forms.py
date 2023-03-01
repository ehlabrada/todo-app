from flask_wtf import FlaskForm

from wtforms.fields import StringField, DateField, BooleanField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


class AddTodoForm(FlaskForm):
    todo = StringField("Todo description", validators=[DataRequired()])
    due_date = DateField("Pick your due date")
    completed = BooleanField("Is completed")

    submit = SubmitField("Add todo")
