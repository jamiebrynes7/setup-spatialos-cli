# `setup-spatialos-cli` Action

![](https://img.shields.io/badge/license-MIT-blue)

`setup-spatialos-cli` is a GitHub Action for downloading and installing the [SpatialOS CLI](https://documentation.improbable.io/spatialos-tools/docs/cli-introduction).

This action supports:

- MacOS, Windows, and Linux agent hosts
- Pinning the SpatialOS CLI to a particular version
- Setting the [service account OAuth token](https://documentation.improbable.io/sdks-and-data/docs/platform-csharp-service-account-maintenance#example-setting-up-service-account-maintenance) for authentication to the SpatialOS platform.

# Usage

```yaml
on: [push]

name: CI

jobs:
  build: 
    name: Build SpatialOS project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: jamiebrynes7/setup-spatialos-cli@v1.3
        with:
          oauth_token: "${OAUTH_TOKEN_SECRET}"
          version: 20190416.094616.a865bb5b54
      - run: spatial build
```

## Inputs

| Name         | Required | Description                                 | Type   | Default  |
|--------------|:--------:|---------------------------------------------|--------|----------|
| `oauth_token` |    ✓     | The auth token to use for the Spatial CLI.  | string |          |
| `version`    |          | The version of the Spatial CLI to download. | string | "latest" |

# Developing

Install the dependencies  
```bash
$ npm install
```

Build the typescript
```bash
$ npm run build
```

Run the tests :heavy_check_mark:  
```bash
$ npm test
```

# License

The scripts and documentation in this project are released under the [MIT License](./LICENSE).
