import json

import pandas as pd
from lxml import etree

tag_dic = {}
file_name = 'ppct65'

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def xml_traverse(root):
    tag_name = etree.QName(root).localname
    if tag_name in tag_dic:
        tag_dic[tag_name]['count'] += 1
    else:
        tag_dic[tag_name] = {
            'tag': tag_name,
            'map_tag': '',
            'has_rule': '',
            'has_query': '',
            'rule': '',
            'citation': '',
            'is_rendered': '',
            'temp': '',
            'file_name': file_name,
            'prod': '',
            'tag_desc':'',
            'count': 1,
            'xml_img': [],
            'pdf_img': [],
            'check_img': [],
            'att': {}
        }
    for key, val in root.attrib.items():
        if key not in tag_dic[tag_name]['att']:
            tag_dic[tag_name]['att'][key] = {
                'att_key': key,
                'att_desc': '',
                'xml_img': [],
                'pdf_img': [],
                'check_img': [],
                'att_val': set(),
            }
            tag_dic[tag_name]['att'][key]['att_val'].add(val)
        else:
            if len(tag_dic[tag_name]['att'][key]['att_val']) < 10:
                tag_dic[tag_name]['att'][key]['att_val'].add(val)

    for child in root:
        if not (type(child) == etree._ProcessingInstruction):
            xml_traverse(child)


def process_xml():
    tree = etree.parse("static/xml/in.xml")
    root = tree.getroot()
    global tag_dic
    tag_dic = {}
    xml_traverse(root)

    # df = pd.DataFrame(tag_dic.values())
    # df.to_csv('temp1.csv', index=False)

    with open('out.json', 'w', encoding='utf8') as f:
        json.dump(tag_dic, f, indent=4, cls=SetEncoder)


if __name__ == '__main__':
    process_xml()
