"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  router: () => router
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");
var import_node_path = require("path");
var import_jsonwebtoken = require("jsonwebtoken");
var import_needle = __toESM(require("needle"));
var fs = require("fs").promises;
var router = (0, import_express.Router)();
var tokens = [];
var users = [
  {
    id: 1,
    name: "admin",
    cpf: 123123123,
    password: "0e1337",
    job: "Hacker"
  },
  {
    id: 2,
    name: "John Doe",
    cpf: 456456456,
    password: "john123",
    job: "Script Kiddie"
  },
  {
    id: 3,
    name: "John Smith",
    cpf: 789789789,
    password: "smith456",
    job: "Not even a script kiddie"
  },
  {
    id: 4,
    name: "Kevin",
    cpf: 101010101,
    password: "kevin789",
    job: "Shellcoder"
  }
];
router.post("/login", (req, res) => {
  const { name, password } = req.body;
  const user = users.find((user2) => user2.name === name);
  if (!user) {
    return res.status(401).json({ message: "Nome n\xE3o encontrado!" });
  }
  const passwd = user.password;
  console.log("password:", user.password, passwd);
  if (passwd != password) {
    return res.status(401).json({ message: "Senha errada" });
  }
  const token = (0, import_jsonwebtoken.sign)({}, "secret", {
    subject: user.name,
    expiresIn: 60
  });
  tokens.push(token);
  return res.status(200).json({ token });
});
router.get("/", (_req, res) => {
  return res.sendFile((0, import_node_path.join)(__dirname, "..", "view", "index.html"));
});
router.get("/home", (_req, res) => {
  return res.sendFile((0, import_node_path.join)(__dirname, "..", "view", "home.html"));
});
router.get("/users", (req, res) => {
  res.json(users);
});
router.post("/comment", (req, res) => {
  const { prompt } = req.body;
  console.log(req.body);
  res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're not welcome</title>
        <link rel="stylesheet" href="/css/home.css">
    </head>
    
    <body>
        <div class="image-container">
            <img src="/images/hacking.png" alt="">
        </div>
        <div class="terminal-container">
            <div class="terminal">
                <form class="prompt" action="/api/comment" method="post">
                    <label for="prompt">~/root #</label>
                    <input name="prompt" id="prompt" class="block" />
                </form>
                <div class="comment-container">
                    <div class="comment">
                         > ${prompt}           
                    </div>

                </div>
            </div>
        </div>
    
    </body>
    
    </html>`);
});
router.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user2) => user2.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
router.get("/read-file", async (req, res) => {
  try {
    const filePath = req.query.path;
    console.log("filePath:", filePath);
    if (!filePath) {
      return res.status(400).json({ error: "File path is required" });
    }
    const fileContent = await fs.readFile(filePath, "utf8");
    res.send(fileContent);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Error reading file" });
  }
});
router.get("/check-url", async (req, res) => {
  var params = req.params;
  if (req.query["mime"] == "plain") {
    var mime = "plain";
  } else {
    var mime = "html";
  }
  ;
  if (req.query["url"]) {
    var url = req.query["url"];
    import_needle.default.get(url, { timeout: 3e3 }, function(error, res1) {
      if (!error && res1.statusCode == 200) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<!DOCTYPE html>\n<html>\n<head>\n<style>\n");
        res.write("body { background-color: black; color: #0a0; }\n");
        res.write("</style>\n</head>\n<body>\n");
        res.write("<h1>Welcome to check url feature!</h1>\n\n");
        const teste = "url";
        res.write('<h2>I am an application. I want to be useful, so I requested: <font color="red">' + teste + "</font> for you\n</h2><br><br>\n\n\n");
        console.log(res1.body);
        res.write(res1.body);
        res.write("\n</body>\n</html>");
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<!DOCTYPE html>\n<html>\n<head>\n<style>\n");
        res.write("body { background-color: black; color: #0a0; }\n");
        res.write("</style>\n</head>\n<body>\n");
        res.write("<h1>Welcome to check url feature!</h1>\n\n");
        res.write('<h2>I wanted to be useful, but I could not find: <font color="red">' + url + "</font> for you\n</h2><br><br>\n\n\n");
        res.write("\n</body>\n</html>");
        res.end();
        console.log("error");
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<!DOCTYPE html>\n<html>\n<head>\n<style>\n");
    res.write("body { background-color: black; color: #0a0; }\n");
    res.write("</style>\n</head>\n<body>\n");
    res.write("<h1>Welcome to check url feature!</h1>\n\n");
    res.write("<h2>I am an application. I want to be useful, so if you specify the url parameter, I'll req the page for you:</h2><br><br>\n\n\n");
    res.write("<h2>Example: http://domain/api/check-url?url=https://</h2><br><br>\n\n\n");
    res.write("\n</body>\n</html>");
    res.end();
  }
  console.log("New req: " + req.url);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
