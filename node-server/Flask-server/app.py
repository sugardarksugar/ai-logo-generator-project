import os
from flask import Flask, jsonify, request
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from flask_cors import CORS
# import os
from os import listdir

app = Flask(__name__)
CORS(app)


@app.route('/recieveFromLogoGeneration', methods=['POST'])
def result_to_express():

    try:
        content = request.json
        print(content)

        originImagePath = content["path"]

        imgSize = 224
        class_names = ['animals', 'anime', 'black logo', 'books',
                       'colourful logo', 'cute', 'food', 'instrument', 'words']
        model_dir = "pictureLabel.h5"
        predict_Model = tf.keras.models.load_model(model_dir)

        # imgPath refer to targeted image
        imgPath = os.path.join("..", "data-from-googlecollab", originImagePath)
        image = tf.keras.preprocessing.image.load_img(
            imgPath, color_mode="rgb", target_size=(imgSize, imgSize)
        )

        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        input_arr = np.array([input_arr])

        prediction = predict_Model.predict(input_arr)
        prediction_Argsort = np.argsort(prediction[0])[::-1]

        result_label = class_names[prediction_Argsort[0]]
        result_poss = prediction[0][prediction_Argsort[0]] * 100

        print(f"Is that {result_label} ({result_poss}% possibility)")

        return jsonify({
            "status": True,
            "image": originImagePath,
            "result_label": result_label,
            "result_poss": result_poss
        })

    except Exception as e:
        print(e)
        return jsonify({"status": False})
