import pandas as pd

def transformation(text):
    libels = pd.read_csv("./data/libel.csv")
    data = pd.DataFrame(columns=["Libel","NoLibel"])
    for row in libels.itertuples():
        text = text.replace(row[1],row[2])
    return text
    
if __name__ == "__main__":
    text = input("文章を入力してください：")
    transformation(text)