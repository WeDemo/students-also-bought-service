# Project Name

> Project description

## Related Projects

- https://github.com/teamName/repo
- https://github.com/teamName/repo
- https://github.com/teamName/repo
- https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- PostgreSQL 10.5
- Neo4j Community Edition

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

Create the database `neighborhood` by executing this file from the command line by typing:

```sh
mysql -u root < database/schema.sql
```

Start the server with:

```sh
npm start
```

Start your application with:

```sh
npm run dev
```

## Model

### Nodes

- `Student`
- `Course`
- `Instructor`
- `Category`
- `ParentCategory`

### Relationships

-

## API

**For API Documentation, please see the [ENDPOINTS.md](ENDPOINTS.md) file**
