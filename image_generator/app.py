import falcon
import json
from jinja2 import Template
from falcon_cors import CORS
import docker

class DockerResource:
    def on_get(self, req, resp):
        resp.media = {"data": "Hello"}

    def on_post(self, req, resp):
        """Handles POST requests"""
        dct = req.media
	
        new_dct = {"sys_packages": dct["system"], "lang_packages": dct["local"], "os": "ubuntu", "os_version": "latest"}
        dfile = docker.create_dockerfile()

        dockerfile = dfile.render(new_dct)
        
        out = {"data": dockerfile}

        resp.media = out

cors = CORS(allow_all_origins=True, allow_all_headers=True, allow_all_methods=True)

api = falcon.API(middleware=[cors.middleware])

api.add_route('/', DockerResource())
