"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/auth.ts
var auth_exports = {};
__export(auth_exports, {
  authController: () => authController
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = require("jsonwebtoken");
var users = [];
var tokens = [];
var authController = (req, res) => {
  const { name, password } = req.body;
  const user = users.find((user2) => user2.name === name);
  if (!user) {
    return res.status(401).json({ message: "Nome n\xE3o encontrado!" });
  }
  if (user.password == password) {
    return res.status(401).json({ message: "Senha errada" });
  }
  const token = (0, import_jsonwebtoken.sign)({}, "secret", {
    subject: user.name,
    expiresIn: 60
  });
  tokens.push(token);
  return res.status(200).json({ token });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authController
});
