# Task Management API (Express + JSON)

Simple REST API for managing tasks using **Node.js**, **Express**, and **JSON file storage** (no database).

## Requirements
- Node.js ≥ 18  
- npm

## Installation
```bash
cd task-api
npm install
```

## Run the API
```bash
npm start       # Production mode
npm run dev     # Development mode (logs enabled)
```

Server runs at: **http://localhost:3000**

## Project Structure
```
task-api/
├─ package.json
├─ tasks.json                # JSON storage (initial content: [])
└─ src/
   ├─ server.js              # Express app / middleware / routes mount
   ├─ routes/
   │  └─ tasks.js            # /tasks routes
   └─ utils/
      └─ storage.js          # JSON read/write + error handling
```

## API Endpoints

### GET `/tasks`
Returns all tasks  
**200 OK**

### GET `/tasks/:id`
Returns one task  
- `200 OK`  
- `404 Not Found`

### POST `/tasks`
Create a task  
Example body:
```json
{
  "title": "Learn Node.js",
  "description": "Practice Express",
  "status": "pending",
  "dueDate": "2025-12-31"
}
```
- `201 Created`
- `422 Validation Error`

### PUT `/tasks/:id`
Update task  
- `200 OK`
- `404 Not Found`
- `422 Validation Error`

### DELETE `/tasks/:id`
Delete task  
- `200 OK`
- `404 Not Found`

## Validation Rules
| Field | Rules |
|-------|-------|
| title | required, not empty |
| status | pending \| in_progress \| done |
| dueDate | ISO date (YYYY-MM-DD) |

Auto-generated fields: `createdAt`, `updatedAt`

## Example Requests

### PowerShell (`irm`)
```powershell
irm -Method POST http://localhost:3000/tasks `
  -ContentType "application/json" `
  -Body '{"title":"Demo","status":"pending"}'

irm http://localhost:3000/tasks

$id = (irm http://localhost:3000/tasks)[0].id
irm http://localhost:3000/tasks/$id

irm -Method PUT http://localhost:3000/tasks/$id `
  -ContentType "application/json" `
  -Body '{"title":"Demo Updated","status":"in_progress"}'

irm -Method DELETE http://localhost:3000/tasks/$id
```

### curl
```bash
curl -X POST http://localhost:3000/tasks   -H "Content-Type: application/json"   -d '{"title":"Demo"}'

curl http://localhost:3000/tasks

curl http://localhost:3000/tasks/<ID>

curl -X PUT http://localhost:3000/tasks/<ID>   -H "Content-Type: application/json"   -d '{"status":"done"}'

curl -X DELETE http://localhost:3000/tasks/<ID>
```

## JSON File Notes
`tasks.json` must contain:

```json
[]
```

If corrupted, reset it (PowerShell):

```powershell
[IO.File]::WriteAllText("$pwd\tasks.json","[]",(New-Object System.Text.UTF8Encoding($false)))
```

## License
Educational / demo project.
