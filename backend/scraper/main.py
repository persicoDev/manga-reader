import json
import requests
from bs4 import BeautifulSoup

manga_obj = { }

def get_manga(archive_link):
    soup = BeautifulSoup(requests.get(archive_link).content, 'html.parser')
    data = []

    for manga in soup('div', class_='entry'):
        item_data = {}
        item_data['name'] = manga.find('a')['title']
        item_data['preview'] = manga.find('img')['src']
        item_data['bookmarked'] = False;
        item_data['link'] = get_more_info(manga_link = manga.find('a')['href'])
        data.append(item_data)
        manga_obj = { 'mangas': data }


def get_more_info(manga_link):
    manga_list = []
    page_content = BeautifulSoup(requests.get(manga_link).content, 'html.parser')
    manga_part = page_content.find('div', class_='chapters-wrapper')

    # try:
    for manga in manga_part('div', class_='chapter'):
        manga_url = manga.find('a')['href']
        manga_list.append(get_single_chapter(manga_url))
    # except:
    #     manga_list = 'Chapter not found'
    #     pass

    return manga_list


def get_single_chapter(manga_url):
    # try:
    tag = None
    soup = BeautifulSoup(requests.get(manga_url).content, 'html.parser')
    manga_container = soup.find_all(check_img(tag, soup))
    chapter_index = soup.find("option", {"value": "0"}).text
    chapter_index = str(chapter_index[2:len(str(chapter_index))])
    # except:
        # print('-error-')
    for i in range(int(chapter_index)):
        if i < 10:
            manga_url = manga_url[:-1]
            manga_url += str(i + 1)
        if i >= 10:
            manga_url = manga_url[:-2]
            manga_url += str(i + 1)
        if i >= 100:
            manga_url = manga_url[:-3]
            manga_url += str(i + 1)
        soup = BeautifulSoup(requests.get(manga_url).content, 'html.parser')
        manga_container = soup.find_all(check_img(tag, soup))
        print(str(manga_container[1]['src']))
        save = manga_container[1]['src']
        return str(save)


def check_img(tag, soup):
    tag = soup.find_all('img', {"class": "img-fluid"})
    if(tag[1].has_attr('src')):
        return str(tag[1])
    else:
        tag = soup.find_all('img', {"class": "page-image img-fluid"})
        return str(tag)


for i in range(1, 142):
    link = f'https://www.mangaworld.io/archive?page={ i }'
    print(str(i))
    get_manga(link)

with open('backend/db.json', 'w', encoding='utf-8') as f:
        json.dump(manga_obj, f, ensure_ascii=False, indent=2)