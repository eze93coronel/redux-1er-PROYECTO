import React from 'react'
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
//redux 
import { useDispatch } from 'react-redux';
import { borrarProductoAction,obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {

 const {nombre,precio,id}= producto;

 const dispatch = useDispatch();
 const  navigate = useNavigate(); //habilitar history para redireccionar 
console.log(navigate);
 //confirmar si desea eliminarlo 
 const confirmarEliminarProducto = id =>{

   //PRREGUNTAR AL USUARIO
   Swal.fire({
    title: 'Estas seguro?',
    text: "un producto que se elimina no se puede recuperar!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText:'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

         //PASARLO AL ACTION
  dispatch(borrarProductoAction(id))
  
     
    }
  });

 }

 //funcion para redireccionar de forma programada 
 const redireccionarEdicion = producto=>{
   dispatch(obtenerProductoEditar(producto));
   
navigate(`/productos/editar:${producto.id}`)
 }

    return ( 
  <tr>
    <td>{nombre}</td>
    <td><span className="font-weight-bold"> {precio}</span></td>
    <td className="acciones">
    <button type="button" className="btn btn-primary mr-2"  onClick={()=>redireccionarEdicion(producto)}>
        Editar
    </button> 
    <button 
     type="button"
     className="btn btn-danger"
    onClick={()=>confirmarEliminarProducto(id)}
    >Eliminar </button>  

    </td>

    

  </tr>

     );
}
 
export default Producto;