# Importing libraries
import pickle
import sys

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Suppress warnings
import warnings

warnings.filterwarnings("ignore")

# Classification
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

# Modelling Helpers :
from sklearn.model_selection import train_test_split

# Preprocessing :
from sklearn.preprocessing import LabelEncoder

# Metrics :

# Classification
from sklearn.metrics import accuracy_score, classification_report
# confusion matrix
from sklearn.metrics import classification_report, confusion_matrix
# logistic method
from sklearn.linear_model import LogisticRegression
# Random forest
from sklearn.ensemble import RandomForestClassifier
# SVM
from sklearn.svm import SVC
import csv
from io import StringIO

def get_aq_prediction(data_string, model):
    test_string = StringIO(
        'A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,Age,Gender,Ethnicity,Jaundice,Family_mem_with_ASD,country_of_res,used_app_before,result,age_desc,relation\n' + data_string)

    asd_data = pd.read_csv(test_string, sep=",")
    print(asd_data)
    # get rid of the data we do not need
    asd_data.drop(['relation', 'age_desc','used_app_before'], axis=1, inplace=True)

    label_encoder = LabelEncoder()
    columns = ['Age', 'Gender', 'Jaundice', 'Family_mem_with_ASD', 'Ethnicity', 'country_of_res']
    for col in columns:
        asd_data[col] = label_encoder.fit_transform(asd_data[col])

    X = asd_data

    log_reg = LogisticRegression()

    prediction = model.predict(X)

    return prediction
