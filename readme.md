# Identity Provider API

This API leverages google's oauth token to fetch user profile information, define role and keep it in mysql db. Allows user to identify the role for the given token. 

## Usage

Install using npm:

```bash
npm i 
npm start
```
API started to listen on default port 3000. 

Open http://`<app_host>`:`<app_port>`/v1/api-docs in your browser to view the documentation.

This API has mysql dependency, 

expected mysql env variables
```bash
export DB_HOST=<host_ip>
export DB_USER=<user>
export DB_PASSWORD=<pwd>
export DB_SCHEME=<dbs>
```

and the table script
```sql
create table idp_users(user_id varchar(50),user_name varchar(50),user_role varchar(5))
```