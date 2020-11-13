from flask import Flask, render_template, request, jsonify

app = Flask(__name__)



@app.route('/')

def hello_world():

	return 'Hello World!'

@app.route('/user',methods=['GET'])
def get():
    print(request.args.get("email"))
    recommendList = ["자수","뜨개질"]
    return jsonify({'recommendlist': recommendList})

if __name__ == '__main__':

	app.run(host='0.0.0.0',port=8090,debug='True')

