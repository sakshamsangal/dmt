import json
import os

from PIL import ImageGrab
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)
# app.config["TEMPLATES_AUTO_RELOAD"] = True
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

    json_object2 = json.loads(request.form['todo1'])
    with open('static/json/sea_tag.json', 'w', encoding='utf8') as f:
        json.dump(json_object2, f, indent=4)

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

    with open('static/json/sea_tag.json') as f:
        y = json.load(f)
    return render_template('index.html', tag_dict=x, json_file=prod_name, sea_tag=y)



@app.route('/x/<string:prod>/<string:tag>', methods=["GET"])
def xpath(prod,tag):
    global x
    with open(get_file_path(prod)) as f:
        x = json.load(f)
    y = {}
    if tag == 'all':
        for v in x.values():
            y = {**y, **v['xpath']}
    else:
        y = x[tag]['xpath']
    return render_template('xpath.html', tag_dict=x, json_file=prod_name, xpath=y)



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


@app.route('/sea_flag', methods=['POST'])
def sea_flag():
    if request.method == "POST":
        json_object = json.loads(request.form['todo'])
        flag = set(json_object['sea_tag'])
        prod = request.form['prod']

        global x
        with open(get_file_path(prod)) as f:
            x = json.load(f)
        z = {}
        for k, val in x.items():
            if flag.issubset(set(val['cat'])):
                z[k] = val
        return jsonify(z)


if __name__ == '__main__':
    app.run()
