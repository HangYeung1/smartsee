#Yahoo Finance Web Scraper
#PLZ use in full screen so xpath doesn't get goofed up

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

PATH = 'C:\Program Files (x86)\chromedriver.exe'
driver = webdriver.Chrome(PATH)

sicko_list = []




class company:
    def __init__(self, name, description, industry, ticker, controversey, esg, esgEnvironmental, esgSocial, esgGovernance, imageURL, lastUpdated):
        self.name = name 
        self.description = description
        self.industry = industry
        self.ticker = ticker
        self.controversey= controversey
        self.esg =esg
        self.esgSocial =esgSocial
        self.esgEnvironmental = esgEnvironmental
        self.esgGovernance = esgGovernance
        self.imageURL = imageURL
        self.lastUpdated = lastUpdated
    
    def get_name(self):
        return self.name
    
    def get_description(self):
        return self.description
    
    def get_industry(self):
        return self.industry
    
    def get_ticker(self):
        return self.ticker
    
    def get_controversey(self):
        return self.controversey
    
    def get_esg(self):
        return self.esg
    
    def get_esgEnvironmental(self):
        return self.esgEnvironmental
    
    def get_esgSocial(self):
        return self.esgSocial
    
    def get_esgGovernance(self):
        return self.esgGovernance
    
    def get_imageURL(self):
        return self.imageURL
    
    def get_lastUpdated(self):
        return self.lastUpdated


            


#with open('C:\class-list.txt') as class_list:
    #for i in class_list:
       #print(i) --> company names


        

def getData(company_name):
    company_description = 'N/A'
    company_industry = 'N/A'
    company_ticker='N/A'
    company_controversey = 'N/A'
    company_esg = 'N/A'
    company_esgSocial = 'N/A'
    company_esgGovernance = 'N/A'
    company_esgEnvironment = 'N/A'
    company_image_url = 'I will do later frfr'
    company_last_updated= "N/A"

    driver.get('https://finance.yahoo.com/')

    search = driver.find_element(By.ID, 'yfin-usr-qry')
    search.send_keys(company_name)
    search.send_keys(Keys.RETURN)

    try:
        elem = WebDriverWait(driver, 60).until(
        EC.presence_of_element_located((By.ID, 'quote-header-info'))
        )
    except:
        sicko_list.append(company(company_name, company_description, company_industry, company_ticker, company_controversey, company_esg, company_esgEnvironment, company_esgSocial
                                  ,company_esgGovernance, company_image_url, company_last_updated))
        
        return
    #time.sleep(10)


    title = driver.title
    company_ticker = ''
    seenParenthesis = False
    for i in title:
        if i=='(':
            seenParenthesis = True
        elif i==')':
            break
        elif seenParenthesis == True:
            company_ticker+=i
        
    
    profile = driver.find_element(By.XPATH, '//*[@id="quote-nav"]/ul/li[7]/a')
    profile.click()

    try:
        elem = WebDriverWait(driver, 60).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="Col1-0-Profile-Proxy"]/section/section[2]/p'))
        )
    except:
        sicko_list.append(company(company_name, company_description, company_industry, company_ticker, company_controversey, company_esg, company_esgEnvironment, company_esgSocial
                                  ,company_esgGovernance, company_image_url, company_last_updated))
        
        return
    #time.sleep(10)

    company_description = driver.find_element(By.XPATH, '//*[@id="Col1-0-Profile-Proxy"]/section/section[2]/p')
    company_description = company_description.text

    company_industry = driver.find_element(By.XPATH, '//*[@id="Col1-0-Profile-Proxy"]/section/div[1]/div/div/p[2]/span[4]')
    company_industry = company_industry.text

    sustainability = driver.find_element(By.XPATH, '//*[@id="quote-nav"]/ul/li[12]/a/span')
    sustainability.click()
    #time.sleep(10)



    try:
        elem = WebDriverWait(driver, 60).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[2]/div[2]/div/div/div/div[1]/div'))
        )


        company_controversey = driver.find_element(By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[2]/div[2]/div/div/div/div[1]/div')
        company_controversey = company_controversey.text
        #print(company_controversey)

        company_esg = driver.find_element(By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[1]/div/div[1]/div/div[2]/div[1]')
        company_esg = company_esg.text
        #print(company_esg)

        company_esgSocial = driver.find_element(By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[1]/div/div[3]/div/div[2]/div[1]')
        company_esgSocial = company_esgSocial.text
        #print(company_esgSocial)

        company_esgEnvironment = driver.find_element(By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[1]/div/div[2]/div/div[2]/div[1]')
        company_esgEnvironment = company_esgEnvironment.text
        #print(company_esgEnvironment)

        company_esgGovernance = driver.find_element(By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[1]/div/div[4]/div/div[2]/div[1]')
        company_esgGovernance = company_esgGovernance.text
        #print(company_esgGovernance)

        company_last_updated = driver.find_element(By.XPATH, '//*[@id="Col1-0-Sustainability-Proxy"]/section/div[3]/span[2]/span')
        company_last_updated = company_last_updated.text
        #print(company_last_updated)
    finally:
        sicko_list.append(company(company_name, company_description, company_industry, company_ticker, company_controversey, company_esg, company_esgEnvironment, company_esgSocial
                            ,company_esgGovernance, company_image_url, company_last_updated))
        
        return


    


#driver.get('https://finance.yahoo.com/')
with open('C:\class-list.txt') as class_list:
    for i in class_list:
        getData(i)

