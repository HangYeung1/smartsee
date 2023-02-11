import xml.etree.ElementTree as et
import os


# Get XML annotation data
def extract_from_xml(xml_file):
    root = et.parse(xml_file).getroot()

    # Initialize info dict
    annotation_dict = {}
    annotation_dict['bnboxes'] = []

    # Parse XML Tree
    for elem in root:
        # Get file name
        if elem.tag == 'filename':
            annotation_dict['filename'] = elem.text

        # Get split
        elif elem.tag == 'folder':
            annotation_dict['split'] = elem.text

        # Get image size
        elif elem.tag == 'size':
            image_size = {}
            for subelem in elem:
                image_size[subelem.tag] = int(subelem.text)
            annotation_dict['size'] = image_size

        # Add bounding box(es)
        elif elem.tag == 'object':
            bnbox = {}
            for subelem in elem:
                if subelem.tag == 'name':
                    bnbox['class'] = subelem.text

                elif subelem.tag == 'bndbox':
                    for subsubelem in subelem:
                        bnbox[subsubelem.tag] = int(subsubelem.text)
            annotation_dict['bnboxes'].append(bnbox)

    return annotation_dict


# Find object class names and map to ids
def class_names_to_id_map(annotations_directory):
    class_name_list = []

    # Iterate through set directory
    for filename in os.listdir(annotations_directory):
        xml_file = os.path.join(annotations_directory, filename)
        root = et.parse(xml_file).getroot()

        # Add to class to list if needed
        for elem in root:
            if elem.tag == 'object':
                for subelem in elem:
                    if subelem.tag == 'name' and subelem.text not in class_name_list:
                        class_name_list.append(subelem.text)

    class_name_id_map = {}
    i = 0

    # Iterate to assign ids
    for class_name in class_name_list:
        class_name_id_map[class_name] = i
        i += 1

    return class_name_id_map


# Export extracted XML data in txt for yolo
def export_for_yolo(class_name_id_map, annotation_dict, target_directory):
    print_objects = []

    for bnbox in annotation_dict['bnboxes']:
        image_width = annotation_dict['size']['width']
        image_height = annotation_dict['size']['height']

        class_id = class_name_id_map[bnbox['class']]

        # Normalize bnboxes
        bnbox_x_center = ((bnbox['xmin'] + bnbox['xmax']) / 2) / image_width
        bnbox_y_center = ((bnbox['ymin'] + bnbox['ymax']) / 2) / image_height
        bnbox_width = (bnbox['xmax'] - bnbox['xmin']) / image_width
        bnbox_height = (bnbox['ymax'] - bnbox['ymin']) / image_height

        # Format and save to list
        print_objects.append('{} {:.3f} {:.3f} {:.3f} {:.3f}'.format(
            class_id, bnbox_x_center, bnbox_y_center, bnbox_width, bnbox_height))

    # Save formatted annotation to .txt
    save_filename = os.path.join(target_directory, os.path.splitext(
        annotation_dict['filename'])[0] + '.txt')
    print('\n'.join(print_objects), file=open(save_filename, 'w'))
