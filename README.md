# Raven-signal
Signaling server for Raven P2P web conference

# Prerequisites
- Node LTS
- Docker

# Getting started
Install dependencies:
```
$ yarn install
```

Run service locally:
```
$ yarn start
```

By default service runs on `3334` port. But you can pass next env vars to change behaviour:
```
PORT - default value is 3334
SIGNALING_PATH - default value is /
```

# Docker
You can grap docker image:
```
ok2ju/raven-signal:develop
ok2ju/raven-signal:v0.1.0 (example)
```

Build image locally:
```
$ make image-build
```

Run image:
```
$ make image-run
```

Publish image to docker hub (performs automatically by `travis-ci`):
```
$ make image-publish
```
