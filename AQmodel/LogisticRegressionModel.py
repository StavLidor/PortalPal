# Importing libraries
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


# read the csv file
asd_data = pd.read_csv("./input/Toddler Autism dataset July 2018.csv")

# get rid of the data we do not need
asd_data.drop(['Case_No', 'Who completed the test'], axis=1, inplace=True)

label_encoder = LabelEncoder()
columns = ['Class/ASD Traits ', 'Family_mem_with_ASD',  'Jaundice', 'Ethnicity', 'Sex',]
for col in columns:
    asd_data[col] = label_encoder.fit_transform(asd_data[col])


X = asd_data.drop(['Class/ASD Traits '], axis=1)
print("X: ", X)
Y = asd_data['Class/ASD Traits ']
x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=7)


# logistic regression
log_reg = LogisticRegression()
log_reg.fit(x_train, y_train)
prediction = log_reg.predict(x_test)
log_reg.score(x_train, y_train)

classification_report(y_test, prediction)

models = []
models.append(('Logistic Regression :', LogisticRegression()))

for name, model in models:
    model.fit(x_train, y_train)
    pred = model.predict(x_test).astype(int)
    print(name, accuracy_score(y_test, pred))