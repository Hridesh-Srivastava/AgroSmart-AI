from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle

app = Flask(__name__, static_folder='static', static_url_path='/static')

models = {
    'RandomForest': pickle.load(open('cropRandomForest.pkl', 'rb')),
'KNN': pickle.load(open('cropKNN.pkl', 'rb')),
'HistGradientBoosting': pickle.load(open('cropHistGradientBoosting.pkl', 'rb')),
'DecisionTree': pickle.load(open('cropDecisiontree.pkl', 'rb'))

# Backend\AgroAi\cropDecisiontree.pkl
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('index.html')
# @app.route('/home')
# def home():
#     return render_template('index.html')
# @app.route('/home')
# def home():
#     return render_template('index.html')
# @app.route('/home')
# def home():
#     return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        N = float(request.form['N'])
        P = float(request.form['P'])
        K = float(request.form['K'])
        temperature = float(request.form['temperature'])
        humidity = float(request.form['humidity'])
        ph = float(request.form['ph'])
        rainfall = float(request.form['rainfall'])

        model_name = request.form['model']
        model = models.get(model_name)

        if not model:
            return jsonify({'error': 'Invalid model selected'})

        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        prediction = model.predict(input_data)

        return jsonify({'prediction': str(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
