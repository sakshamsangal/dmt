import glob
import json
import os

import pandas as pd
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
    if xpath not in tag_dic:
        tag_dic[xpath] = {
            'tag': tag_name,
            'xpath': xpath,
            'mapped_xpath': '',
            'file_name': file_name,
            'prod': prod_name,
        }

    for child in root:
        if not (type(child) == etree._ProcessingInstruction) and not (type(child) == etree._Comment):
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
            df = pd.DataFrame(tag_dic.values())
            df.to_excel('xpath.xlsx', index=False)


def remove_items(test_list, item):
    # remove the item for all its occurrences
    c = test_list.count(item)
    for i in range(c):
        test_list.remove(item)

    return test_list


if __name__ == '__main__':
    df = pd.read_excel('xpath.xlsx', sheet_name='Sheet1')
    df1 = pd.read_excel('tag_master.xlsx', sheet_name='Sheet1')
    for index, row in df.iterrows():
        xpath = row['xpath']
        ls = xpath.split('/')
        to_be = []
        for x in ls:
            y = df1.loc[df1.tag == x, 'map_tag'].values[0]
            if y != 'skip':
                to_be.append(y)
        print(to_be)
        df.iat[index, 2] = '/'.join(to_be)
    df.to_excel('xpath1.xlsx', index=False)
