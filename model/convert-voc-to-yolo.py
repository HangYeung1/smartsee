import xml.etree.ElementTree as et


# Gets XML annotation data
def extract_from_xml(xml_file):
    root = et.parse(xml_file).getroot()

    # Initialize info dict
    annotation_dict = {}
    annotation_dict['bnboxes'] = []

    # Parse XML Tree
    for elem in root:
        # Get file name
        if elem.tag == "filename":
            annotation_dict['filename'] = elem.text

        # Get split
        elif elem.tag == "folder":
            annotation_dict['split'] = elem.text

        # Get image size
        elif elem.tag == "size":
            image_size = {}
            for subelem in elem:
                image_size[subelem.tag] = int(subelem.text)
            annotation_dict['size'] = image_size

        # Adds bounding box(es)
        elif elem.tag == "object":
            bbox = {}
            for subelem in elem:
                if subelem.tag == "name":
                    bbox["class"] = subelem.text

                elif subelem.tag == "bndbox":
                    for subsubelem in subelem:
                        bbox[subsubelem.tag] = int(subsubelem.text)
            annotation_dict['bnboxes'].append(bbox)

    return annotation_dict


print(extract_from_xml('/model/openlogo/Annotations/3m1.xml'))
