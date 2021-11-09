import express from "express"; //importamos express
import proveedor from "../Controllers/proveedor.js"; //importamos la el controlador de el proveedoro

const router = express.Router(); // crear  un objeto enrutador de express

router.post("/registerProveedor",proveedor.registerProveedor); 
router.get("/listProveedor", proveedor.listProveedor);
router.put("/updateProveedor",proveedor.updateProveedor);
router.delete("/delete/:_id",proveedor.deleteProveedor);

export default router