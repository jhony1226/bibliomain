import cliente from "../Models/cliente.js";  // importamos el modelo cliente 

//creamos una variabe que almacene el regstro de un cliente en la bd 
const registerCliente = async (required, response)=>{ 

    //preguntamos si  llega los datos nececsarios.
    if(!required.body.name || !required.body.email){
      return  response.status(400).send("Imcomplete data"); // si no llegan los datos minimos se retorna error 
    }
    const existingCliente=await cliente.findOne({name:required.body.name }); // preguntamos si existe el cliente

 // si existe el cliente no se puede agregar
    if(existingCliente) return response.status(400).send("The Cclient already exist");

    const clienteSchema = new cliente({
        name: required.body.name,
        email:  required.body.email,
        password:  required.body.password,
        dbStatus: true, 
    });
    const result= await clienteSchema.save();
    if(!result) return response.status(400).send("failed register");
   
    return response.status(200).send({result});
};

//listamos todos los clientes
const  listClientes = async (req,res) =>{
  const clienteShema = await cliente.find();
  if(!clienteShema || clienteShema.length==0) return res.status(400).send("lista vacia");
  return res.status(200).send({clienteShema});
}

 
//eliminar un cliente
const deleteCliente = async(req,res)=>{
  const clienteDelete=await cliente.findByIdAndDelete({_id:req.params["_id"]});
  return !clienteDelete ? res.status(400).send("no se encontro cliente"): res.status(200).send("cliente eliminado"); 
}

//actualizazr cliente
const updateCliente = async (req,res) =>{
  if(!req.body.name || !req.body.email ||!req.body.password){
    return  res.status(400).send("Imcomplete data");
  }
  // preguntamos si existe el cliente
  const existingCliente=await cliente.findOne({name:req.body.name,email:req.body.email,password:req.body.password }); 

 // si existe el cliente no se puede agregar
  if(existingCliente) return res.status(400).send("The Cclient already exist");
    console.log(req.body.name+req.body.email+req.body.password);

  const  clienteUpdate = await cliente.findByIdAndUpdate(req.body._id,{
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  })
  
  console.log(clienteUpdate)
  return !clienteUpdate ? res.status(400).send("error de datos"):res.status(200).send({clienteUpdate})
}


export default{registerCliente,listClientes,updateCliente,deleteCliente};

 
