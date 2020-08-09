# -*- coding: utf-8 -*-
"""
Created on Tue Jul 28 19:32:38 2020

@author: adhar
"""

import streamlit as st
from sklearn import datasets
import numpy as np
import requests
import pandas as pd
from PIL import Image
import plotly.graph_objects as go
from bokeh.palettes import Paired12, Category20c_20


#For NCF Algorithm
def get_dataset(user_id, item_id):
    if item_id == "":
        server_url = "http://127.0.0.1:8000/items/"+user_id
        r = requests.get(server_url)
        return r.json()
    elif user_id=="": 
        server_url = "http://127.0.0.1:8000/movies/"+item_id
        r = requests.get(server_url)
        return r.json() 
    else:
        server_url = "http://127.0.0.1:8000/items/"+user_id+"/?itemID="+item_id
        r = requests.get(server_url)
        return r.json()

#For RBM Algorithm
def get_dataset1(user_id, item_id):
    if item_id == "":
        server_url = "http://127.0.0.1:8081/items/"+user_id
        r = requests.get(server_url)
        return r.json()
    elif user_id=="": 
        server_url = "http://127.0.0.1:8081/movies/"+item_id
        r = requests.get(server_url)
        return r.json() 
    else:
        server_url = "http://127.0.0.1:8081/items/"+user_id+"/?itemID="+item_id
        r = requests.get(server_url)
        return r.json()

# Title
st.title("Snackfair Recommendation System")
image = Image.open('snack.jpg')
st.image(image,use_column_width=True)

#Sidebar
image2 = Image.open('burger.jpg')
st.sidebar.image(image2,width=300)





#Input UserID & ItemID
user_input = st.sidebar.text_input("User ID")
item_input = st.sidebar.text_input("Item ID")
cal = st.sidebar.slider("Select calories", 1,500,250)


#st.markdown(usr_headline)

if st.checkbox('View Your Activity'):
    data = pd.read_csv('InputName.csv')
    userdata = data[data['userID']==int(user_input)]
    username = userdata['userName'].unique()
    
    usr_headline = "## Welcome " + username[0] + "\n" + " Your Trends and Statistics till date."
    st.markdown(usr_headline)
    
    st.subheader("Your Activity Dataframe -")
    st.dataframe(userdata)
    
    st.subheader("Rating Trend of User")
    userRating = pd.DataFrame(userdata.groupby('rating')['rating'].count())

    fig_rating = go.Figure(data=[go.Scatter(x=userRating.index,y = userRating['rating'])])
    fig_rating.update_layout(title='Rating vs Count',xaxis_title='Rating',yaxis_title='Count (No. of Food Items )',width=800, height=600)
    st.plotly_chart(fig_rating)
    
    
    st.subheader('Preferred Food Category')
    userCateg = pd.DataFrame(userdata.groupby('category')['category'].count())
    colortype = list(Paired12[:len(userCateg)])
    fig_categ = go.Figure(data=[go.Bar(x=userCateg.index,y=userCateg['category'],marker_color=colortype)])
    fig_categ.update_layout(title="Food Category vs Count", xaxis_title='Types of Food', yaxis_title='Count (Number of Products)', xaxis_tickangle=-45,width=800, height=600)    
    st.plotly_chart(fig_categ)
    
    st.subheader('Average Rating per Food Category')
    avgCateg = pd.DataFrame(userdata.groupby('category')['rating'].mean())
    colortype2 = list(Paired12[:len(avgCateg)])
    fig_avgcateg = go.Figure(data=[go.Bar(x=avgCateg.index,y=avgCateg['rating'],marker_color=colortype2)])
    fig_avgcateg.update_layout(title="Food Category vs Rating", xaxis_title='Types of Food', yaxis_title=' Average Rating', xaxis_tickangle=-45,width=800, height=600)    
    st.plotly_chart(fig_avgcateg)
    
    
st.sidebar.subheader('Get Snack Recommendation')
if st.sidebar.checkbox('NCF Algorithm'):
    st.header('Snack Recommendation using NCF Algorithm')
    result = get_dataset(user_input, item_input)
    b = [_ for _ in result.keys()]
    if b[0] == 'userID':
        df = pd.DataFrame(result['Other_details'])
    elif b[0] == 'user_id':
        df = pd.DataFrame(result['item'].items())
    else:
        df = pd.DataFrame(result['Other_details'])
#    df = pd.DataFrame(result1['Other_details'])
#    df2 = df[df.calories < cal]
#    st.table(df)
    st.dataframe(df)   
#    df1 = pd.DataFrame(result['Other_details'])
#    st.dataframe(df1)
#    st.write('result: %s' % result)
 
# =============================================================================
# user_input2 = st.sidebar.text_input("User ID1")
# item_input2 = st.sidebar.text_input("Item ID1")
# =============================================================================
if st.sidebar.checkbox('RBM Algorithm'):
    st.header('Snack Recommendation using RBM Algorithm')
    result1 = get_dataset1(user_input, item_input)
#    st.write('result1: %s' % result1)
    b = [_ for _ in result1.keys()]
    if b[0] == 'userID':
        df1 = pd.DataFrame(result1['Other_details'])
    elif b[0] == 'user_id':
        df1 = pd.DataFrame(result1['item'].items())
    else:
        df1 = pd.DataFrame(result1['Other_details'])
#    df = pd.DataFrame(result1['Other_details'])
#    df2 = df[df.calories < cal]
#    st.table(df1)
    st.dataframe(df1)
    
    