import json
import math
from bs4 import BeautifulSoup
import requests
import traceback


def get_new_chapters(manga_link, chapter_cont, link_list):
    new_chapter_cont = chapter_cont
    new_links = []
    soup = BeautifulSoup(requests.get(manga_link).content, 'html.parser')
    all_chap = soup.find_all("a", {"class": "chap"})
    for chapter in all_chap:
        span = chapter.find("span").get_text()
        title_num = float(span.replace("Capitolo ", ""))
        type_title_num = type(title_num)
        print(f"Chapter name = {span}\nnum = {title_num}, type = {type_title_num}\nChapter cont = {chapter_cont}")
        if title_num > chapter_cont:
            new_chapter_cont += 1
            print(f"--Trovato nuovo capitolo numero {title_num}--")
            chapter_name = span.replace(" ", "_")
            manga_url = chapter.attrs['href']
            if str(manga_url).endswith('?style=list'):
                manga_url = manga_url[:-11]
            manga_url = f'{manga_url}/1'
            manga_url = f'{manga_url}?style=list'
            new_links.append(get_single_chapter(manga_url, chapter_name))
        else:
            break
        # get_single_chapter(manga_url, chapter_name)
    new_links.reverse()
    print(type(new_links))
    for links in new_links:
        link_list.insert(0, links)
    return link_list, new_chapter_cont

def get_single_chapter(manga_url, manga_chapter):
    save = {}
    save_list = []

    try:
        soup = BeautifulSoup(requests.get(manga_url).content, 'html.parser')
        manga_container = soup.find_all('img',{"class": "page-image img-fluid"})  # modifica tag src per diminuire righe
        for single_manga_link in manga_container:
            save_list.append(str(single_manga_link['src']))
        save_list.sort()
        save[str(manga_chapter)] = save_list
    except Exception:
        traceback.print_exc()

    return save

def get_chapter_cont(id, title):
    id_pos = math.ceil(id/16)
    archive_link: str = f'https://www.mangaworld.in/archive?page={id_pos}'
    soup = BeautifulSoup(requests.get(archive_link).content, 'html.parser')
    all_tag = soup.find_all("a", {"class": "manga-title"})
    link = ""
    for tag in all_tag:
        if tag.attrs["title"] == title:
            link = tag.attrs["href"]
            break
    manga_page = BeautifulSoup(requests.get(link).content, 'html.parser')
    chapters = manga_page.find_all("div", {"class": "chapter"})
    return len(chapters), link

if __name__ == "__main__":
    manga_obj= {}
    manga_list = []
    with open('backend/test.json', 'r', encoding="utf8") as json_data:
        data = json.load(json_data)
        print(type(data))
        for manga in data["mangas"]:
            print("\nTitolo " + manga["title"])
            if manga["status"] != "Finito" and manga["status"] != "Droppato":
                print("\nControllando per update")
                chapter_cont, manga_link = get_chapter_cont(manga["id"], manga["title"])
                print(f"Attuale chapter cont = {chapter_cont}")
                manga["link"], manga["chapter_cont"] = get_new_chapters(manga_link, manga["chapter_cont"], manga["link"])
                # manga["link"].update(link_list)
            else:
                print("Finito/Droppato")
            manga_list.append(manga)
        json_data.close()
    
    manga_obj = {"mangas": manga_list}
    with open('backend/test.json', 'w', encoding="utf8") as f:
        f.seek(0)
        json.dump(manga_obj, f, ensure_ascii=False, indent=2)
        f.truncate()
        f.close()

        # json_data.seek(0)        # <--- should reset file position to the beginning.
        # json.dump(data, json_data, indent=2)
        # json_data.truncate()     # remove remaining part
        # json_data.close()