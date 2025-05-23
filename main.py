from flask import Flask
from flask import redirect, url_for,render_template,request,session,flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app=Flask(__name__)
app.secret_key="1234"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    certificate = db.Column(db.String(80), nullable=False)
    Y = db.Column(db.String(120), nullable=False)
    
    def __repr__(self,certificate,Y):
        self.certificate = certificate
        self.Y = Y  

@app.route('/')
def func():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    data=request.get_json()
    certificate=data['certificate']
    Y=data['Y']
    if certificate and Y:
        new_user = User(certificate=certificate, Y=Y)
        db.session.add(new_user)
        db.session.commit()
        return "Data inserted successfully"
    else:
        return "Invalid data"

if __name__=="__main__":
    with app.app_context():
        db.create_all()
        app.run(debug=True)