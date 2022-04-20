import json

from docx.shared import Cm
from docxtpl import DocxTemplate, InlineImage



def gen_docx():
    doc = DocxTemplate("static/doc/in/res.docx")
    img_size = Cm(10)  # sets the size of the image
    with open('resume.json') as f:
        x = json.load(f)
    doc.render(x)
    doc.save('static/doc/out/res.docx')



gen_docx()
