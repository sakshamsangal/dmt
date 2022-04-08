import os

prod = 'deskbook'
ls = ['xml', 'pdf', 'check']
for x in ls:
    os.makedirs(f'static/img/{prod}/{x}', exist_ok=True)

for x in ls:
    os.makedirs(f'static/img/{prod}/att/{x}', exist_ok=True)
