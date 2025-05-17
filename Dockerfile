FROM node:18

WORKDIR /apps

# 패키지 먼저 복사 후 설치
COPY package*.json ./

RUN npm install

# Nest CLI 및 ts-node-dev 설치
RUN npm install -g @nestjs/cli ts-node-dev

# 전체 프로젝트 복사
COPY . .

# 기본 커맨드는 docker-compose에서 override
CMD ["npm", "run", "start:dev"]
