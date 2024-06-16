from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


# Upload file API
@app.route('/upload', methods=['POST'])
def upload_file():
    # TODO: Implement file upload logic here
    return 'File uploaded successfully!'


if __name__ == '__main__':
    app.run()
