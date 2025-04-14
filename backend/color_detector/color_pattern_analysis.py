import cv2
import numpy as np
from sklearn.cluster import KMeans

def get_dominant_color(image, k=2):
    image = cv2.resize(image, (100, 100))
    data = image.reshape((-1, 3))
    kmeans = KMeans(n_clusters=k, random_state=42).fit(data)
    colors = kmeans.cluster_centers_.astype(int)
    return colors

def detect_pattern(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)
    lines = cv2.HoughLines(edges, 1, np.pi / 180, 120)
    if lines is not None and len(lines) > 10:
        return "striped"
    contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    if len(contours) > 30:
        return "dotted"
    return "plain"

def color_name(rgb):
    r, g, b = rgb
    if r > 200 and g < 100 and b < 100:
        return "red"
    elif g > 200 and r < 100 and b < 100:
        return "green"
    elif b > 200 and r < 100 and g < 100:
        return "blue"
    elif r > 200 and g > 200 and b < 100:
        return "yellow"
    elif r > 200 and g > 200 and b > 200:
        return "white"
    elif r < 50 and g < 50 and b < 50:
        return "black"
    return "mixed"

def analyze_image(image_path):
    image = cv2.imread(image_path)
    colors = get_dominant_color(image)
    color_desc = " and ".join([color_name(c) for c in colors])
    pattern = detect_pattern(image)
    return f"This is a {color_desc} {pattern} item."