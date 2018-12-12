# Project Name

> Re-engineered back-end of existing web app which sells online courses.

## Related Projects

- https://github.com/WeDemo/header-sidebar-service
- https://github.com/WeDemo/instructors-service
- https://github.com/WeDemo/student-feedback

## Table of Contents

1. [Requirements](#requirements)
2. [Development](#development)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- [Neo4j Community Edition](https://neo4j.com/download-center/#releases)

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

Seed the database by executing this file from the command line by typing:

```sh
node database/neo4j/setup.js
```

Start the server with:

```sh
npm start
```

Start your application with:

```sh
npm run dev
```

## Database Setup

## Model

### Nodes

- `Student`
- `Course`
- `Instructor`
- `Category`
- `ParentCategory`

### Relationships

- `(:Student) - [:RATED] -> (:Course)`
- `(:Student) - [:ENROLLED] -> (:Course)`
- `(:Course) - [:CREATED_BY] -> (:Instructor)`
- `(:Course) - [:IN_CATEGORY] -> (:Category)`
- `(:Category) - [:PARENT_CATEGORY] -> (:ParentCategory)`

## API

**For API Documentation, please see the [ENDPOINTS.md](ENDPOINTS.md) file**
