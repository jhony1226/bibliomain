import mongoose from "mongoose"; //importamos mongoose

const clienteSchema = new mongoose.Schema(
    {   //areibutos de la coleccion
        name:String,
        email:String,
        password:String,
        registerDate:{type:Date, default:Date.now},
        dbStatus:Boolean,
    }
);
const cliente = mongoose.model("cliente",clienteSchema);
export default cliente; // retornamos la instancia