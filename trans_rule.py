import json

from docx.shared import Mm, Cm
from docxtpl import DocxTemplate, InlineImage



def gen_docx_query():
    doc = DocxTemplate("static/query_temp.docx")
    img_size = Cm(18)  # sets the size of the image
    with open('query.json') as f:
        tag_dict = json.load(f)
    context = {'row_contents': []}
    c = 1
    for x in tag_dict.values():
        if x['has_query']:
            x['rule_no'] = c
            c += 1
            temp = []
            for k in x['xml_img']:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            x['xml_img'] = temp

            temp = []
            for k in x['pdf_img']:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            x['pdf_img'] = temp

            temp = []
            for k in x['check_img']:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            x['check_img'] = temp

            z = []
            for y in x['att'].values():
                temp = []
                for k in y['xml_img']:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y['xml_img'] = temp

                temp = []
                for k in y['pdf_img']:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y['pdf_img'] = temp

                temp = []
                for k in y['check_img']:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y['check_img'] = temp

                z.append(y)
            x['att'] = z
            context['row_contents'].append(x)


    doc.render(context)
    doc.save("trans_rule_query.docx")


def gen_docx():
    doc = DocxTemplate("static/temp_cat.docx")
    img_size = Cm(18)  # sets the size of the image
    with open('out2.json') as f:
        tag_dict = json.load(f)
    context = {'row_contents': []}
    c = 1
    for x in tag_dict.values():
        if x['has_rule']:
            x['rule_no'] = c
            c += 1
            temp = []
            for k in x['xml_img']:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            x['xml_img'] = temp

            temp = []
            for k in x['pdf_img']:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            x['pdf_img'] = temp

            temp = []
            for k in x['check_img']:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            x['check_img'] = temp

            z = []
            for y in x['att'].values():
                temp = []
                for k in y['xml_img']:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y['xml_img'] = temp

                temp = []
                for k in y['pdf_img']:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y['pdf_img'] = temp

                temp = []
                for k in y['check_img']:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y['check_img'] = temp

                z.append(y)
            x['att'] = z
            context['row_contents'].append(x)


    doc.render(context)
    doc.save("trans_rule.docx")

def temp():
    with open('out.json') as f:
        tag_dict = json.load(f)
    y = {}
    for k, x in tag_dict.items():
        # if x['has_rule']:
        if x['has_query']:
            y[k] = x

    with open('query.json', 'w', encoding='utf8') as f:
        json.dump(y, f, indent=4)


# temp()
# gen_docx()
gen_docx_query()
