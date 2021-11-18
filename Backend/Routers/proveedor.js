import express from "express"; //importamos express
import proveedor from "../Controllers/proveedor.js"; //importamos la el controlador de el proveedoro
import auth from "../middlewares/auth.js"
const router = express.Router(); // crear  un objeto enrutador de express

router.post("/registerProveedor",proveedor.registerProveedor); 
router.get("/listProveedor", auth,proveedor.listProveedor);
router.put("/updateProveedor",auth,proveedor.updateProveedor);
router.delete("/delete/:_id",auth,proveedor.deleteProveedor);

export default router