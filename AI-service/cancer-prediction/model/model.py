# model.py

from sklearn.linear_model import LogisticRegression

# Train the model
def train_model(X_train, y_train):
    model = LogisticRegression(max_iter=5000)
    model.fit(X_train, y_train)
    return model
