import json
import requests
from bs4 import BeautifulSoup

if __name__ == "__main__":
        i = 1
        while True:
            try:
                soup = BeautifulSoup(requests.get(f'https://www.mangaworld.io/archive?page={i}').content, 'html.parser')
                manga_list = soup.find_all('a', class_= 'manga-title')
                for manga in range(len(manga_list)):
                    print(manga_list[manga]['href'])
                i += 1
            except:
                print('scraping finished')