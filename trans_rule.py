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
    ls = ['body', 'to', 'from']
    for rule_count, item in enumerate(ls):
        tag_dict[item]['rule_count'] = rule_count + 1
        for img_genre in genre:
            temp = []
            for k in tag_dict[item][img_genre]:
                temp.append(InlineImage(doc, f'static/img/{k}', img_size))
            tag_dict[item][img_genre] = temp

        z = []
        for y in tag_dict[item]['att'].values():
            for img_genre in genre:
                temp = []
                for k in y[img_genre]:
                    temp.append(InlineImage(doc, f'static/img/{k}', img_size))
                y[img_genre] = temp

            z.append(y)
        tag_dict[item]['att'] = z
        context['row_contents'].append(tag_dict[item])


    doc.render(context)
    doc.save('static/doc/out/out.docx')



gen_docx()
