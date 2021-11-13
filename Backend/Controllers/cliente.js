import cliente from "../Models/cliente.js"; // importamos el modelo cliente
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

//creamos una variabe que almacene el regstro de un cliente en la bd
const registerCliente = async (required, response) => {
  //preguntamos si  llega los datos nececsarios.
  if (!required.body.name || !required.body.email) {
    return response.status(400).send("Imcomplete data"); // si no llegan los datos minimos se retorna error
  }
  const existingCliente = await cliente.findOne({ name: required.body.name }); // preguntamos si existe el cliente

  // si existe el cliente no se puede agregar
  if (existingCliente)
    return response.status(400).send("The Cclient already exist");

  const hash = await bcrypt.hash(required.body.password, 10);

  const clienteSchema = new cliente({
    name: required.body.name,
    email: required.body.email,
    password: hash,
    dbStatus: true,
  });
  const result = await clienteSchema.save();
  if (!result) return response.status(400).send("failed register");

  return response.status(200).send({ result });
};

//listamos todos los clientes
const listClientes = async (req, res) => {
  const clienteShema = await cliente.find();
  if (!clienteShema || clienteShema.length == 0)
    return res.status(400).send("lista vacia");
  return res.status(200).send({ clienteShema });
};

//eliminar un cliente
const deleteCliente = async (req, res) => {
  const clienteDelete = await cliente.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !clienteDelete
    ? res.status(400).send("no se encontro cliente")
    : res.status(200).send("cliente eliminado");
};

//actualizazr cliente
const updateCliente = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).send("Imcomplete data");
  }

  let pass = "";
  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const clienteFind = await cliente.findOne({ email: req.body.email });
    pass = clienteFind.password;
  }

  // preguntamos si existe el cliente
  const existingCliente = await cliente.findOne({
    name: req.body.name,
    email: req.body.email,
  });

  // si existe el cliente no se puede agregar
  if (existingCliente) return res.status(400).send("The Cclient already exist");
  console.log(req.body.name + req.body.email + req.body.password);

  const clienteUpdate = await cliente.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
  });

  console.log(clienteUpdate);
  return !clienteUpdate
    ? res.status(400).send("error de datos")
    : res.status(200).send({ clienteUpdate });
};


const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const loginUser = await cliente.findOne({ email: req.body.email });
  if (!loginUser)
    return res.status(400).send({ message: "wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, loginUser.password);
  if (!hash) return res.status(400).send({ message: "wrong email or password" }); 
 
  try {
    //generar web token
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: loginUser._id, 
          name: loginUser.name,
          email:loginUser.email,
          iat: moment().unix(),
        },
        process.env.KEY_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "error" },e);
  }
};

export default { registerCliente, listClientes, updateCliente, deleteCliente,login };
