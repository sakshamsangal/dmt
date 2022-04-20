from itertools import groupby
from string import ascii_lowercase
import pandas as pd

lower_case = set(ascii_lowercase)  # set for faster lookup


def find_regex(p):
    cum = []
    for c in p:
        if c.isdigit():
            cum.append("d")
        elif c in lower_case:
            cum.append("t")
        else:
            cum.append(c)

    grp = groupby(cum)
    return ''.join(f'\\{what}{{{how_many}}}'
                   if how_many > 1 else f'\\{what}'
                   for what, how_many in ((g[0], len(list(g[1]))) for g in grp))


with open('in.txt') as f:
    x = {}
    for line in f:
        pattern = line.strip()
        pat = find_regex(pattern).replace(r"\t", "[a-z]")
        x[pat] = pattern

    df = pd.DataFrame(x.items(), columns=['Regex', 'Text'])
    df.to_excel('out.xlsx', index=False)
