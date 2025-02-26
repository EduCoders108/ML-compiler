from flask import Flask, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.datasets import load_iris, load_wine, load_digits
import pandas as pd
import numpy as np
import joblib
import os

app = Flask(__name__)

import logging

logging.basicConfig(filename="app.log", level=logging.ERROR, format="%(asctime)s - %(levelname)s - %(message)s")


# Base directory for datasets
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATASET_DIR = os.path.join(BASE_DIR, "datasets")
os.makedirs(DATASET_DIR, exist_ok=True)

# Load predefined datasets
datasets = {
    "iris": load_iris(as_frame=True).frame,
    "wine": load_wine(as_frame=True).frame,
    "digits": load_digits(as_frame=True).frame,
    "titanic": pd.read_csv(os.path.join(DATASET_DIR, "titanic.csv")),
    "boston": pd.read_csv(os.path.join(DATASET_DIR, "boston.csv"))
}

# Directory to store trained models
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

def load_dataset(dataset_name):
    """Loads a dataset from predefined ones or uploaded CSV files."""
    if dataset_name in datasets:
        return datasets[dataset_name]
    
    dataset_path = os.path.join(DATASET_DIR, f"{dataset_name}.csv")
    if os.path.exists(dataset_path):
        return pd.read_csv(dataset_path)  # Load CSV dataset

    return None  # If dataset not found

@app.route('/')
def home():
    return jsonify({"message": "Flask API is Running!"})

# Upload Dataset
@app.route('/upload', methods=['POST'])
def upload_dataset():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    filename = file.filename
    
    if not filename.endswith(".csv"):
        return jsonify({"error": "Only CSV files are allowed"}), 400

    file_path = os.path.join(DATASET_DIR, filename)
    file.save(file_path)
    
    return jsonify({"message": f"Dataset {filename} uploaded successfully", "file_path": file_path})

# List Available Datasets
@app.route("/datasets", methods=["GET"])
def list_datasets():
    return jsonify({"datasets": list(datasets.keys()) + [f[:-4] for f in os.listdir(DATASET_DIR) if f.endswith('.csv')]})

# Dataset Info
@app.route("/dataset-info", methods=["POST"])
def dataset_info():
    data = request.get_json()
    dataset_name = data.get("dataset")

    df = load_dataset(dataset_name)
    if df is None:
        return jsonify({"error": "Dataset not found"}), 400

    info = {
        "columns": list(df.columns),
        "data_types": df.dtypes.apply(str).to_dict(),
        "missing_values": df.isnull().sum().to_dict(),
        "shape": df.shape
    }
    return jsonify(info)

# Dataset Preview
@app.route("/dataset-preview", methods=["POST"])
def dataset_preview():
    data = request.get_json()
    dataset_name = data.get("dataset")

    df = load_dataset(dataset_name)
    if df is None:
        return jsonify({"error": "Dataset not found"}), 400

    return jsonify(df.head().to_dict(orient="records"))

# Train Model
# Train Model
@app.route('/train', methods=['POST'])
def train():
    try:
        data = request.get_json()
        dataset_name = data.get("dataset")
        model_name = data.get("model")
        selected_features = data.get("features")
        target_column = data.get("target")

        df = load_dataset(dataset_name)
        if df is None:
            return jsonify({"error": "Dataset not found"}), 400

        if not selected_features or target_column not in df.columns:
            return jsonify({"error": "Invalid feature selection"}), 400
        if target_column in selected_features:
            return jsonify({"error": "Target column should not be in feature list"}), 400

        X = df[selected_features]
        y = df[target_column]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

        # Dictionary of available models
        model_dict = {
            "logistic_regression": LogisticRegression(),
            "decision_tree": DecisionTreeClassifier(),
            "random_forest": RandomForestClassifier(),
            "svm": SVC(),
            "knn": KNeighborsClassifier()
        }

        if model_name not in model_dict:
            return jsonify({"error": "Invalid model name"}), 400

        model = model_dict[model_name]
        model.fit(X_train, y_train)

        # Ensure models directory exists
        os.makedirs(MODEL_DIR, exist_ok=True)

        # Save the trained model & scaler
        model_path = os.path.join(MODEL_DIR, f"{model_name}_{dataset_name}.pkl")
        scaler_path = os.path.join(MODEL_DIR, f"{dataset_name}_scaler.pkl")

        joblib.dump(model, model_path)   # Save model
        joblib.dump(scaler, scaler_path) # Save scaler

        accuracy = accuracy_score(y_test, model.predict(X_test))

        return jsonify({"message": "Model trained successfully", "accuracy": accuracy})

    except Exception as e:
    logging.error(f"Error in /train: {str(e)}")
    return jsonify({"error": str(e)}), 500



@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        dataset_name = data.get("dataset")
        model_name = data.get("model")
        input_features = data.get("features")

        if dataset_name not in datasets:
            return jsonify({"error": "Dataset not found"}), 400
        if model_name not in ["logistic_regression", "decision_tree", "random_forest", "svm", "knn"]:
            return jsonify({"error": "Model not found"}), 400

        model_path = os.path.join(MODEL_DIR, f"{model_name}_{dataset_name}.pkl")
        scaler_path = os.path.join(MODEL_DIR, f"{dataset_name}_scaler.pkl")

        if not os.path.exists(model_path) or not os.path.exists(scaler_path):
            return jsonify({"error": "Model not trained. Train the model first using /train"}), 400

        # Load the trained model & scaler
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)

        # Convert input features to NumPy array & apply scaling
        input_array = np.array(input_features).reshape(1, -1)
        input_scaled = scaler.transform(input_array)

        # Make prediction
        prediction = model.predict(input_scaled).tolist()

        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
