import argparse
import json
import requests
from bs4 import BeautifulSoup, NavigableString, Tag

def setup_file(filename,is_append):
    if is_append:
        mod = "a+"
        bra = ']'
    else :
        mod = "w"
        bra = '['
    with open(filename, mod, encoding='utf-8') as f:
        f.writelines(bra)

def write_file(filename, data, deli):
    with open(filename,"a+", encoding='utf-8') as f:
        f.writelines(deli)
        json.dump(json.loads(json.dumps(data, ensure_ascii=False)), f, indent=2, ensure_ascii=False)


def add_contents(contents,data):
    for header in contents.find_all('strong'):
        nextNode = header
        while True:
            nextNode = nextNode.nextSibling
            if nextNode is None:
                break
            if isinstance(nextNode, NavigableString):
                # print (nextNode.strip())
                pass
            if isinstance(nextNode, Tag):
                if nextNode.name == "strong":
                    break
                # print (nextNode.get_text(strip=True).strip())
                data[header.text]=nextNode.get_text(strip=True).strip()

def add_contents2(contents,data):
    for header in contents.find_all('h3'):
        nextNode = header
        while True:
            nextNode = nextNode.nextSibling
            if nextNode is None:
                break
            if isinstance(nextNode, NavigableString):
                # print (nextNode.strip())
                pass
            if isinstance(nextNode, Tag):
                if nextNode.name == "h3":
                    break
                # print (nextNode.get_text(strip=True).strip())
                data[header.text]=nextNode.get_text(strip=True).strip()
def add_contents3(contents,data):
    for header in contents.find_all('p'):
        nextNode = header
        while True:
            nextNode = nextNode.nextSibling
            if nextNode is None:
                break
            if isinstance(nextNode, NavigableString):
                # print (nextNode.strip())
                pass
            if isinstance(nextNode, Tag):
                if nextNode.name == "p":
                    break
                # print (nextNode.get_text(strip=True).strip())
                data[header.text]=nextNode.get_text(strip=True).strip()

def get_list_link(start, end):  
    links = []
    for i in range(start,end+1):
        links.append("https://www.topcv.vn/tim-viec-lam-it-phan-mem-c10026?salary=0&exp=0&company_field=0&sort=up_top&page=" + str(i))
    return links

def get_titles(list_link):
    titles = []
    for link in list_link :
        response = requests.get(link)
        soup = BeautifulSoup(response.content, "html.parser")
        title = soup.findAll('h3', class_='title')
        for tit in title:
            titles.append(tit)
    return titles
# links_company = [link_company.find('a').attrs["href"] for link_company in titles]


def get_links_company(titles): 
    links_company =[]
    for link_company in titles:
        link_obj = link_company.find('a',href=True)
        if link_obj != None:
            link = link_obj['href']
            links_company.append(link)
    return links_company
    

def crawl_contents(filename,links_company):
    setup_file(filename,False)
    deli = ""

    for link in links_company:
        news = requests.get(link)
        soup = BeautifulSoup(news.content, "html.parser")
        #title
        titles_obj = soup.find('h1', class_="job-title text-highlight bold")
        if titles_obj == None :
            continue
        titles = titles_obj.text  
        #address
        address_obj =soup.find("div", class_="box-address")
        if address_obj == None :
            continue
        addresses = address_obj.text 
        #company-name
        names_obj = soup.find('a', class_="company-logo")
        if names_obj == None :
            continue
        names = names_obj.attrs["title"] 
        #avatar
        avatars_obj = soup.find('img', class_="img-responsive")
        if avatars_obj == None :
            continue
        avatars = avatars_obj.attrs["src"] 
        # keywordjob_obj = soup.find("div", class_="box-keyword-job")
        # if keywordjob_obj == None:
        #     continue

        contents= soup.find("div", class_="box-main")
        contents2= soup.find("div", class_="job-data")
        contents3 =  soup.find("div",class_="box-keyword-job")
        contents4 = soup.find("div", class_="box-info-company box-white")
        data= {} 
        data['title']=titles
        data['name']=names
        data['address']=addresses
        data['employerId']="6410979af201dc3a44761259"
        data['applyId']=[]
        data['approved']= False
        data['avatar']=avatars
        add_contents(contents,data)
        add_contents2(contents3,data)
        add_contents2(contents2,data)
        add_contents3(contents4,data)
        write_file(filename, data, deli)
        deli = ",\n"
        print(data)
    setup_file(filename,True)

if __name__=="__main__":
    # create parser
    print("Parsing Args")
    parser = argparse.ArgumentParser()
    parser.add_argument("start")
    parser.add_argument("end")
    args = parser.parse_args()
 
    print("Start crawling from ",args.start," to ",args.end)
    # data = read_data(args.data_file_name)
    links = get_list_link(int(args.start),int(args.end))
    print("list of links")
    print(links)
    title = get_titles(links)
    links_company = get_links_company(title)
    print(links_company)
    filename = "recruit_"+args.start+"_"+args.end+".json"
    crawl_contents(filename, links_company)