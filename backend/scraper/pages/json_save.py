import json


def file_save(manga_save):
    with open("db.json", 'w', encoding='utf-8') as f:
        json.dump(manga_save, f, ensure_ascii=False, indent=2)
