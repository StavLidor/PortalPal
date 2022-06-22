# Importing libraries
import pickle

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
asd_data = pd.read_csv("C:/Users/Ronli/WebstormProjects/portal_website/AQmodel/input/Toddler Autism dataset July 2018.csv")

# get rid of the data we do not need
asd_data.drop(['Case_No', 'Who completed the test'], axis=1, inplace=True)

label_encoder = LabelEncoder()
columns = ['Class_ASD Traits', 'Family_mem_with_ASD',  'Jaundice', 'Ethnicity', 'Sex',]
for col in columns:
    asd_data[col] = label_encoder.fit_transform(asd_data[col])


X = asd_data.drop(['Class_ASD Traits'], axis=1)
print("X: ", X)
Y = asd_data['Class_ASD Traits']
x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=7)


###################### FIRST MODEL ######################

# KNN
knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(x_train, y_train)
pred = knn.predict(x_test)

classification_report(y_test, pred)


# find the best k in knn, which means the optimum number of neighbors to consider
error = []
for i in range(1, 40):
    knn = KNeighborsClassifier(n_neighbors=i)
    knn.fit(x_train, y_train)
    pred = knn.predict(x_test)
    error.append(np.mean(y_test != pred))
# plt.figure(figs=(10, 10))
# plt.plot(range(1, 40), error, color='green', linestyle='dashed', marker='o', marketplace='red')

knn = KNeighborsClassifier(n_neighbors=27)
knn.fit(x_train, y_train)
pred = knn.predict(x_test)
classification_report(y_test, pred)

confusion_matrix(y_test, pred)

#########################################################



###################### SECOND MODEL ######################

# logistic regression
log_reg = LogisticRegression()
model = log_reg.fit(x_train, y_train)
# save the model to disk
filename = 'finalized_model.sav'
pickle.dump(model, open(filename, 'wb'))

prediction = log_reg.predict(x_test)
log_reg.score(x_train, y_train)

classification_report(y_test, prediction)

#########################################################



###################### THIRD MODEL ######################

# decision tree
d_tree = DecisionTreeClassifier()
d_tree.fit(x_train, y_train)
pred = d_tree.predict(x_test)
classification_report(y_test, pred)

#########################################################



###################### FOURTH MODEL ######################

# Random forest
random_forest = RandomForestClassifier()
random_forest.fit(x_train, y_train)
pred = random_forest.predict(x_test)
classification_report(y_test, pred)

confusion_matrix(y_test, pred)

#########################################################



###################### FIFTH MODEL ######################

# SVM
model = SVC()
model.fit(x_train, y_train)
pred = model.predict(x_test)
classification_report(y_test, pred)

confusion_matrix(y_test, pred)

#########################################################


# check all the models in order to get the one with the best results
models = []

models.append(('KNN                 :', KNeighborsClassifier()))
models.append(('Logistic Regression :', LogisticRegression()))
models.append(('Naive Bayes         :', GaussianNB()))
models.append(('SVM                 :', SVC()))
models.append(('Decision Tree       :', DecisionTreeClassifier()))
models.append(('Random forest       :', RandomForestClassifier()))

for name, model in models:
    model.fit(x_train, y_train)
    pred = model.predict(x_test).astype(int)
    # print("y_test", y_test)
    # print("pred", pred)
    print(name, accuracy_score(y_test, pred))
