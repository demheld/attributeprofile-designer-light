FROM node:20-alpine

WORKDIR /app

# Build args define which public repository/ref is built into this image.
ARG GIT_REPO
ARG GIT_REF=main

RUN apk add --no-cache git

# Clone the selected revision directly from GitHub during image build.
RUN test -n "$GIT_REPO" || (echo "Build arg GIT_REPO is required" && exit 1)
RUN git clone --depth 1 --branch "$GIT_REF" "$GIT_REPO" /app

RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=5174

EXPOSE 5174

CMD ["npm", "start"]
