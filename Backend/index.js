import express from 'express';
import cors from "cors";   //reglas de conexion
import  db from "./db/db.js"; //importamos la conexion a la bd
import cliente from "./Routers/cliente.js" //importamos la ruta cliente
import libro from "./Routers/libro.js" //importamos la ruta
import proveedor from "./Routers/proveedor.js" //importamos la ruta
import roles from "./Routers/role.js" //importamos la ruta
import dotenv from "dotenv";

dotenv.config();  //  cuando se ejecute el servidor ejecuta el index y detecta las variables de .env
const app =express(); 
app.use(express.json());
app.use(cors()); 
app.use("/api/cliente",cliente);// nombre de la ruta cliente
app.use("/api/libro",libro);// nombre de la ruta libro
app.use("/api/proveedor",proveedor);// nombre de la ruta proveedor
app.use("/api/role",roles);// nombre de la ruta rol


app.listen(process.env.PORT, ()=> console.log("ejecutando en el puerto:  "+ process.env.PORT));

db.dbConnection();