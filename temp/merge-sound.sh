
#ffmpeg \
#  -i video.mp4 \
#  -i male.mp3 \
#  -map 0 \
#  -map 1 \
#  -codec copy ../static/clients/new.mp4

#ffmpeg -i video.mp4 -i male.mp3 -c:v copy -c:a aac ../static/clients/new.mp4
ffmpeg -i video.mp4 -i male.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ../static/clients/new.mp4

