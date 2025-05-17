FROM node:18 as builder

WORKDIR /apps

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY apps ./apps
COPY libs ./libs

RUN npm install
RUN npm run build

FROM node:18

WORKDIR /apps

COPY --from=builder /apps/dist ./dist
COPY --from=builder /apps/node_modules ./node_modules

CMD ["node", "dist/apps/auth/main.js"]
