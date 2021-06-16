import requests
import json
BEARER_TOKEN = r"AAAAAAAAAAAAAAAAAAAAAEyHQgEAAAAASinkxr1dSx31ACzEEPp%2BkBv2DNc%3DqGQhdu4w2hss7tbJjohdBS9fc0NJd0NlDGVLqdRgME1J7IUwvg"
proxies = {
    "http":"http://proxy.uec.ac.jp:8080",
    "https":"http://proxy.uec.ac.jp:8080"
}

def create_recent_url(query, tweet_fields):
    if(any(tweet_fields)):
        formatted_tweet_fields = "tweet.fields=" + ",".join(tweet_fields)
    else:
         formatted_tweet_fields = ""
    url = "https://api.twitter.com/2/tweets/search/recent?query={}&{}".format(
        query, formatted_tweet_fields
    )
    return url
def create_conversation_url(conversation_id):
    tweet_fields = ["id", "text", "author_id", "conversation_id", "in_reply_to_user_id", "referenced_tweets"]
    formatted_tweet_fields = "tweet.fields=" + ",".join(tweet_fields)
    url = f'https://api.twitter.com/2/tweets/search/recent?query=conversation_id:{conversation_id}&{formatted_tweet_fields}'
    print(url)
    return url
def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers
def connect_to_endpoint(url, headers, proxy_mode=False):
    if proxy_mode:
        response = requests.request("GET", url, headers=headers, proxies=proxies)
    else:
        response = requests.request("GET", url, headers=headers)#, proxies=proxies)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()
def get_recent_tweets_and_return_conversation_ids(query, proxy_mode=False):
    # 取得データ  e.g. tweet_fields = ["created_at", "author_id"]
    # 空の場合は ツイートのid, text のみ取得する。
    # created_at(投稿時刻), author_id(アカウントID)などの情報が欲しい場合はtweet_fieldsに書く
    tweet_fields = ["id", "text"]#, "author_id", "conversation_id","context_annotations", "in_reply_to_user_id", "referenced_tweets"]
    recent_url = create_recent_url(query, tweet_fields)
    print(recent_url)
    headers = create_headers(BEARER_TOKEN)
    print(headers)
    json_response = connect_to_endpoint(recent_url, headers, proxy_mode)
    result_text = json.dumps(json_response, indent=4, sort_keys=True, ensure_ascii=False)
    print(result_text)
    conversation_ids = []
    for d in json_response['data']:
        if(d['conversation_id'] not in conversation_ids) and (d['id'] != d['conversation_id']):
            conversation_ids.append(d['conversation_id'])
    return conversation_ids
def get_conversation_tweets(conversation_id):
    print('-' * 30)
    headers = create_headers(BEARER_TOKEN)
    root_search_url = f'https://api.twitter.com/2/tweets/{conversation_id}'
    replies_search_url = create_conversation_url(conversation_id)
    root_tweet = connect_to_endpoint(root_search_url, headers)['data']
    root_tweet['reply_to_id'] = ''
    print(root_tweet)
    tweets = [root_tweet]
    reply_tweets = connect_to_endpoint(replies_search_url, headers)['data']
    print(reply_tweets)
    for rep in reversed(reply_tweets):
        tmp = {}
        tmp['id'] = rep['id']
        tmp['text'] = rep['text']
        tmp['reply_to_id'] = ''
        for i in rep['referenced_tweets']:
            if i['type'] == 'replied_to':
                tmp['reply_to_id'] = i['id']
        tweets.append(tmp)
    for tweet in tweets:
        print(tweet)
    print('-' * 30)
    return tweets

def main():
    proxy_mode = False
    query = "コロナ"
    # 検索ワード  e.g. query = "テスト" / query = "テスト OR test"
    # OR 検索　AND検索　-検索　などしたい場合はそのように書く
    conversation_ids = get_recent_tweets_and_return_conversation_ids(query, proxy_mode)
    print(conversation_ids)
    for conversation_id in conversation_ids:
#         url = create_conversation_url(conversation_id)
#         headers = create_headers(BEARER_TOKEN)
#         json_response = connect_to_endpoint(url, headers)
#         result_text = json.dumps(json_response, indent=4, sort_keys=True, ensure_ascii=False)
#         print(result_text)
        get_conversation_tweets(conversation_id)
if __name__ == "__main__":
    main()