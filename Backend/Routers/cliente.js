import express from "express"; //importamos express
import cliente from "../Controllers/cliente.js"; //importamos la el controlador de cliente

const router = express.Router(); // crear  un objeto enrutador de express

router.post("/registerCliente",cliente.registerCliente); 
router.get("/listCliente",cliente.listClientes); 
router.put("/updateCliente",cliente.updateCliente);
router.delete("/delete/:_id",cliente.deleteCliente);

export default router