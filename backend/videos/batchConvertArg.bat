ffmpeg -i %1 -i %2 -c:a copy -c:v copy -c:s webvtt -f hls -hls_playlist_type vod -var_stream_map "v:0,a:0,s:0" -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 convert\\%3.m3u8
