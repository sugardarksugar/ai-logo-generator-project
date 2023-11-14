import os
from os import listdir
 
# get the path/directory
folder_dir = "/Users/dnpy5822/Desktop/Project3/Tecky-Project-3/node-server/protected/res/google_picture"
for images in os.listdir(folder_dir):
    # for images in os.listdir(folder):
    # for images in os.listdir(os.path.join("/Users/dnpy5822/Desktop/Project3/Tecky-Project-3/node-server/protected/res/sample/", folder)):
    # check if the image ends with png
    if (images.endswith(".jpeg") or images.endswith(".png") or images.endswith(".webp")):
        print(images)

