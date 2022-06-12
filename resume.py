import json

from docx.shared import Cm
from docxtpl import DocxTemplate, InlineImage, RichText


def gen_docx():
    doc = DocxTemplate("static/doc/in/res.docx")


    img_size = Cm(0.7)  # sets the size of the image
    with open('resume.json') as f:
        x = json.load(f)
    y = x['work_exp']['comp']
    for item in y:
        item['img'] = InlineImage(doc, item['img'], img_size)

    for item in x['ref']:
        rt = RichText()
        rt.add(item['link'], url_id=doc.build_url_id(item['link']))
        item['rt'] = rt

    print(x['ref'])
    doc.render(x)
    doc.save('static/doc/out/res_out.docx')


gen_docx()
