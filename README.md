# Stagefright

Demo Application used for the midterm presentation. Why it's called stagefright? It got created in a hurry and somehow it worked.

## How to use?

Its a simple react app, calling the the RESTful mindtastic API. You can use NPM to run a simple, local HTTP server. Keep in mind that CORS-Header must be set appropriatly, when running on local host.

```bash
# Start the local server
npm start 
```

## Custom port

You can use the `-p` flag to specify a port for development. To do this, you can either run `npm start` with an additional flag:

```bash
npm start -- --port 1234
```
