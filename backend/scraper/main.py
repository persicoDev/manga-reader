import re
import json
import requests
import traceback
from itertools import chain
from bs4 import BeautifulSoup


def get_manga(archive_link, cont, data, manga_obj):
    soup = BeautifulSoup(requests.get(archive_link).content, 'html.parser')

    for manga in soup('div', class_='entry'):
        chapter_cont = 0
        manga_data = {}
        cont += 1
        manga_data['id'] = cont
        manga_data['title'] = manga.find('a')['title']
        manga_data['preview'] = manga.find('img')['src']
        manga_data['routeName'] = re.sub("[^0-9a-zA-Z]+", "", manga_data['title'])
        manga_data['routeName'] = str(manga_data['routeName']).replace(" ", "-")
        print('manga:' + manga.find('a')['href'])
        manga_data = get_manga_info(manga_data, manga.find('a')['href'])
        manga_data['link'] = get_single_manga(manga_data, chapter_cont, manga_link=manga.find('a')['href'])
        manga_data['link'].sort()
        manga_data['link'] = list(chain.from_iterable(manga_data['link']))
        data.append(manga_data)

def get_manga_info(manga_data, link):
    manga = BeautifulSoup(requests.get(link).content, 'html.parser')
    trama = manga.find('div', {'id': 'noidungm'}).get_text()
    manga_info = manga.find('div', {'class': 'meta-data'})
    alt_title = manga_info.find('div', {'class': 'col-12'}).get_text()
    alt_title = alt_title[21:]
    category_all = manga_info.find_all('a', {'class': 'badge-primary'})
    genres = [category.get_text() for category in category_all]
    all_links = manga_info.findAll('a')
    author = artist = status = year = 'Sconosciuto'
    for link in all_links:
        if re.search('author', str(link)):
            author = link.get_text()
        if re.search('artist', str(link)):
            artist = link.get_text()
        if re.search('status', str(link)):
            status = link.get_text()
        if re.search('year', str(link)):
            year = link.get_text()
    return {
        **manga_data,
        'trama': trama,
        'alt_title': alt_title,
        'genres': genres,
        'author': author,
        'artist': artist,
        'status': status,
        'year': year,
    }

def get_single_manga( manga_data,chapter_cont, manga_link ):
    manga_list = []
    page_content = BeautifulSoup(requests.get(manga_link).content, 'html.parser')
    manga_part = page_content.find('div', class_='chapters-wrapper')

    for manga in manga_part('div', class_='chapter'):
        chapter_cont += 1
        manga_url = manga.find('a')['href']
        if str(manga_url).endswith('?style=list'):
            manga_url = manga_url[:-11]
        manga_url = f'{ manga_url }/1'
        manga_url = f'{ manga_url }?style=list'
        print(f'link chapter: { str(manga_url) }')
        manga_list.append(get_single_chapter(manga_url))
    manga_data['chapter_cont'] = chapter_cont

    return manga_list


def get_single_chapter(manga_url):
    save = []

    try:
        soup = BeautifulSoup(requests.get(manga_url).content, 'html.parser')
        manga_container = soup.find_all('img', {"class": "page-image img-fluid"}) #modifica tag src per diminuire righe
        for single_manga_link in manga_container:
            save.append(str(single_manga_link['src']))
    except Exception:
        traceback.print_exc()

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

    with open('Persichetti/db.json', 'w', encoding='utf-8') as f:
        json.dump(manga_obj, f, ensure_ascii=False, indent=2)