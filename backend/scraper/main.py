import re
import json
import requests
import traceback
from itertools import chain
from bs4 import BeautifulSoup


def get_manga(archive_link, cont, data, manga_obj):
    soup = BeautifulSoup(requests.get(archive_link).content, 'html.parser')

    for manga in soup('div', class_='entry'):
        manga_data = {}
        cont += 1
        manga_data['id'] = cont
        manga_data['title'] = manga.find('a')['title']
        manga_data['preview'] = manga.find('img')['src']
        manga_data['bookmarked'] = False
        manga_data['routeName'] = re.sub("[^0-9a-zA-Z]+", "", manga_data['title'])
        manga_data['routeName'] = str(manga_data['routeName']).replace(" ", "-")
        print('manga:' + manga.find('a')['href'])
        manga_data['link'] = get_single_manga(manga_link=manga.find('a')['href'])
        manga_data['link'].sort()
        manga_data['link'] = list(chain.from_iterable(manga_data['link']))
        data.append(manga_data)


def get_single_manga(manga_link):
    manga_list = []
    page_content = BeautifulSoup(requests.get(manga_link).content, 'html.parser')
    manga_part = page_content.find('div', class_='chapters-wrapper')

    for manga in manga_part('div', class_='chapter'):
        manga_url = manga.find('a')['href']
        if str(manga_url).endswith('?style=list') or str(manga_url).endswith('?style=list'):
            manga_url = manga_url[:-11]
        manga_url = f'{ manga_url }/1'
        print(f'link chapter: { str(manga_url) }')
        manga_list.append(get_single_chapter(manga_url))

    return manga_list


def get_single_chapter(manga_url):
    save = []

    try:
        soup = BeautifulSoup(requests.get(manga_url).content, 'html.parser')
        manga_container = soup.find_all('img', {"class": "img-fluid"})
        chapter_index = soup.find("option", {"value": "0"}).text
        chapter_index = str(chapter_index[2:len(str(chapter_index))])
        manga_container = manga_container[1]['src']
    except Exception:
        traceback.print_exc()
    
    img_extension = str(manga_container).split('.')
    img_extension = f'.{ img_extension[3] }'
    for i in range(int(chapter_index)):
        manga_container = manga_container[:-(len(img_extension))]
        if i < 10:
            manga_container = manga_container[:-1]
            manga_container += str(i + 1)
        if i >= 10:
            manga_container = manga_container[:-2]
            manga_container += str(i + 1)
        if i >= 100:
            manga_container = manga_container[:-3]
            manga_container += str(i + 1)
        manga_container = f'{ manga_container + img_extension }'
        print('link pages: ' + str(manga_container))
        save.append(str(manga_container))

    return save


if __name__ == "__main__":
    cont = 0
    data = []
    manga_obj = {}

    for i in range(1):
        link = f'https://www.mangaworld.io/archive?page={ i }'
        print(str(i))
        get_manga(link, cont, data, manga_obj)

    manga_obj = {'mangas': data}

    with open('frontend/dist/frontend/db.json', 'w', encoding='utf-8') as f:
        json.dump(manga_obj, f, ensure_ascii=False, indent=2)
