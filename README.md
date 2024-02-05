# SmartSee - Know What You Buy

![SmartSee Banner](branding/readme-ver.png)

## Description

SmartSee is a mobile app that allows users to take an image of a company's logo to see more information regarding the company's environmental, social, and governance (ESG) sustainability. From this, users can better align purchasing decisions with personal beliefs.

Developed by [Hang Yeung](https://github.com/HangYeung1) and [Jonathan Doredla](https://github.com/jonathanyeetmon) for Novi Incubator 2022-2023.

## Modules

- Website - [/website](/website)

  - To be uploaded...
  - The website showcases SmartSee's mobile app and goals

- Mobile App - [/app](/app)

  - The SmartSee app is made with Expo
  - The implementation can be found here

- Machine Learning Model - [/model](/model)

  - The logo detection model is trained using yolov5 and the QMUL-Openlogo dataset
  - Training files can be found here

- API Server - [/api](/api)

  - The logo detection model is hosted remotely on a Flask server
  - The API server can be found here

- Web Scraper - [/scraper](/scraper)

  - Company ESG is scraped from Yahoo Finance using Selenium

- Firestore Database - [/firestore](/firestore)

  - All user data and ESG data scraped from [/scraper](/scraper) is stored in Google Firestore
  - The Firestore structure and configuration can be found here

- **Note:** Many files (machine learning model, company data, and images) are omitted due to the copyright.
