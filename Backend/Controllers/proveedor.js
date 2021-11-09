import proveedor from "../Models/proveedor.js";  // importamos el modelo provvedor

//creamos una variabe que almacene el regstro de un proveedor en la bd 
const registerProveedor = async (required, response)=>{ 

    //preguntamos si  llega los datos nececsarios.
    if(!required.body.name){
      return  response.status(400).send("Imcomplete data"); // si no llegan los datos minimos se retorna error 
    }
    const existingProveedor=await proveedor.findOne({name:required.body.name }); // preguntamos si existe el proveedor

 // si existe el proveedor no se puede agregar
    if(existingProveedor) return response.status(400).send("The proveedor already exist");

    const proveedorSchema = new proveedor({
        name: required.body.name,
        address:  required.body.address,  
        dbStatus: true, 
    });
    const result= await proveedorSchema.save();
    if(!result) return response.status(400).send("failed register");
   
    return response.status(200).send({result});
};


//listamos todos los libros
const  listProveedor = async (req,res) =>{
  const proveedorShema = await proveedor.find();
  if(!proveedorShema || proveedorShema.length==0) return res.status(400).send("lista vacia");
  return res.status(200).send({proveedorShema});
}


//eliminar un proveedor
const deleteProveedor = async(req,res)=>{
  const proveedorDelete=await proveedor.findByIdAndDelete({_id:req.params["_id"]});
  return !proveedorDelete ? res.status(400).send("no se encontro proveedor"): res.status(200).send("proveedor eliminado");
}

//actualizazr proveedor
const updateProveedor = async (req,res) =>{
  if(!req.body.name || !req.body.address ){
    return  res.status(400).send("Imcomplete data");
  }
  // preguntamos si existe el proveedor
  const existingProveedor=await proveedor.findOne({name:req.body.name,address:req.body.address });

 // si existe el proveedor no se puede agregar
  if(existingProveedor) return res.status(400).send("The proveedor already exist");
    

  const  proveedorUpdate = await proveedor.findByIdAndUpdate(req.body._id,{
    name:req.body.name,
    address:req.body.address,
    
  })
   
  return !proveedorUpdate ? res.status(400).send("error de datos"):res.status(200).send({proveedorUpdate})
}
 
export default{registerProveedor,listProveedor,deleteProveedor,updateProveedor};