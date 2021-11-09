import mongoose from "mongoose"; //importamos mongoose

const proveedorSchema = new mongoose.Schema(
    {   //atributos de la coleccion
        name:String, 
        address: String,
        registerDate:{type:Date, default:Date.now},
        dbStatus:Boolean,
    }
);
const proveedor = mongoose.model("proveedor",proveedorSchema);
export default proveedor; // retornamos la instancia