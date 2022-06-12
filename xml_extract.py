import glob
import json
import os

from lxml import etree

tag_dic = {}
prod_name = ''
file_name = ''


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def xml_traverse(root, xpath):
    tag_name = etree.QName(root).localname
    if tag_name not in tag_dic:
        tag_dic[tag_name] = {
            'tag': tag_name,
            'cat': [],
            'map_tag': '',
            'link': '',
            'file_name': file_name,
            'prod': prod_name,
            'tag_desc': '',
            'xpath': {},
            'xml_img': {},
            'pdf_img': {},
            'check_img': {},
            'att': {}
        }
    tag_dic[tag_name]['xpath'][xpath] = file_name

    for key, val in root.attrib.items():
        if key not in tag_dic[tag_name]['att']:
            tag_dic[tag_name]['att'][key] = {
                'file_name': file_name,
                'prod': prod_name,
                'att_key': key,
                'att_desc': '',
                'xml_img': {},
                'pdf_img': {},
                'check_img': {}
            }
            tag_dic[tag_name]['att'][key]['att_val'] = {
                val: file_name
            }
        else:
            tag_dic[tag_name]['att'][key]['att_val'][val] = file_name

    for child in root:
        if not (type(child) == etree._ProcessingInstruction):
            xml_traverse(child, f'{xpath}/{etree.QName(child).localname}')


def process_xml():
    global prod_name, file_name
    for prod_path in glob.glob("static/xml/*"):
        prod = prod_path.rsplit('\\', 1)[1]
        prod_name = prod
        ls = ['xml', 'pdf', 'check']
        for x in ls:
            os.makedirs(f'static/img/{prod}/{x}', exist_ok=True)

        for x in ls:
            os.makedirs(f'static/img/{prod}/att/{x}', exist_ok=True)
        global tag_dic
        tag_dic = {}
        for xml_file in glob.glob(f"{prod_path}/*.xml"):
            file_name = os.path.basename(xml_file)
            print(file_name)
            tree = etree.parse(xml_file)
            root = tree.getroot()
            xml_traverse(root, etree.QName(root).localname)
            # # df = pd.DataFrame(tag_dic.values())
            # # df.to_csv('temp1.csv', index=False)
        os.makedirs('static/json/prod', exist_ok=True)
        with open(f'static/json/prod/{prod}.json', 'w', encoding='utf8') as f:
            json.dump(tag_dic, f, indent=4, cls=SetEncoder)


def process_xml_master():
    prod = 'tag_master'
    ls = ['xml', 'pdf', 'check']
    for x in ls:
        os.makedirs(f'static/img/{prod}/{x}', exist_ok=True)

    for x in ls:
        os.makedirs(f'static/img/{prod}/att/{x}', exist_ok=True)

    try:
        with open(f'static/json/tag_master.json') as f:
            tag_master_dict = json.load(f)
    except:
        tag_master_dict = {}

    for json_file in glob.glob("static/json/prod/*.json"):
        with open(json_file) as f:
            x = json.load(f)
            for key, val in x.items():
                if key in tag_master_dict:
                    for k, v in x[key]['xpath'].items():
                        tag_master_dict[key]['xpath'][k] = v

                    for k, v in x[key]['att'].items():
                        if k in tag_master_dict[key]['att']:
                            temp = {**tag_master_dict[key]['att'][k]['att_val'], **x[key]['att'][k]['att_val']}
                            n_items = {k: temp[k] for k in list(temp)[:12]}
                            tag_master_dict[key]['att'][k]['att_val'] = n_items
                        else:
                            tag_master_dict[key]['att'][k] = v
                else:
                    tag_master_dict[key] = val

    # df = pd.DataFrame(tag_dic.values())
    # df.to_csv('tag_master.csv', index=False)

    # with open(f'static/json/tag_master.json', 'w', encoding='utf8') as f1:
    #     json.dump(tag_master_dict, f1, indent=4, cls=SetEncoder)


if __name__ == '__main__':
    process_xml()
    # process_xml_master()
