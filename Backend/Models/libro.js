import mongoose from "mongoose"; //importamos mongoose

const libroSchema = new mongoose.Schema(
    {   //atributos de la coleccion
        name:String, 
        author: String, 
        yearPublication:  String,
        pages:  String,
        gender: String,
        price:  Number,
        registerDate:{type:Date, default:Date.now},
        dbStatus:Boolean,
    }
);
const libro = mongoose.model("libro",libroSchema);
export default libro; // retornamos la instancia