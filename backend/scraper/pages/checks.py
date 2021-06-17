def check_img(tag, soup):
    tag = soup.find_all('img', {"class": "img-fluid"})
    if(tag[1].has_attr('src')):
        return str(tag[1])
    else:
        tag = soup.find_all('img', {"class": "page-image img-fluid"})
        return str(tag)
