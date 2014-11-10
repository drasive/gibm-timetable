start "gibm-timetable" cmd.exe /k ""
start "gibm-timetable - development" cmd.exe /k "grunt dev"

ping 127.0.0.1 -n 6 > nul
start "gibm-timetable - preview" cmd.exe /k "grunt prev"
