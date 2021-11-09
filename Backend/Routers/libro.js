import express from "express"; //importamos express
import libro from "../Controllers/libro.js"; //importamos la el controlador de libro

const router = express.Router(); // crear  un objeto enrutador de express

router.post("/registerLibro", libro.registerLibro); 
router.get("/listLibros", libro.listLibros);
router.put("/updateLibro",libro.updateLibro);
router.delete("/delete/:_id",libro.deleteLibro);
export default router