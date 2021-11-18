import express from "express"; //importamos express
import libro from "../Controllers/libro.js"; //importamos la el controlador de libro
import admin from "../middlewares/admin.js"
import auth from "../middlewares/auth.js"

const router = express.Router(); // crear  un objeto enrutador de express

router.post("/registerLibro",auth,admin, libro.registerLibro); 
router.get("/listLibros",auth, libro.listLibros);
router.put("/updateLibro",auth,admin,libro.updateLibro);
router.delete("/delete/:_id",auth,admin,libro.deleteLibro);

export default router