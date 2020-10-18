# Clearing docker

```shell script
docker system prune
docker rmi $(docker images -f "dangling=true" -q)
docker rmi $(docker images -a -q)
docker rm $(docker ps --filter=status=exited --filter=status=created -q)
```

# Change permissions

```shell script
sudo chown -R $USER:$USER .
```

# Run shell in docker

```shell script
docker exec -it server /bin/sh
```

# Rerunning of docker-compose

```shell script
docker-compose -f docker-compose.yml down -v --remove-orphans
docker-compose -f docker-compose.yml up --build --force-recreate
```

# Flake8 run configs

```shell script
flake8 --ignore=E501,F401 .
```
