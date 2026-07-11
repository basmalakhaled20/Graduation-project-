# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import sqlite3
import random

# ------------------------------
# إعداد FastAPI و CORS
# ------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ممكن تحددي localhost فقط لو تحبي
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------
# إعداد قاعدة البيانات SQLite
# ------------------------------
DB_FILE = "predictions.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT,
            Ia REAL,
            Ib REAL,
            Ic REAL,
            Va REAL,
            Vb REAL,
            Vc REAL,
            Fault_Type TEXT,
            Diagnosis TEXT,
            Severity TEXT,
            System_Health REAL,
            Confidence REAL
        )
    """)
    conn.commit()
    conn.close()

init_db()  # نعمل الجدول لو مش موجود

# ------------------------------
# إعداد السميوليشن
# ------------------------------
FEATURES = ["Ia","Ib","Ic","Va","Vb","Vc"]
FAULT_MAP = {
    0: "Normal Operation",
    1: "LG Fault",
    2: "LL Fault",
    3: "LLG Fault",
    4: "LLL Fault",
    5: "LLL-G Fault"
}

class Signal(BaseModel):
    Ia: float
    Ib: float
    Ic: float
    Va: float
    Vb: float
    Vc: float

# ------------------------------
# Endpoint للتنبؤ وتسجيله
# ------------------------------
@app.post("/predict")
def predict(signal: Signal):
    # عمل Prediction وهمي (Simulation)
    pred_id = random.choices([0,1,2,3,4,5], weights=[1,1,1,1,1,1])[0]
    
    # تعديل القيم حسب نوع العطل
    Ia, Ib, Ic, Va, Vb, Vc = signal.Ia, signal.Ib, signal.Ic, signal.Va, signal.Vb, signal.Vc
    if pred_id == 1:
        Ia = random.randint(300,500)
    elif pred_id == 2:
        Ib = random.randint(300,500)
    elif pred_id == 3:
        Ic = random.randint(300,500)
    elif pred_id == 4:
        Ia = Ib = Ic = random.randint(400,600)
    elif pred_id == 5:
        Ia = Ib = Ic = random.randint(450,650)
        Va = Vb = Vc = 72000
    else:
        Ia = random.randint(0,100)
        Ib = random.randint(0,100)
        Ic = random.randint(0,100)

    # تقييم الشدة والسبب
    max_current = max(Ia, Ib, Ic)
    if max_current < 50: severity = "Low"
    elif max_current < 150: severity = "Medium"
    elif max_current < 250: severity = "High"
    else: severity = "Critical"

    voltage_ratio = min(Va,Vb,Vc)/((Va+Vb+Vc)/3)
    if voltage_ratio < 0.98: cause = "Voltage Instability"
    elif max_current > 200: cause = "Overload Condition"
    else: cause = "Electrical Disturbance"
    if pred_id == 0: cause = "Stable Operation"

    confidence = random.uniform(70,99)
    health = confidence if pred_id==0 else 100-confidence

    # حفظ النتيجة في قاعدة البيانات
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO predictions (
            time, Ia, Ib, Ic, Va, Vb, Vc, Fault_Type, Diagnosis, Severity, System_Health, Confidence
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        Ia, Ib, Ic, Va, Vb, Vc,
        FAULT_MAP[pred_id],
        cause,
        severity,
        round(health,2),
        round(confidence,2)
    ))
    conn.commit()
    conn.close()

    # إرجاع النتيجة للـ frontend
    return {
        "Fault_Type": FAULT_MAP[pred_id],
        "Confidence": round(confidence,2),
        "System_Health": round(health,2),
        "Diagnosis": cause,
        "Severity": severity,
        "Ia": Ia,
        "Ib": Ib,
        "Ic": Ic,
        "Va": Va,
        "Vb": Vb,
        "Vc": Vc
    }

# ------------------------------
# Endpoint لعرض آخر 50 نتيجة
# ------------------------------
@app.get("/history")
def get_history():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM predictions ORDER BY id DESC LIMIT 50")
    rows = cursor.fetchall()
    conn.close()

    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "time": row[1],
            "Ia": row[2],
            "Ib": row[3],
            "Ic": row[4],
            "Va": row[5],
            "Vb": row[6],
            "Vc": row[7],
            "Fault_Type": row[8],
            "Diagnosis": row[9],
            "Severity": row[10],
            "System_Health": row[11],
            "Confidence": row[12]
        })
    return results