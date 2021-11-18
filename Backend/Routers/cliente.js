import express from "express"; //importamos express
import cliente from "../Controllers/cliente.js"; //importamos la el controlador de cliente
import admin from "../middlewares/admin.js"
import auth from "../middlewares/auth.js"

const router = express.Router(); // crear  un objeto enrutador de express

router.post("/registerCliente",cliente.registerCliente); 
router.get("/listCliente",auth,cliente.listClientes); 
router.put("/updateCliente",auth,cliente.updateCliente);
router.delete("/delete/:_id",auth,cliente.deleteCliente);
router.post("/login",cliente.login);

export default router