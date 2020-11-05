from flask import Flask, render_template, request

app = Flask(__name__)



@app.route('/')

def hello_world():

	return 'Hello World!'

@app.route('/user',methods=['GET'])
def get():
    if(request.method =='GET'):
        return render_template('input.html')
    elif(request.method =='POST'):
        value = request.form['input']
        return render_template('default.html',name=value)

if __name__ == '__main__':

	app.run(host='0.0.0.0',port=8090)

