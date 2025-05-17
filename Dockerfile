FROM node:18

WORKDIR /app

# 패키지 파일과 소스 모두 복사
COPY package*.json ./
COPY tsconfig*.json ./
COPY apps apps
COPY libs libs

# 의존성 설치
RUN npm install

# 빌드
RUN npm run build

# 기본 명령어 (docker-compose에서 override 가능)
CMD ["node", "dist/apps/auth/main.js"]
