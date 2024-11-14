git pull
docker build --no-cache -t website .
docker run --name website website
pause