# import cv2 
import os
from dotenv import load_dotenv, find_dotenv
import glob
import requests
import json

api_key = "be67cdd4748df26a52ba"
api_secret = "5c3967e4bf11dd1181b2cfd7d1571bf3ac90e3d534095a12b56612175ae23438"
jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2Y2I4MDU0OC1iZGZmLTRhZGMtODAwNi1hNmMyNjViZmIwOGMiLCJlbWFpbCI6Imt5bGUucmV5bm9sZHM5MTQ2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiZTY3Y2RkNDc0OGRmMjZhNTJiYSIsInNjb3BlZEtleVNlY3JldCI6IjVjMzk2N2U0YmYxMWRkMTE4MWIyY2ZkN2QxNTcxYmYzYWM5MGUzZDUzNDA5NWExMmI1NjYxMjE3NWFlMjM0MzgiLCJpYXQiOjE2MzI0MDM5NjZ9.B42815AD6IC1AYBwFR84QZSFm1eH5s525RLKwdQfaqk"

path = glob.glob("./bird_images/*.png")

imgArr = []

for file in path:
  # print(file)
  imgArr.append(file)
  # img = cv2.imread(file)
  # cv2.imshow("Image", img)
  # cv2.waitKey(0)
  # cv2.destroyAllWindows()

imgArr.sort()

url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
headers = {
  # "pinata_api_key": os.environ.get("REACT_APP_PINATA_KEY"),
  # "pinata_secret_api_key": os.environ.get("REACT_APP_PINATA_SECRET")
  "pinata_api_key": "be67cdd4748df26a52ba",
  "pinata_secret_api_key": "5c3967e4bf11dd1181b2cfd7d1571bf3ac90e3d534095a12b56612175ae23438"
}
data = {
  "file": imgArr[0]
}
jsonObject = json.dumps(data)

response = requests.post(url, data=jsonObject, headers=headers,)

print(response)
print("Status Code", response.status_code)
print("JSON Response ", response.json())