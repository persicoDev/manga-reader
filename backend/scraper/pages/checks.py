def check_img(tag, soup):
    tag = soup.find_all('img', {"class": "img-fluid"})
    if(tag[0].has_attr('src')):
        return str(tag)
    else:
        tag = soup.find_all('img', {"class": "page-image img-fluid"})
        return str(tag)
