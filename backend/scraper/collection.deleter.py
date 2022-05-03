import os
import pymongo
from dotenv import load_dotenv


load_dotenv()
DB_USERNAME = str(os.environ.get("DB_USERNAME"))
DB_PASSWORD = str(os.environ.get("DB_PASSWORD"))

if __name__ == '__main__':
    try:
        my_client = pymongo.MongoClient(
            f'mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@manga-database.sbycl.mongodb.net/?retryWrites=true&w=majority')
        db = my_client.test
        my_database = my_client['Manga-Database']
        my_collection = my_database['manga-infos']
        my_collection.delete_many({})
        print('tutto procede correttamente')
    except:
        print('errore')
    