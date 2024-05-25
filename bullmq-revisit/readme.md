In development mode: 
1. Run redis first: `docker run  -p 6379:6379 --name redis-client  -d redis`
2. Check if redis is working properly: `docker exec -it redis-client sh` > `redis-cli` > `ping`
