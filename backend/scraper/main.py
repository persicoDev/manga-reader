import os
import re
import pymongo
import requests
import traceback
from itertools import chain
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from googlesearch import search

load_dotenv()
DB_USERNAME = str(os.environ.get("DB_USERNAME"))
DB_PASSWORD = str(os.environ.get("DB_PASSWORD"))

print(DB_PASSWORD)
def get_manga(archive_link, manga_data_list):
    global cont
    soup = BeautifulSoup(requests.get(archive_link).content, 'html.parser')

    for manga in soup('div', class_='entry'):
        manga_information = {}
        chapter_cont = 0
        cont += 1
        print(f'giusto per il contatore: {cont}')
        manga_information['link'] = {}
        manga_information['id'] = cont
        manga_information['title'] = manga.find('a')['title']
        manga_information['preview'] = manga.find('img')['src']
        manga_information['routeName'] = re.sub("[^0-9a-zA-Z]+", "", manga_information['title'])
        manga_information['routeName'] = str(manga_information['routeName']).replace(" ", "-")
        print('manga:' + manga.find('a')['href'])
        manga_information = get_manga_info(manga_information, manga.find('a')['href'], manga_information['title'])
        manga_information['link'].update(get_single_manga(manga_information, chapter_cont,manga_link=manga.find('a')['href']))
        # manga_information['link'] = list(chain.from_iterable(manga_information['link']))
        manga_data_list.append(manga_information)

def get_score(title, author):
    print("\nStampa google search")
    title = title.replace("-", " ")
    title = title.replace(".", " ")
    print(f'{title} {author} myanimelist manga')
    search_results = search(f'{title} {author} myanimelist manga')
    soup = BeautifulSoup(requests.get(search_results[0]).content, 'html.parser')
    score = soup.find("div", {"class": "score-label"})
    if score is None:
        score = "N/A"
    else:
        score = score.get_text()
    print(score)
    return score

def get_manga_info(manga_information, link, title):
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

    score = get_score(title, author)

    return {
        **manga_information,
        'trama': trama,
        'alt_title': alt_title,
        'genres': genres,
        'author': author,
        'artist': artist,
        'score': score,
        'status': status,
        'year': year,
    }


def get_single_manga(manga_information, chapter_cont, manga_link):
    manga_list = {}
    page_content = BeautifulSoup(requests.get(manga_link).content, 'html.parser')
    manga_part = page_content.find('div', class_='chapters-wrapper')
    for manga in manga_part('div', class_='chapter'):
        chapter_cont += 1
        manga_chapter = manga.find('a').find('span', {'class': 'd-inline-block'}).get_text()
        manga_url = manga.find('a')['href']
        if str(manga_url).endswith('?style=list'):
            manga_url = manga_url[:-11]
        manga_url = f'{manga_url}/1'
        manga_url = f'{manga_url}?style=list'
        print(f'link chapter: {str(manga_url)}')
        manga_list.update(get_single_chapter(manga_url, manga_chapter))
    manga_information['chapter_cont'] = chapter_cont

    return manga_list


def get_single_chapter(manga_url, manga_chapter):
    save = {}
    save_list = []

    try:
        soup = BeautifulSoup(requests.get(manga_url).content, 'html.parser')
        manga_chapter = manga_chapter.replace(" ", "_")
        manga_container = soup.find_all('img',{"class": "page-image img-fluid"})  # modifica tag src per diminuire righe
        for single_manga_link in manga_container:
            save_list.append(str(single_manga_link['src']))
        save_list.sort()
        save[str(manga_chapter)] = save_list
    except Exception:
        traceback.print_exc()

    return save


if __name__ == "__main__":
    cont = 0
    manga_data_list = []
    my_client = pymongo.MongoClient(
        f'mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@manga-database.sbycl.mongodb.net/?retryWrites=true&w=majority')

    for i in range(1):
        link: str = f'https://www.mangaworld.in/archive?page={i}'
        print(str(i))
        get_manga(link, manga_data_list)

    db = my_client.test
    my_database = my_client['Manga-Database']
    my_collection = my_database['manga-infos']
    datas = my_collection.insert_many(manga_data_list)
    print(datas)
