# ModBearble

A tool for easing your course planning for NUS.

## Features

- Module Dependency Check
- Major Requirements Check
- Kanban-style course planner
- Import/Export of Schedule

## Deployment

Prerequisites: Since this project uses MySQL as its database, please have an instance setup.

1. Create an `.env.production` file with the following contents:
```
DATABASE_URL="mysql://<username>:<password>@<server address>:<port>/<database-name>"    
```
2. Use the provided Dockerfile to create your build.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
