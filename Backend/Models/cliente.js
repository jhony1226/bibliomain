import mongoose from "mongoose"; //importamos mongoose

const clienteSchema = new mongoose.Schema(
    {   //areibutos de la coleccion
        name:String,
        email:String,
        password:String,
        roleId: { type: mongoose.Schema.ObjectId, ref: "roles" },
        registerDate:{type:Date, default:Date.now},
        dbStatus:Boolean,
    }
);
//se crea la coleccion 
const cliente = mongoose.model("clientes",clienteSchema);
export default cliente; // retornamos la instancia