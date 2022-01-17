import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
       AGREGAR_PRODUCTO_ERROR,
   COMENZAR_DESCARGA_PRODUCTOS,
   DESCARGA_PRODUCTOS_EXITO,
   DESCARGA_PRODUCTOS_ERROR,
   OBTENER_PRODUCTO_ELIMINAR,
   PRODUCTO_ELIMINADO_EXITO,
   PRODUCTO_ELIMINADO_ERROR,
   COMENZAR_EDICION_PRODUCTO,
   OBTENER_PRODUCTO_EDITAR,
   PRODUCTO_EDITADO_EXITO,
   PRODUCTO_EDITADO_ERROR

   
   
   
   } from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

    
   // crear nuevos productos 

   export function crearNuevoProductoAction (producto){
       return async (dispatch)=>{
             dispatch( agregarProducto());

             try {
                 // insertaar enla api 
               await  clienteAxios.post('/productos',producto);

                 // si sale todo bien , actualiza el state
                 dispatch(agregarProductoExito(producto))
            // alert sweetalert
             Swal.fire(
                 'Correcto',
                 'El Producto se agrego correctamente',
                 'success'
             )

             } catch (error) {
                 console.log(error);
                 //si ahy un error cambiar el sate
                 dispatch(agregarProductoError(true))
              
                 //alerta de error
                 Swal.fire({
                     icon: 'error',
                     title:'Hubo un error', 
                     text:'Hubo un error,intenta de nuevo'
                 })

             }
       }
   }

   const agregarProducto = ()=>({
       type: AGREGAR_PRODUCTO,
       payload : true
   })
  /// si erl producto se guarda en la base de datos
   const agregarProductoExito = producto =>({
       type: AGREGAR_PRODUCTO_EXITO,
       payload : producto
   })

   // si ahi un error 
   const agregarProductoError = estado =>({
      type : AGREGAR_PRODUCTO_ERROR,
      payload : estado
   })

   //FUNCION QUE DESCARGA LOS PRODCUTOS EN LA BASE DE DATOS 
   export function obtenerProductosAction(){
       return async(dispatch)=>{
           dispatch(descargarProductos());
try {
  setTimeout( async()=>{
    const respuesta = await clienteAxios.get('/productos');
    dispatch(descargaProductosExitosa(respuesta.data));
    console.log(respuesta.data);
  },3000)
} catch (error) {
    console.log(error)
    dispatch(descargaProductosError())
}
         

       }
   }

   const descargarProductos = ()=>({
       type: COMENZAR_DESCARGA_PRODUCTOS,
      payload : true
   })

   const descargaProductosExitosa = productos =>({
       type: DESCARGA_PRODUCTOS_EXITO,
       payload: productos
   })

   const descargaProductosError = () =>({
       type: DESCARGA_PRODUCTOS_ERROR,
       payload:true
   })


   //SELECIIONA Y ELEMINA EL PRODUCTO 
   export function borrarProductoAction(id){
  return async(dispatch )=>{
      dispatch(obtenerProductoEliminar(id));
  try {
       await clienteAxios.delete(`/productos/${id}`);
       dispatch(eliminarProductoExito());
       //si se elimina mostrar alerta 
       Swal.fire(
        'Eliminado!',
        'El producto se elimino correctamente.',
        'success'
      )
  } catch (error) {
      console.log(error);
      dispatch(productoEliminarError())
  }
      
  }
   }

    const obtenerProductoEliminar = id =>({
       type: OBTENER_PRODUCTO_ELIMINAR,
       payload: id
   });

   const eliminarProductoExito = ()=>({
       type:  PRODUCTO_ELIMINADO_EXITO,
   });

   const productoEliminarError = ()=>({
       type:PRODUCTO_ELIMINADO_ERROR,
       payload :true
   })
   //COLOCAR PRODUCTO EN EDICION D

    export function obtenerProductoEditar(producto){
        return (dispatch)=>{
            dispatch(obtenerProductoEditarAction(producto))
        }

    }
  const obtenerProductoEditarAction = producto =>({
     type:  OBTENER_PRODUCTO_EDITAR,
     payload: producto
  })

  //EDITA UN REGISTRO EN LA AP Y EN EL STATE 
  export function editarProductoAction(producto) {
    return async (dispatch)=>{
      dispatch(editarProducto());

       try {
        await clienteAxios.put(`/productos/${producto.id}`,producto)
       dispatch(editarProductoExito(producto));

        
       } catch (error) {
           console.log(error);
           dispatch(editarProductoError());
       }
    }

}

const editarProducto = () =>({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito  = producto=>({
type: PRODUCTO_EDITADO_EXITO,
payload: producto
})

const editarProductoError = ()=>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})