with open('in.txt', 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('/book', '')

# Write the file out again
with open('file.txt', 'w') as file:
  file.write(filedata)