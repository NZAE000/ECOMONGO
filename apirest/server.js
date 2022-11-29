require('dotenv').config();
//Importar dependencias
import express from "express";
import cors    from "cors";
import { json, urlencoded } from 'body-parser';
const app      = express();

//DB connection
import "./app/database/database.js";

// Configuración de cors (control de acceso)
app.use(cors());

// Analizar las solicitudes de tipo de contenido - application/json
app.use(json());

// Analizar las solicitudes de tipo de contenido - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// end point base
import userRouter from "./app/routes/user.routes.js";
import buyRouter from "./app/routes/buy.routes.js";

app.use("/user", userRouter);
app.use("/buy", buyRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

