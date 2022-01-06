IMAGE_NAME="node-express-template"
docker build . -t $IMAGE_NAME
docker run --rm -p 9527:9527 $IMAGE_NAME
