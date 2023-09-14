# Executar o docker sem o docker

```sh
docker run --rm -it --name nodedev -v ./:/usr/src/app -p 3000:3000 node:18 bash
cd /usr/src/app
node fullcycle.js
```
