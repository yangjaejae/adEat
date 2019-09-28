#!/bin/bash
DOCKER_CONTAINER_NAME="asEat"
DOCKER_ADEAT_IMAGE_NAME="adEat/nodejs"
DOCKER_ADEAT_IMAGE_TAG="v1.0.0"
COMPOSE_FILE=docker-compose.yaml
echo "start asEat Server"


function restartContainers() {
  docker rm -f $(docker ps -aqf name="${DOCKER_CONTAINER_NAME}")
  docker-compose -f ${COMPOSE_FILE} up -d 2>&1
}

function rebuildDocker() {
    echo "Stop and Remove current asEat Server docker container..."
    docker rm -f $(docker ps -aqf name="${DOCKER_CONTAINER_NAME}")

    if [[ "$(docker images -q ${DOCKER_ADEAT_IMAGE_NAME}:${DOCKER_ADEAT_IMAGE_TAG} 2> /dev/null)" != "" ]]; then
        echo "Remove adEat Server docker IMAGE!!.."
        docker rmi -f ${DOCKER_ADEAT_IMAGE_NAME}:${DOCKER_ADEAT_IMAGE_TAG}
    fi

    echo "Build adEat Server image.."
    docker build -t ${DOCKER_ADEAT_IMAGE_NAME}:${DOCKER_ADEAT_IMAGE_TAG} .
    docker-compose -f ${COMPOSE_FILE} up -d 2>&1
}


function askProceed () {
  read -p "Remove CA-Registry Server images and container to rebuild those items(Y) or just restart container(N) ? [Y/N] " ans
  case "$ans" in
    y|Y|"" )
      echo "Remove and rebuild docker container of asEat Server"
      rebuildDocker
    ;;
    n|N )
      echo "Restart docker container of asEat Server..."
      restartContainers
    ;;
    * )
      echo "invalid response"
      askProceed
    ;;
  esac
}


askProceed




