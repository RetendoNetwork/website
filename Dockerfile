# syntax=docker/dockerfile:1

ARG app_dir="/home/node/app"

# * Base Node.js image
FROM node:20-alpine AS base
ARG app_dir
WORKDIR ${app_dir}

# * Installing production dependencies
FROM base AS dependencies

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
	npm ci --omit=dev

# * Installing development dependencies and building the application
FROM base AS build

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
	npm ci

COPY . .
# TODO: re-enable after TypeScript migration
#RUN npm run build

# * Running the final application
FROM base AS final
ARG app_dir

RUN mkdir -p ${app_dir}/logs && chown node:node ${app_dir}/logs

ENV NODE_ENV=production
USER node

COPY --from=dependencies ${app_dir}/node_modules ${app_dir}/node_modules
COPY --from=build ${app_dir} ${app_dir}

# TODO: change back after TypeScript migration
#COPY --from=build ${app_dir}/dist ${app_dir}/dist

CMD ["node", "."]
