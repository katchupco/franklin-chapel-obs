"""Create an OBS import beside this script with paths to this extracted folder."""
from pathlib import Path
import json
b=Path(__file__).resolve().parent
p=b/'obs-scene-collection/Pastor-Appreciation-OBS.json'
d=json.loads(p.read_text(encoding='utf-8'))
d['name']='Franklin Chapel • Pastor Appreciation • Oct 25 2026 • Offline'
for s in d['sources']:
 if s.get('id')!='browser_source':continue
 settings=s['settings'];filename=settings['url'].split('/')[-1].split('?')[0]
 local=b/filename
 if not local.is_file():raise SystemExit('Missing scene file: '+filename)
 settings['is_local_file']=True;settings['local_file']=str(local);settings.pop('url',None)
target=b/'Pastor-Appreciation-OFFLINE.json'
target.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Ready. In OBS choose Scene Collection > Import and select:')
print(target)
