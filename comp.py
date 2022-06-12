import pandas as pd

if __name__ == '__main__':
    df = pd.read_excel('xpath.xlsx', sheet_name='Sheet1')
    # df1 = pd.read_excel('tag_master.xlsx', sheet_name='Sheet1')
    for index, row in df.iterrows():
        xpath = row['xpath']
        print(xpath)
        ls = xpath.split('/')
        for i in reversed(ls):
            print(i, end=',')
        print()
    #     to_be = []
    #     for x in ls:
    #         y = df1.loc[df1.tag == x, 'map_tag'].values[0]
    #         if y != 'skip':
    #             to_be.append(y)
    #     print(to_be)
    #     df.iat[index, 2] = '/'.join(to_be)
    # df.to_excel('xpath1.xlsx', index=False)

