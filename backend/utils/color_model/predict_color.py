import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# Load model
model = tf.keras.models.load_model('color_pattern_model.h5')

# Class labels (in the same order as folders)
class_names = ['red', 'blue', 'green', 'striped', 'dots']  # update to match your folders

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(64, 64))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = class_names[np.argmax(prediction)]

    print(f"Predicted: {predicted_class}")
    return predicted_class