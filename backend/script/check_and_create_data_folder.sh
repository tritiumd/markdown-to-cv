#!/bin/bash

# Check if the directory exists
if [ ! -d "$DATA_FOLDER_PATH" ]; then
  echo "Directory $DATA_FOLDER_PATH does not exist. Creating it."
  mkdir -p "$DATA_FOLDER_PATH"
else
  echo "Directory $DATA_FOLDER_PATH already exists."
fi


if [ ! -d "$DATA_FOLDER_PATH_HTML" ]; then
  echo "Directory $DATA_FOLDER_PATH_HTML does not exist. Creating it."
  mkdir -p "$DATA_FOLDER_PATH_HTML"
else
  echo "Directory $DATA_FOLDER_PATH_HTML already exists."
fi

if [ ! -d "$DATA_FOLDER_PATH_MARKDOWN" ]; then
  echo "Directory $DATA_FOLDER_PATH_MARKDOWN does not exist. Creating it."
  mkdir -p "$DATA_FOLDER_PATH_MARKDOWN"
else
  echo "Directory $DATA_FOLDER_PATH_MARKDOWN already exists."
fi

if [ ! -d "$DATA_FOLDER_PATH_YAML" ]; then
  echo "Directory $DATA_FOLDER_PATH_YAML does not exist. Creating it."
  mkdir -p "$DATA_FOLDER_PATH_YAML"
else
  echo "Directory $DATA_FOLDER_PATH_YAML already exists."
fi