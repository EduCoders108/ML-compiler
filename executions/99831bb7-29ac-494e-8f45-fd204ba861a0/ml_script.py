
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
    path = os.path.join(r"C:\Users\HP\ML-compiler\backend\executions\99831bb7-29ac-494e-8f45-fd204ba861a0\models", name + ".pkl")
    joblib.dump(model, path)
    return path

# Make directories available for outputs
EXECUTION_DIR = r"C:\Users\HP\ML-compiler\backend\executions\99831bb7-29ac-494e-8f45-fd204ba861a0"
PLOT_DIR = r"C:\Users\HP\ML-compiler\backend\executions\99831bb7-29ac-494e-8f45-fd204ba861a0\plots"

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
print("Hello World")