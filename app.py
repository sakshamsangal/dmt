import json
import os

from PIL import ImageGrab
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

x = ''


@app.route("/paste", methods=["POST"])
def home():
    if request.method == "POST":
        image = ImageGrab.grabclipboard()
        file_name = request.form['todo']
        image.save(f'static/img/{file_name}', 'PNG')
    return {}


@app.route("/save", methods=["POST"])
def save():
    json_object = json.loads(request.form['todo'])
    with open('out.json', 'w', encoding='utf8') as f:
        json.dump(json_object, f, indent=4)
    return render_template('index.html', tag_dict=json_object)


@app.route('/')
def hello_world():
    global x
    with open('out.json') as f:
        x = json.load(f)
    return render_template('index.html', tag_dict=x)


@app.route('/move-to-bin', methods=["POST"])
def move_to_bin():
    if request.method == "POST":
        source = request.form['file']
        print(source)
        os.replace(f'static/img/{source}', f'static/bin/{os.path.basename(source)}')
        return {}


@app.route('/show_has_rule', methods=['POST'])
def show_has_rule():
    if request.method == "POST":
        flag = request.form['todo']
        global x
        with open('out.json') as f:
            x = json.load(f)
        y = {}
        for k, x in x.items():
            if x[flag]:
                y[k] = x
        print(y)
        return jsonify(y)


if __name__ == '__main__':
    app.run()
