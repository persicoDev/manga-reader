# !/usr/bin/env python
# import json
import requests
from pages import single_manga, json_save
from bs4 import BeautifulSoup

if __name__ == "__main__":
        i = 1
        soup = BeautifulSoup(requests.get(f'https://www.mangaworld.io/archive?page={ i }').content, 'html.parser')
        file = open('link.txt', 'a')
        file.write(str(soup.prettify()) + "\n")
        file.close()
        page_index = soup.find('a', class_='page-link')
        while True:
            # try:
            manga_list = soup.find_all('a', class_= 'manga-title')
            for manga in range(len(manga_list)):
                save = str(manga_list[manga]['title'])
                json_save.file_save(save)
                link = str(manga_list[manga]['href'])
                single_manga.get_single_manga(link)
            i += 1
            # except:
            #     print('scraping finished')