FROM node AS builder

# Create app directory
WORKDIR /usr/app

ENV PORT 8080
ENV HOST 0.0.0.0

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma

# Install app dependecies
RUN npm install

COPY . .

RUN npm run build

FROM node

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/prisma ./prisma

EXPOSE 3333
EXPOSE 8080

CMD ["npm", "run", "prod:migrate:start"]