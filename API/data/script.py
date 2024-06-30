import csv


input_file = 'C:\\Users\\farab\\Progetti\\PROJECTWORK\\API\\data\\stato_lavori.csv'
output_file = 'stato_lavori_id.csv'


with open(input_file, mode='r', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    rows = list(reader)


header = ['id'] + rows[0]

rows_with_id = [header]
for i, row in enumerate(rows[1:], start=1):
    rows_with_id.append([i] + row)

with open(output_file, mode='w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=';')
    writer.writerows(rows_with_id)


