
docker ps -a --filter "name=-dev" --format "{{.ID}}" | xargs docker rm -f