// ============================================================
// server.js — The Node.js Backend Server
//
// WHAT IS THIS FILE?
//   This is the entry point for your backend. When you run
//   "node server.js", Node reads this file top-to-bottom and
//   starts a web server that listens for incoming HTTP requests.
//
// WHY NODE.JS?
//   Node.js lets you run JavaScript outside the browser — on a
//   server. It's non-blocking (handles many requests at once
//   without waiting), which makes it fast for web APIs.
//
// HOW IT WORKS (high level):
//   Browser sends a request → server.js receives it → matches
//   a route → runs a function → sends a response back.
// ============================================================


// ============================================================
// SECTION 1 — IMPORTS
// "require" is Node's way of loading packages (like "import" in
// Python). Each library adds specific functionality to your app.
// ============================================================

const express = require('express');
// Express is a web framework. Without it, you'd have to manually
// parse every URL, method, and body — Express handles all of that.

const cors    = require('cors');
// CORS = Cross-Origin Resource Sharing. Browsers block requests
// between different origins (e.g. frontend on port 5500 → backend
// on port 3000) for security. cors() tells the browser: "this is
// allowed." Without this, your frontend can't talk to this server.

const path    = require('path');
// Built into Node (no install needed). Safely builds file paths
// across operating systems (Mac uses /, Windows uses \).

require('dotenv').config();
// dotenv reads a file called ".env" in your project root and loads
// its contents as environment variables (process.env.VARIABLE_NAME).
// WHY? So secrets never appear in your source code.
// Rule: .env is always in .gitignore — never commit it to GitHub.


// ============================================================
// SECTION 2 — APP SETUP
// Create the Express app and define which port to listen on.
// ============================================================

const app = express();
// express() returns an application object. "app" is your server.
// You attach routes, middleware, and settings to this object.

const PORT = process.env.PORT || 3000;
// process.env.PORT reads the PORT value from your .env file.
// The || 3000 means: "if PORT isn't set, default to 3000."
// WHY USE ENV VAR? When you deploy (e.g. to Render), the hosting
// platform sets its own PORT. This makes your code work both
// locally and in production without changes.


// ============================================================
// SECTION 3 — MIDDLEWARE
// Middleware = functions that run on EVERY request before it
// reaches a route. Think of it as a pipeline — each request
// passes through these checks/transformations in order.
//
// INTERVIEW TIP: Middleware follows the pattern (req, res, next)
// where "next" passes control to the next middleware in line.
// ============================================================

app.use(cors());
// Attaches CORS headers to every response so the browser allows
// cross-origin requests. app.use() registers middleware globally.

app.use(express.json());
// Parses the body of incoming requests that contain JSON data.
// Without this, req.body would be undefined when the frontend
// sends data as JSON.

app.use(express.static(path.join(__dirname, 'portfolio')));
// Serves every file inside the /portfolio folder as a static file.
// Visiting http://localhost:3000 automatically returns index.html.
// __dirname = the absolute path of the folder this file lives in.
// path.join builds: /path/to/project/portfolio


// ============================================================
// SECTION 4 — ROUTES
// A route = a URL pattern + HTTP method. When a request matches,
// the callback function (req, res) => {} runs.
//
// req (request)  = everything the browser sent (URL, body, headers)
// res (response) = what you send back to the browser
//
// HTTP METHODS:
//   GET  — retrieve data (reading, no side effects)
//   POST — send data to be processed (form submit, create)
//   PUT  — update existing data
//   DELETE — remove data
// ============================================================

// GET /api/health
// PURPOSE: Quickly verify the server is alive and reachable.
// Visit http://localhost:3000/api/health to confirm it started.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
  // res.json() converts a JS object to JSON and sends it as the response.
});


// ============================================================
// SECTION 5 — START THE SERVER
// app.listen() binds the server to a port and starts accepting
// connections. The callback runs once when the server is ready.
// ============================================================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Health check:   http://localhost:${PORT}/api/health`);
});
