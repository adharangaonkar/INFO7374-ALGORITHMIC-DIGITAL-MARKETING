import uvicorn
from fastapi import FastAPI
import pandas as pd

app = FastAPI()

@app.get("/")
async def index():
    return {"text":"Welcome to Snack Recommendation System using RBM Algorithm"}

@app.get("/items/{id}")
async def getItems(id, itemID:int=None):

    if(itemID):
        df = pd.read_csv("./rbm_recomm.csv")
        df = df.fillna('')
        cols = df.columns.difference(['userID'])
        d = (df.groupby('userID')[cols]
            .apply(lambda x: x.to_dict('r'))
            .reset_index(name='Other_details')
            .to_dict(orient='records'))
        
        output = {}
        for i in range(len(d)):
            if(str(d[i]['userID']) == id):
                output=d[i]
        
        final_output = {
            'user_id':id,
        }
        for i in range(len(output['Other_details'])):
            if(output['Other_details'][i]['itemID'] == itemID):
                # if(output['Other_details'][i]['movieID'] == itemID):
                final_output['item'] = output['Other_details'][i]
        
        return final_output
    else:
        df = pd.read_csv("./rbm_recomm.csv")
        df = df.fillna('')
        cols = df.columns.difference(['userID'])
        d = (df.groupby('userID')[cols]
            .apply(lambda x: x.to_dict('r'))
            .reset_index(name='Other_details')
            .to_dict(orient='records'))
        
        output = {}
        for i in range(len(d)):
            if(str(d[i]['userID']) == id):
                output=d[i]

        return output

@app.get("/movies/{movie_id}")
async def getMovie(movie_id):
    df = pd.read_csv("./rbm_recomm.csv")
    df = df.fillna('')
    cols = df.columns.difference(['itemID'])
    # d = (df.groupby('movieID')[cols]
    d = (df.groupby('itemID')[cols]
        .apply(lambda x: x.to_dict('r'))
        .reset_index(name='Other_details')
        .to_dict(orient='records'))
    
    output = {}
    for i in range(len(d)):
        if(str(d[i]['itemID']) == movie_id):
            output=d[i]

    return output


if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8081)