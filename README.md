.env 환경 세팅

# 도커 환경(auth)
MONGODB_URI=mongodb://mongodb:27017/auth
EVENT_SERVICE_URL=http://event:3002
AUTH_SERVICE_URL=http://auth:3001/auth

# 도커 환경(event)
MONGODB_URI=mongodb://mongodb:27017/event
EVENT_SERVICE_URL=http://event:3002
AUTH_SERVICE_URL=http://auth:3001/auth

# 도커 환경(gateway)
MONGODB_URI=mongodb://mongodb:27017/gateway
EVENT_SERVICE_URL=http://event:3002
AUTH_SERVICE_URL=http://auth:3001/auth

# 로컬 환경(auth)
MONGODB_URI=mongodb://localhost:27017/auth
AUTH_SERVICE_URL=http://localhost:3001/auth 
EVENT_SERVICE_URL=http://localhost:3002

# 로컬 환경(event)
MONGODB_URI=mongodb://localhost:27017/event
AUTH_SERVICE_URL=http://localhost:3001/auth 
EVENT_SERVICE_URL=http://localhost:3002

# 로컬 환경(gateway)
MONGODB_URI=mongodb://localhost:27017/gateway
AUTH_SERVICE_URL=http://localhost:3001/auth 
EVENT_SERVICE_URL=http://localhost:3002
