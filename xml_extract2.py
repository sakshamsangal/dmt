import glob
import json
import os

import pandas as pd
from lxml import etree

tag_dic = []
prod_name = ''
file_name = ''


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


def xml_traverse(root, xpath):
    tag_name = etree.QName(root).localname
    if tag_name == 'author':
        x = {
            'tag': tag_name,
            'tag_xml': etree.tostring(root).strip().decode('UTF-8'),
            'tag_text': ' '.join(root.text.split()),
            'file_name': file_name,
            'xpath': xpath,
        }
        for k, v in root.attrib.items():
            x[k] = v
        tag_dic.append(x)

    for child in root:
        if not (type(child) == etree._ProcessingInstruction):
            xml_traverse(child, f'{xpath}/{etree.QName(child).localname}')


def process_xml():
    global prod_name, file_name
    for prod_path in glob.glob("static/xml/*"):
        prod = prod_path.rsplit('\\', 1)[1]
        prod_name = prod
        for xml_file in glob.glob(f"{prod_path}/*.xml"):
            file_name = os.path.basename(xml_file)
            print(file_name)
            tree = etree.parse(xml_file)
            root = tree.getroot()
            xml_traverse(root, etree.QName(root).localname)
            df = pd.DataFrame(tag_dic)
            df.to_csv('temp1.csv', index=False)


if __name__ == '__main__':
    process_xml()
