# Identity Provider API

This API leverages google's oauth token to fetch user profile information, define role and keep it in mysql db. Allows user to identify the role for the given token. 

## Usage

Install using npm:

```bash
npm i 
npm start
```
API started to listen on default port 3000. 

Open http://`<app_host>`:`<app_port>`/v1/idp/api-docs in your browser to view the documentation.

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
## API Reference
| Name               |Identity Service |
|--------------------|-------------------------------|
|Description| This service provides an API for validate and fetch user profile.
|Capabilities          |    UserProfile        |

#### Service API
| Queries |
| --------|
| Synchronous:  fetchProfile       | 

|Non Functional Requirement| Covered |
|----|--|
|Availability |90.00%|
|Profile fetch SLA| 2 secs|

| Observability | |
|-----|--|
|health check endpoint|v1/api/health|

### Implementation:
|Domain Model|
|--|
|NA|

|Dependencies|
|--|
|Google: oauth2|

|Subscribes to |
|----|
|API Gateway|
|Booking API|
