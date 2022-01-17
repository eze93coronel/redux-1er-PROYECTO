import React,{useState}from 'react';
import { useDispatch,useSelector } from 'react-redux';

 //action redux 
 import {crearNuevoProductoAction}from '../actions/productoActions';
import { useNavigate } from 'react-router-dom';
import { mostrarAlerta,ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = () =>{
  let navigate = useNavigate();


//state del componente 
const [nombre,guardarNombre] = useState('');
const [precio,guardarPrecio ] = useState(0);

// utilizar usedipacht y te crea una nueva funcion 
const dispatch = useDispatch()


//aceder al state  del store de
const cargando = useSelector(state =>state.productos.loading);
const error =  useSelector(state =>state.productos.error);
const alerta = useSelector(state =>state.alerta.alerta);
console.log(cargando);
  
// mandar llamar el action de prodcuto action
  const agregarProducto = producto =>dispatch(crearNuevoProductoAction(producto));



  const submitNuevoProducto = e =>{
    e.preventDefault();
//validar formulario 
if(nombre.trim() === '' || precio <= 0){
 
  const alerta = {
    msg:'Ambos campos son obligatorios',
    classes: 'alert alert-danger text-center text-uppercase p3'
  }
  dispatch(mostrarAlerta(alerta))
  return;
}
//revisar que no alal eerores 
dispatch(ocultarAlertaAction());

// crear el nuevo producto
  agregarProducto({
    nombre,
     precio
  });
  
  //redireccionar
 
  navigate('/');

  }


return (
 <div className="row justify-content-center"> 
 <div  className="col-md-8"> 
 <div className="card"> 
 <div className="card-body"> 
 <h2 className="text-center mb-4 font-weight-bold"> 
   Agregar un nuevo producto
 </h2>
 <form onSubmit={submitNuevoProducto}> 
 {alerta ?<p className={alerta.classes}>{alerta.msg}</p> :null}
 <div className="form-group" > 
 <label>Nombre Producto</label>

 <input type="text"
  className="form-control"
  placeholder="Nombre Producto"
  name="nombre"
  value={nombre}
  onChange={e =>guardarNombre(e.target.value)}
  />
 </div>

 <div className="form-group" > 
 <label>Precio Producto</label>
 
 <input type="number"
  className="form-control"
  placeholder="Precio Producto"
  name="precio"
  value={precio}
  onChange={e =>guardarPrecio(Number(e.target.value))}
  />
 </div>

 <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100"> 
  Agregar </button>

 </form>
{cargando ?<p>Cargando...</p> :null}
{error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un Error</p> : null}
 </div>

 

 </div>

 </div>

 </div>

    )

}

export default NuevoProducto;
