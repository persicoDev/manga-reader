import json

def file_save(save):
    file = open('link.txt', 'a')
    file.write(str(save) + "\n")
    file.close()