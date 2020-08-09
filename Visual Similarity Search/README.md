## Introduction
### About Dataset 
https://www.kaggle.com/inversion/processing-bson-files <br /> 

## Cosine Similarity Dataflow
![Alt Text](https://github.com/rhnyewale/INFO7374-Algorithmic-Digital-Marketing/blob/master/Assignment%203/Cosine_Similarity/1.jpg)
![Alt Text](https://github.com/rhnyewale/INFO7374-Algorithmic-Digital-Marketing/blob/master/Assignment%203/Cosine_Similarity/2.jpg)

## FAISS - Facebook AI Similarity Search Method Dataflow
![Alt Text](https://github.com/rhnyewale/INFO7374-Algorithmic-Digital-Marketing/blob/master/Assignment%203/Facebook_AI_Similarity_Search/Faiss_dataflow.jpg)

## Spotify Annoy Method - Dataflow
![Alt Text](https://github.com/rhnyewale/INFO7374-Algorithmic-Digital-Marketing/blob/master/Assignment%203/Spotify/Spotify_dataflow.jpg)
## StreamLit App
Deployed on Heroku - https://imagecl.herokuapp.com/

Cosine Similarity: ![Alt Text](https://github.com/rhnyewale/INFO7374-Algorithmic-Digital-Marketing/blob/master/Assignment%203/Streamlit_screenshots/1.png)

Facebook AI Similarity Search: ![Alt Text](https://github.com/rhnyewale/INFO7374-Algorithmic-Digital-Marketing/blob/master/Assignment%203/Streamlit_screenshots/2.png)

## About Folders
Images/ - This folder contains all the images used for similarity search <br/><br/>
StreamLitApp/- In command prompt cd to this folder and then run "streamlit run first_app.py"<br/><br/>
Cosine_Similarity/- This folder contains Cosine_Similarity.ipynb file where we've performed similar search images using cosine similarty method and got the top 10 similar images w.r.t each image on the basis of similarity score in the .csv file which is further used in streamlit app<br/><br/>
Data Preprocessing/- bson_to_disk.ipynb file to extract and download bson file to computer disk <br/><br/>
Facebook_AI_Similarity_Search/- FacebookAISS.ipynb file contains FAISS method and faiss_to_csv.ipynb file is used to get top 10 similar images w.r.t each image and stored in 
.csv file which is further used in the streamlit app. <br/><br/>
Spotify/- Spotify.ipynb returns json file which was further indexed using elasticsearch <br/>
