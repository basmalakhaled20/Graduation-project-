# ⚡ AI-Based Electrical Fault Detection System

An AI-powered web application for detecting and predicting electrical faults using Machine Learning. This project combines a **React + Vite** frontend with a **Flask** backend and a **Random Forest** model trained on electrical measurements.

---

## Overview

Electrical faults can lead to equipment damage, power outages, and safety risks. This project aims to automatically detect and classify electrical faults using machine learning, providing fast and reliable predictions through a modern web interface.

The system integrates:

- Machine Learning for fault prediction
- Flask REST API
- React + Vite frontend
- Real electrical datasets
- Interactive prediction interface

---

## Features

- Electrical fault prediction using Random Forest
- Clean and responsive React interface
- Flask REST API
- Data preprocessing and feature scaling
- Model serialization using Joblib
- Fast prediction results
- Modular project structure

---

## Project Structure

```
AI-Based-Electrical-Fault-Detection-System
│
├── dataset
│   ├── company_data.csv
│   └── kaggle_dataset.csv
│
├── notebooks
│   └── Electric_Fault_Prediction.ipynb
│
├── simulation
│   └── Simulation.ipynb
│
├── website
│   ├── backend
│   │   ├── models
│   │   │   ├── random_forest_fault_model.pkl
│   │   │   └── data_scaler.pkl
│   │   ├── main.py
│   │   └── requirements.txt
│   │
│   ├── public
│   ├── src
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── requirements.txt
├── LICENSE
└── README.md
```

---

## Technologies Used

### Machine Learning

- Random Forest
- Scikit-Learn
- Pandas
- NumPy
- Joblib

### Backend

- Python
- Flask

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

---

## Dataset

The model was trained using two different datasets:

- Company electrical measurements
- Kaggle electrical fault dataset

The datasets were cleaned, merged, preprocessed, and transformed before model training.

---

## Machine Learning Workflow

1. Data Collection
2. Data Cleaning
3. Feature Engineering
4. Data Scaling
5. Model Training
6. Model Evaluation
7. Model Deployment
8. Real-Time Prediction

---

## Model

Algorithm:

**Random Forest Classifier**

The trained model is stored inside:

```
website/backend/models
```

The scaler is also saved to ensure consistent preprocessing during prediction.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Based-Electrical-Fault-Detection-System.git
```

### Backend

```bash
cd website/backend

pip install -r requirements.txt

python main.py
```

### Frontend

```bash
cd website

npm install

npm run dev
```

---

## Usage

1. Start the Flask backend.
2. Start the React frontend.
3. Open the web application.
4. Enter the required electrical measurements.
5. Receive the predicted electrical fault.

---

## Future Improvements

- Real-time SCADA integration
- IoT sensor support
- Deep Learning models
- Cloud deployment
- Live monitoring dashboard
- Explainable AI (XAI)

---

## Author

**Basmala Khaled**

AI Graduate | Data Engineering & Machine Learning Enthusiast

LinkedIn:
https://www.linkedin.com/in/basmala-khaled-ai10/

---

## License

This project is released under the MIT License.