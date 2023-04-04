
DOCKER = docker run -it --rm -v $(PWD):/mnt --workdir=/mnt --user=node 
IMAGE = node:lts

HOST = 127.0.0.1
PORT = 8080

all:

.PHONY: node-daemon
node-daemon:
	$(DOCKER) -p $(HOST):$(PORT):8080 $(IMAGE) index.js

.PHONY: node-version
node-version:
	$(DOCKER) $(IMAGE) --version

