import json
with open('package.json') as f:
    j=json.load(f)
    if 'dev' in j.get('version'):
        raise Exception('Dev ver')
