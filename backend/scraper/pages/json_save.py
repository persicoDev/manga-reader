import json


def file_save(manga_save):
    with open("backend/db.json", 'r+', encoding='utf-8') as file:
        json.dump(manga_save, ensure_ascii=False, indent=2)
