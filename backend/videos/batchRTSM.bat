chcp 65001
ffmpeg -stream_loop -1 -y -re -i cc.mp4 -vcodec copy -loop -1 -c:a aac -b:a 160k -ar 44100 -strict -2 -f flv rtmp:192.168.140.100/live/cc