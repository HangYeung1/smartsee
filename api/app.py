from flask import Flask, request
import torch
from PIL import Image
import io

app = Flask(__name__)

# API
@app.route('/logo-detection', methods=["POST"])
def predict():
    # Check if request is POST
    print("Received request!")
    if request.method != "POST":
        print("ERROR: Request method is not POST")
        return
    
    # Check if image is present
    if request.files.get("image"):
        print("Received image!")
        image_file = request.files["image"]
        image_bytes = image_file.read()
        img = Image.open(io.BytesIO(image_bytes))
        results = model(img, size=640)
        return results.pandas().xyxy[0].to_json(orient="records")

    print("No image found")
    return

# Run server
if __name__ == "__main__":
    # Load model
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='logo_det.pt')
    app.run(host="0.0.0.0", port=4259)
