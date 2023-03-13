# What is it?
 - It is a initial projet using graphql

# Libs

 ```json
 "dependencies": { 
    "apollo-server": "^3.12.0", 
    "apollo-server-core": "^3.12.0", 
    "dotenv": "^16.0.3", 
    "graphql": "^16.6.0", 
    "pm2": "^5.2.2" 
  }, 
  "devDependencies": { 
    "@types/node": "^18.15.0", 
    "tsup": "^6.6.3", 
    "tsx": "^3.12.3", 
    "typescript": "^4.9.5" 
  }
```

# Docker

docker build -t example/graphql . <br>
docker run -p 4000:4000 -d example/graphql <br>
