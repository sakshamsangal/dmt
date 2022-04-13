import json
import os

from PIL import ImageGrab
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
prod_name = ''
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
    prod = request.form['prod']
    json_object = json.loads(request.form['todo'])
    with open(get_file_path(prod), 'w', encoding='utf8') as f:
        json.dump(json_object, f, indent=4)
    return {}


def get_file_path(prod):
    global prod_name
    if prod == 'tm' or prod == 'tag_master':
        prod_name = 'tag_master'
        pa = f'static/json/{prod_name}.json'
    else:
        prod_name = prod
        pa = f'static/json/prod/{prod_name}.json'
    return pa


@app.route('/<string:prod>', methods=["GET"])
def hello_world(prod):
    global x
    with open(get_file_path(prod)) as f:
        x = json.load(f)
    return render_template('index.html', tag_dict=x, json_file=prod_name)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@app.route('/')
def landing_page():
    return render_template('temp.html')


@app.route('/move-to-bin', methods=["POST"])
def move_to_bin():
    if request.method == "POST":
        source = request.form['file']
        os.replace(f'static/img/{source}', f'static/bin/{os.path.basename(source)}')
        return {}


@app.route('/show_has_rule', methods=['POST'])
def show_has_rule():
    if request.method == "POST":
        flag = request.form['todo']
        prod = request.form['prod']
        global x
        with open(get_file_path(prod)) as f:
            x = json.load(f)
        y = {}
        for k, x in x.items():
            if x[flag]:
                y[k] = x
        return jsonify(y)


if __name__ == '__main__':
    app.run()
