import datetime

from project import create_app

if __name__ == "__main__":
    print(datetime.date.today())
    app = create_app()
    app.run(debug=True)
