#!/bin/bash

set -e

source ./venv/bin/activate
export PYTHONPATH=$PWD/app

fastapi dev app/main.py
