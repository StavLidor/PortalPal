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


# # read the csv file
# asd_data = pd.read_csv("./input/Toddler Autism dataset July 2018.csv")
# print("asd_data", asd_data)
# print("argv1", sys.argv[1])

# argument = sys.argv[1]
# create csv from this line
# f = open('AQ.csv', 'w')
# with open('AQ.csv', 'w', encoding='UTF8', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerows(
#         [
#             ['Case_No', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'Age_Mons', 'Qchat-10-Score',
#              'Sex',
#              'Ethnicity', 'Jaundice', 'Family_mem_with_ASD', 'Who completed the test'],
#             argument.split(',')]
#     )
# writer.writerow(argument.split(','))


def get_aq_prediction(data_string, model):

    test_string = StringIO(
        'Case_No,A1,A2,A3,A4,A5,A6,A7,A8,A9,A1,Age_Mons,Qchat-10-Score,Sex,Ethnicity,Jaundice,Family_mem_with_ASD,'
        'Who completed the test\n' + data_string)
    # test_string+=argument
    # asd_data = pd.read_csv('AQ.csv')
    asd_data = pd.read_csv(test_string, sep=",")
    print(asd_data)
    # get rid of the data we do not need
    asd_data.drop(['Case_No', 'Who completed the test'], axis=1, inplace=True)

    label_encoder = LabelEncoder()
    columns = ['Family_mem_with_ASD', 'Jaundice', 'Ethnicity', 'Sex', ]
    for col in columns:
        asd_data[col] = label_encoder.fit_transform(asd_data[col])

    # X = asd_data.drop(['Class_ASD Traits'], axis=1)
    X = asd_data
    # print("X: ", X)
    # Y = asd_data['Class_ASD Traits']
    # x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=7)
    # x_test = X

    # logistic regression
    log_reg = LogisticRegression()
    # log_reg.fit(x_train, y_train)

    # load the model from disk
    # loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
    # result = loaded_model.score()

    prediction = model.predict(X)
    # print(prediction)
    return prediction
    # log_reg.score(x_train, y_train)

    # classification_report(y_test, prediction)
