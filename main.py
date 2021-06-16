from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
#from t5model import *

from trans_by_csv import *
#curl -w '\n' 'http://127.0.0.1:5000' --data 'text=浮気する奴なんて死ね' -XPOST
app = Flask(__name__)


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', "*")
  response.headers.add('Access-Control-Allow-Headers', '*')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/',methods=["POST"])
def csv(text=None):
    if request.method == "POST":
        text = request.form["text"]
    else:
        text = ""
    text = transformation(text)
    return jsonify({
        "status":"OK",
        "text":text
    })

@app.route('/document',methods=["POST"])
def doccsv(document=None):
    if request.method == "POST":
        document = request.form["document"]
    else:
        document = ""
    document = list(document.split(","))
    for i, text in enumerate(document):
        document[i] = transformation(text)
    document = ",".join(document)
    print(document)
    return document

    
 
@app.route('/t5',methods=["POST"])
def t5(text=None):
    if request.method == "POST":
        text = request.form["text"]
    else:
        text = ""
    body = text
    inputs = [preprocess_body(body)]
    batch = tokenizer.batch_encode_plus(
        inputs, max_length=MAX_SOURCE_LENGTH, truncation=True, 
        padding="longest", return_tensors="pt")

    input_ids = batch['input_ids']
    input_mask = batch['attention_mask']
    outputs = trained_model.generate(
        input_ids=input_ids, attention_mask=input_mask, 
        max_length=MAX_TARGET_LENGTH,
    )

    text = [tokenizer.decode(ids, skip_special_tokens=True, clean_up_tokenization_spaces=False) for ids in outputs]
    return jsonify({
        "status":"OK",
        "text":text[0]
    })
    
if __name__ == "__main__":
    #tokenizer, trained_model = read_model()
    #trained_model.eval()
    app.run(host="0.0.0.0",debug=False)