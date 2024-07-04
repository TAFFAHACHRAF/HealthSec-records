# data.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Load the dataset
def load_dataset(file_path):
    print(file_path)
    cancer = pd.read_csv(file_path)
    return cancer

# Preprocess the dataset
def preprocess_data(cancer):
    # Define target variable and feature matrix
    y = cancer['diagnosis']
    X = cancer.drop(['id', 'diagnosis', 'Unnamed: 32'], axis=1)

    # Encode categorical variables
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y)  # Encode the target variable

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=2529)

    # Standardize the features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test, label_encoder, scaler
