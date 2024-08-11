#!/usr/bin/bash

export USERNAME=admin
export HASHED_PASSWORD=$apr1$afPX/qKe$mmdRPpNHyl6o0rFegbykG0
export DOMAIN=*.blaplafla.me
export EMAIL=kid21200@gmail.com
export STACK_NAME=markdown2cv

docker compose -f docker-compose.traefik.yaml up -d