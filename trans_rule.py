import json

from docx.shared import Cm
from docxtpl import DocxTemplate, InlineImage



def gen_docx():
    doc = DocxTemplate("static/doc/in/in.docx")
    img_size = Cm(10)  # sets the size of the image
    genre = ['xml_img', 'pdf_img', 'check_img']
    with open('static/json/prod/msg.json') as f:
        tag_dict = json.load(f)
    context = {'row_contents': []}
    c = 1
    ls = ['body', 'to']
    keys = tag_dict.keys()
    for item in ls:
        if item in keys:
            x = tag_dict[item]
            x['rule_no'] = c
            c += 1
            for m1 in genre:
                temp = []
                for k in x[m1]:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                x[m1] = temp

            z = []
            for y in x['att'].values():
                for m1 in genre:
                    temp = []
                    for k in y[m1]:
                        temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                    y[m1] = temp

                z.append(y)
            x['att'] = z
            context['row_contents'].append(x)


    doc.render(context)
    doc.save('static/doc/out/out.docx')



gen_docx()
