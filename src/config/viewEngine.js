

import express from "express";

let configViewEngine = (app) => {
     //arrow funcion, function truyen vao 1 bien co ten la app
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = configViewEngine;