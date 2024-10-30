#!/usr/bin/env bash
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

source ${ROOT_DIR}/.env
rsync -avz --delete ${BIN_REMOTE_DATABASE_PATH} ${ROOT_DIR}/.docker/data
