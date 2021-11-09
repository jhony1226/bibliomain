
import mongoose from "mongoose"; //importamoss mongoose

//creamos la  variable para  guardar la conexion.
const dbConnection = async() =>{ 
    try {
            await mongoose.connect(process.env.DB_CONNECTION ,{ 
            useNewUrlParser:true,      //para que en ningun momento muestre la url de conexion
            useUnifiedTopology:true    //evita que saque cosas innecesarias en el log
        });
        console.log("conexion con mongoDB db "); // conexion estable
    } catch (error) {
        console.log(" no se puede conetar con mongoDB db \n "+ error); // imprimimos el error por el cual no se pudo conectar
    }
};

export default {dbConnection}; // retornamos la variable para que la use el controlador.