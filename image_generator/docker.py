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
      for k in self.keys:
        if not dct.get(k):
          return None
        
      return template.render(**dct)

def create_dockerfile():
  data = json.load(open("templates/data.json", "r"))
  dfile = Dockerfile()
  for cmd in data:
    dfile.add_command(DockerCommand(cmd["text"], cmd["keys"]))

  return dfile
