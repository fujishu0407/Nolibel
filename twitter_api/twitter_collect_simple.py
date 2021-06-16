import tweepy
import pandas as pd
# 認証に必要なキーとトークン
API_KEY = "Te1wFiEjGAy279egMh6hbJnXt"
API_SECRET = "YWbnav4f8LuJ3OpOeEe7ACH2URbUDlmRUx9OrUY5wic0Ofphqp"
ACCESS_TOKEN = "1197550141181321218-Kv5WUQOAri6IBw673D53KL6qsKPnl8"
ACCESS_TOKEN_SECRET = "Y9hTj3kMaaGuiGZtmiTdVcGixDkQKkk0436dbdMzzYTCF"

# APIの認証
auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

# キーワードからツイートを取得
libels = pd.read_csv("../data/libel.csv")
print(libels)
api = tweepy.API(auth)
data = pd.DataFrame(columns=["Libel","NoLibel"])

print(data)
#正規化しとかないと行けないかも...
for row in libels.itertuples():
    tweets = api.search(q=[row[1]], count=100)
    for tweet in tweets:
        print('-----------------')
        print(tweet.text)
        print(tweet.text.replace(row[1],row[2]))
        tweet.text = tweet.text.replace("\n","")
        tmp_se = pd.Series([tweet.text,tweet.text.replace(row[1],row[2])],index=["Libel","NoLibel"])
        data = data.append(tmp_se, ignore_index=True)
print(data)

data.to_csv("../data/dataset.csv")
