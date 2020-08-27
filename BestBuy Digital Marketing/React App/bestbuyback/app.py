from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import joblib
import pickle
import pandas as pd
from pandas.io.json import json_normalize
import numpy as np
import json
from fbprophet import Prophet
from flask_mail import Mail, Message
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import email.utils

app = Flask(__name__)
CORS(app)

@app.route("/",methods=['GET'])
def index():
    return {"message":"Hello World."}

@app.route("/getUsers", methods=['GET'])
def getUsers():
    data = pd.read_csv("tx_class.csv")
    customers = data['CustomerID'].tolist()
    return {"userId":customers}

@app.route('/getUserData/<userId>',methods=['GET'])
def getUserData(userId):
    userId = float(userId)
    data = pd.read_csv("tx_class.csv")
    fetchedData = data.loc[data['CustomerID'] == userId]
    result = fetchedData.to_json(orient="table")
    parsed = json.loads(result)
    print(parsed)
    # del parsed['data'][0]['Unnamed: 0']
    del parsed['data'][0]['index']
    return json.dumps(parsed['data'][0])

@app.route("/testPredict", methods=['POST'])
def testPredict():
    m2 = joblib.load("NextPurchase.pkl")
    responseData = pd.DataFrame([request.json['data']])
    # dataDf = pd.read_csv('b.csv', index_col='CustomerID')
    # dataDf = pd.DataFrame.from_dict(responseData, orient='columns')
    print(type(responseData))
    y_pred = m2.predict(responseData)
    print(y_pred)
    
    return {"prediction":str(y_pred[0])}

@app.route("/testPredict/<userid>", methods=['GET'])
def testPredictUser(userid):

    df = joblib.load("NxtPurDate2.pkl")
    userId = float(userid)
    fetchedData = df.loc[df['CustomerID'] == userId]
    result = fetchedData.to_json(orient="table")
    parsed = json.loads(result)
    print(parsed['data'][0]['prediction'])

    return {"prediction":parsed['data'][0]['prediction']}

@app.route("/predictSales", methods=['POST'])
def predictSales():
    model = joblib.load("forecast_model.pckl")
    periods = request.json['periods']
    print("periods = ",periods)
    future = model.make_future_dataframe(periods = int(periods))
    forecast = model.predict(future)
    print(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(int(periods)))
    op = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(int(periods)).to_dict(orient = "records")
    
    return {"prediction":op}


@app.route("/sendFlaskMail",methods=['POST'])
def sendFlaskMail():
    recencyCluster = request.json['RecencyCluster']
    frequencyCluster = request.json['FrequencyCluster']
    revenueCluster = request.json['RevenueCluster']
    predictionVal = request.json['predictionVal']
    
    # Replace smtp_username with your Amazon SES SMTP user name.
    USERNAME_SMTP = "AKIA2Z5B7IXWDGGFQUOE"

    # Replace smtp_password with your Amazon SES SMTP password.
    PASSWORD_SMTP = "BEyK45l77e0JZ2EuswcdFGkgYQUL/j1UD3pCW3c7zeOb"
    s = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', 587)
    # s.connect('email-smtp.us-east-1.amazonaws.com', 587)
    s.starttls()
    s.login('AKIA2Z5B7IXWDGGFQUOE', 'BEyK45l77e0JZ2EuswcdFGkgYQUL/j1UD3pCW3c7zeOb')
    
    # msg = 'From: shith06@gmail.com\nTo: cvam612@gmail.com\nSubject: Test email\n\nThis is a test email sent from python.'
    msg = MIMEMultipart('alternative')
    if recencyCluster<2 and frequencyCluster>0 and revenueCluster>0:
        msg['Subject'] = "Best Buy Great Deals Happening Right Now!"
    elif recencyCluster>1 and frequencyCluster>0 and revenueCluster>0:
        msg['Subject'] = "Member Offers!"
    else:
        msg['Subject'] = "Discounts Of The Day!"
    # if predictionVal == 1:
    #     msg['Subject'] = "Best Buy Great Deals Happening Right Now!"
    # elif predictionVal == 2:
    #     msg['Subject'] = "Member Offers!"
    # else:
    #     msg['Subject'] = "Discounts Of The Day!"
    msg['From'] = "shith06@gmail.com"
    msg['To'] = "rhnyewale@gmail.com"
    if recencyCluster<2 and frequencyCluster>0 and revenueCluster>0:
        html = '<html><body><h2>We have missed you!</h2><br/><p>Great deals happening right now</p><br/><a href="https://www.bestbuy.com/site/electronics/top-deals/pcmcat1563299784494.c?id=pcmcat1563299784494">Click Here to check this out</a></body></html>'
        part2 = MIMEText(html, 'html')
    elif recencyCluster>1 and frequencyCluster>0 and revenueCluster>0:
        html = '<html><body><h2>Best Buy member offer!</h2><br/><p>Deals design specially for you</p><br/><a href="https://www.bestbuy.com/loyalty/catalog">Click Here to check this out</a></body></html>'
        part2 = MIMEText(html, 'html')
    else:
        html = '<html><body><h2>Deal of the Day</h2><br/><p>Clearance sales and deals of the day</p><br/><a href="https://www.bestbuy.com/">Click Here to check this out</a></body></html>'
        part2 = MIMEText(html, 'html')
    # if predictionVal == 1:
    #     html = '<html><body><h2>We have missed you!</h2><br/><p>Great deals happening right now</p><br/><a href="https://www.bestbuy.com/site/electronics/top-deals/pcmcat1563299784494.c?id=pcmcat1563299784494">Click Here to check this out</a></body></html>'
    #     part2 = MIMEText(html, 'html')
    # elif predictionVal == 2:
    #     html = '<html><body><h2>Best Buy member offer!</h2><br/><p>Deals design specially for you</p><br/><a href="https://www.bestbuy.com/loyalty/catalog">Click Here to check this out</a></body></html>'
    #     part2 = MIMEText(html, 'html')
    # else:
    #     html = '<html><body><h2>Deal of the Day</h2><br/><p>Clearance sales and deals of the day</p><br/><a href="https://www.bestbuy.com/">Click Here to check this out</a></body></html>'
    #     part2 = MIMEText(html, 'html')
    
    msg.attach(part2)
    s.sendmail('shith06@gmail.com', 'rhnyewale@gmail.com',msg.as_string())
    s.quit()
    return {"message":"Done"}

@app.route("/sendPromotional",methods=['GET'])
def sendPromotional():
    pormotionalCode = "XNSOBVO9374B"
    PASSWORD_SMTP = "BEyK45l77e0JZ2EuswcdFGkgYQUL/j1UD3pCW3c7zeOb"
    s = smtplib.SMTP('email-smtp.us-east-1.amazonaws.com', 587)
    
    s.starttls()
    s.login('AKIA2Z5B7IXWDGGFQUOE', 'BEyK45l77e0JZ2EuswcdFGkgYQUL/j1UD3pCW3c7zeOb')
    
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Discounts Of The Day!"
    msg['From'] = "shith06@gmail.com"
    msg['To'] = "rhnyewale@gmail.com"
    
    html = '<html><body><h2>Promotional Code</h2><br/><p>Shop today with this Promotional Code <strong>XNSOBVO9374B</strong> <br/> This will expire within 7 days. T&C Apply.</p><br/><a href="https://www.bestbuy.com/">Click Here to check this out</a></body></html>'
    part2 = MIMEText(html, 'html')
    
    msg.attach(part2)
    s.sendmail('shith06@gmail.com', 'rhnyewale@gmail.com',msg.as_string())
    s.quit()
    return {"message":"Done"}


@app.route("/getUserCustomer",methods=['GET'])
def customerChurn():
        data = pd.read_csv("uk_data_group1.csv")
        customers = data['CustomerID'].tolist()
        return {"userId":customers}

@app.route("/churnCalculations",methods=['GET'])
def churnCalculations():
    result = {}
    uk_data_group = pd.read_csv('uk_data_group1.csv')
    purchase_frequency=sum(uk_data_group['num_transactions'])/uk_data_group.shape[0]
    repeat_rate=uk_data_group[uk_data_group.num_transactions > 74].shape[0]/uk_data_group.shape[0]
    churn_rate=1-repeat_rate
    result['purchase_frequency'] = purchase_frequency
    result['repeat_rate'] = repeat_rate
    result['churn_rate'] = churn_rate

    return jsonify(result)

@app.route("/userClv", methods=['POST'])
def userClv():
    userid = request.json['userid']
    uk_data_group = pd.read_csv('uk_data_group1.csv')
    fetchedData = uk_data_group.loc[uk_data_group['CustomerID'] == float(userid)]
    result = fetchedData.to_json(orient="table")
    parsed = json.loads(result)
    result = {}
    result['CLV'] = parsed['data'][0]['CLV']
    result['cust_lifetime_value'] = parsed['data'][0]['cust_lifetime_value']
    return jsonify(result)

@app.route("/getUserClv/<userid>", methods=['GET'])
def getUserClv(userid):
    uk_data_group = pd.read_csv('uk_data_group1.csv')
    fetchedData = uk_data_group.loc[uk_data_group['CustomerID'] == float(userid)]
    result = fetchedData.to_json(orient="table")
    parsed = json.loads(result)
    CLV = uk_data_group['CLV']
    compareVal = np.quantile(CLV, 0.40)
    result = {}
    result['CLV'] = parsed['data'][0]['CLV']
    if(compareVal > result['CLV']):
        print("Compare Val = ",compareVal)
        result['cust_lifetime_value'] = 0
    else:
        print("Compare Val = ",compareVal)
        result['cust_lifetime_value'] = 1
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)