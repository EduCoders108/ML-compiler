from flask import Flask, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris, load_wine, load_digits
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load predefined datasets
datasets = {
    "iris": load_iris(as_frame=True).frame,
    "wine": load_wine(as_frame=True).frame,
    "digits": load_digits(as_frame=True).frame,
    "titanic": pd.read_csv("datasets/titanic.csv"),
    "boston": pd.read_csv("datasets/boston.csv")
}

# Available ML models
models = {
    "logistic_regression": LogisticRegression(),
    "decision_tree": DecisionTreeClassifier(),
    "random_forest": RandomForestClassifier(),
    "svm": SVC(),
    "knn": KNeighborsClassifier()
}

@app.route('/')
def home():
<<<<<<< HEAD
    return "Hello, Flask API is running"
=======
    return jsonify({"message": "Flask API is Running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        dataset_name = data.get("dataset")
        model_name = data.get("model")
        
        if dataset_name not in datasets:
            return jsonify({"error": "Dataset not found"}), 400
        if model_name not in models:
            return jsonify({"error": "Model not found"}), 400
        
        df = datasets[dataset_name]
        X = df.iloc[:, :-1]  # Features
        y = df.iloc[:, -1]   # Target

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)
        
        model = models[model_name]
        model.fit(X_train, y_train)
        predictions = model.predict(X_test).tolist()
        
        return jsonify({"predictions": predictions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
>>>>>>> 3007b43 (Updated app.py and added datasets & model file)

if __name__ == '__main__':
    app.run(debug=True)
