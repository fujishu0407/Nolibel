import warnings
warnings.simplefilter('ignore')
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import T5ForConditionalGeneration, T5Tokenizer
from normalize_text import *


MAX_TARGET_LENGTH = 512
MAX_SOURCE_LENGTH = 512
# トークナイザー（SentencePiece）
def preprocess_body(text):
    return normalize_text(text.replace("\n", " "))

def read_model():
    MODEL_DIR = "./Nolibel/content/easy_model"
    tokenizer = T5Tokenizer.from_pretrained(MODEL_DIR, is_fast=True)

    # 学習済みモデル
    trained_model = T5ForConditionalGeneration.from_pretrained(MODEL_DIR)

    # GPUの利用有無
    USE_GPU = torch.cuda.is_available()
    if USE_GPU:
        trained_model.cuda()
    return tokenizer, trained_model

if __name__ == "__main__":
    tokenizer, trained_model = read_model()
    trained_model.eval()
    body = input("文章を入力してください：")
    inputs = [preprocess_body(body)]
    batch = tokenizer.batch_encode_plus(
        inputs, max_length=MAX_SOURCE_LENGTH, truncation=True, 
        padding="longest", return_tensors="pt")

    input_ids = batch['input_ids']
    input_mask = batch['attention_mask']
    print("start")
    outputs = trained_model.generate(
        input_ids=input_ids, attention_mask=input_mask, 
        max_length=MAX_TARGET_LENGTH,
        # temperature=1.0,          # 生成にランダム性を入れる温度パラメータ
        # num_beams=10,             # ビームサーチの探索幅
        # diversity_penalty=1.0,    # 生成結果の多様性を生み出すためのペナルティ
        # num_beam_groups=10,       # ビームサーチのグループ数
        # num_return_sequences=1,  # 生成する文の数
        # repetition_penalty=1.5,   # 同じ文の繰り返し（モード崩壊）へのペナルティ
    )

    generated_titles = [tokenizer.decode(ids, skip_special_tokens=True, clean_up_tokenization_spaces=False) for ids in outputs]

    # 生成されたタイトルを表示する
    for i, title in enumerate(generated_titles):
        print(f"{i+1:2}. {title}")
    print("finish")
