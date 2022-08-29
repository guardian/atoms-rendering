#!/usr/bin/env bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR=${DIR}/..
MAPPING_FILE=${ROOT_DIR}/scripts/nginx/nginx-mappings.yml

dev-nginx setup-app ${MAPPING_FILE}