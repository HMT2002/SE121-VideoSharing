ffmpeg -i %1 -itsoffset 1 -i %2 -c copy -c:s webvtt -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls convert\\%3.m3u8
