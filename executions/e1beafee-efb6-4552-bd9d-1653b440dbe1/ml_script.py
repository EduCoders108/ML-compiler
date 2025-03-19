
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import datasets, metrics, model_selection
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import tensorflow as tf
import joblib
import io
import base64
import os
import sys
import json

# Suppress TensorFlow warnings
tf.get_logger().setLevel('ERROR')

# Helper function to save plots as base64
def save_plot_as_base64():
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    plt.close()
    return img_str

# Function to save model
def save_model(model, name):
    path = os.path.join(r"C:\Users\HP\ML-compiler\backend\executions\e1beafee-efb6-4552-bd9d-1653b440dbe1\models", name + ".pkl")
    joblib.dump(model, path)
    return path

# Make directories available for outputs
EXECUTION_DIR = r"C:\Users\HP\ML-compiler\backend\executions\e1beafee-efb6-4552-bd9d-1653b440dbe1"
PLOT_DIR = r"C:\Users\HP\ML-compiler\backend\executions\e1beafee-efb6-4552-bd9d-1653b440dbe1\plots"

# Load dataset: iris
dataset = pd.read_csv(r"C:\Users\HP\ML-compiler\backend\executions\e1beafee-efb6-4552-bd9d-1653b440dbe1\iris.csv")
# Split dataset into X (features) and y (target) - assumes last column is target
X = dataset.iloc[:, :-1]
y = dataset.iloc[:, -1]
# Create train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Lists to capture results
plots = []
metrics_results = {}
trained_models = {}

# Function to capture plots
def capture_plot(title="Plot"):
    img_str = save_plot_as_base64()
    plots.append({"title": title, "data": img_str})
    return img_str

# Override plt.show() to capture plots
original_show = plt.show
def custom_show(*args, **kwargs):
    capture_plot()
    plt.close()
plt.show = custom_show

# Function to save metrics
def save_metrics(name, metrics_dict):
    metrics_results[name] = metrics_dict

# Function to output results as JSON at the end
def output_results():
    results = {
        'plots': plots,
        'metrics': metrics_results,
        'models': list(trained_models.keys())
    }
    print("\n__ML_RESULTS_JSON_START__")
    print(json.dumps(results))
    print("__ML_RESULTS_JSON_END__")

# Register output function to run at exit
import atexit
atexit.register(output_results)


# User code begins here
# Simple model without seaborn
from sklearn.ensemble import RandomForestClassifier

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate and display accuracy
acc = accuracy_score(y_test, y_pred)
print(f'Model accuracy: {acc:.4f}')

# Save metrics
save_metrics('random_forest', {
    'accuracy': float(acc),
    'feature_importances': model.feature_importances_.tolist()
})

# Create a confusion matrix plot
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y_test, y_pred)
plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
plt.colorbar()
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()