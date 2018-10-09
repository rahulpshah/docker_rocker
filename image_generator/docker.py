from jinja2 import Template
import json

class Dockerfile(object):
  def __init__(self):
    self.commands = []

  def add_command(self, command):
    self.commands.append(command)
  
  def render(self, dct):
    return "\n\n".join(filter(None, (cmd.render(dct) for cmd in self.commands)))
    

class DockerCommand(object):
  def __init__(self, format, keys):
    self.format = format
    self.keys = keys

  def render(self, dct):
    template = Template(self.format)
    new_dct = {}
    for k in self.keys:
      val = dct.get(k)
      if isinstance(val, list):
        lst = set(filter(None, val))
        new_dct[k] = list(lst)
      else:
        new_dct[k] = val

      if not new_dct[k]:
        return None
    return template.render(**new_dct)

def create_dockerfile():
  data = json.load(open("templates/data.json", "r"))
  dfile = Dockerfile()
  for cmd in data:
    dfile.add_command(DockerCommand(cmd["text"], cmd["keys"]))

  return dfile
