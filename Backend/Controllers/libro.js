import libro from "../Models/libro.js";  // importamos el modelo libro

//creamos una variabe que almacene el regstro de un libro en la bd 
const registerLibro = async (required, response)=>{ 

    //preguntamos si  llega los datos nececsarios.
    if(!required.body.name){
      return  response.status(400).send("Imcomplete data"); // si no llegan los datos minimos se retorna error 
    }
    const existingLibro=await libro.findOne({name:required.body.name }); // preguntamos si existe el libro

 // si existe el libro no se puede agregar
    if(existingLibro) return response.status(400).send("The book already exist");

    const libroSchema = new libro({
        name: required.body.name,
        author:  required.body.author, 
        yearPublication:  required.body.yearPublication,
        pages:  required.body.pages,
        gender:  required.body.gender,
        price:  required.body. price,
        dbStatus: true, 
    });
    const result= await libroSchema.save();
    if(!result) return response.status(400).send("failed register");
   
    return response.status(200).send({result});
};


//listamos todos los libros
const  listLibros = async (req,res) =>{
  const libroShema = await libro.find();
  if(!libroShema || libroShema.length==0) return res.status(400).send("lista vacia");
  return res.status(200).send({libroShema});
}

//eliminar un libro
const deleteLibro = async(req,res)=>{
  const libroDelete=await linro.findByIdAndDelete({_id:req.params["_id"]});
  return !libroDelete ? res.status(400).send("no se encontro libro"): res.status(200).send("libro eliminado"); 
}

//actualizar  libro
const updateLibro = async (req,res) =>{
  if(!req.body.name || !req.body.email ||!req.body.password){
    return  res.status(400).send("Imcomplete data");
  }
  // preguntamos si existe el libro
  const existingLibro=await libro.findOne({name:req.body.name,email:req.body.email,password:req.body.password }); 

 // si existe el cliente no se puede agregar
  if(existingCliente) return res.status(400).send("The Client already exist");
    console.log(req.body.name+req.body.email+req.body.password);

  const  clienteUpdate = await cliente.findByIdAndUpdate(req.body._id,{
        name: req.body.name,
        author:  req.body.author, 
        yearPublication: req.body.yearPublication,
        pages:  req.body.pages,
        gender:  req.body.gender,
        price:  req.body. price,
  })
  
  console.log(libroUpdate)
  return !libroUpdate ? res.status(400).send("error de datos"):res.status(200).send({libroUpdate})
}


export default{registerLibro,listLibros,updateLibro,deleteLibro};