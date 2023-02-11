import xml.etree.ElementTree as et
import os

companies_list = []

for filename in os.listdir('model/openlogo/annotations'):
    xml_file = os.path.join('model/openlogo/annotations', filename)
    root = et.parse(xml_file).getroot()

    for elem in root:
        if elem.tag == "object":
            for subelem in elem:
                if subelem.tag == "name" and subelem.text not in companies_list:
                    companies_list.append(subelem.text)

print(companies_list)
