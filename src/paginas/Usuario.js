import React,{useEffect,useState} from "react";
import  {API_USUARIO,cabeceras} from "../store/constante"
import axios from "axios";
import Table from "../componentes/Table"
import EditarUsuario from "../componentes/usuario/EditaUsuario";
import CrearUsuario from "../componentes/usuario/CrearUsuario";
function Usuario(){
    const [usuarios,setUsuarios]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [usuario,setUsuario]=useState({})
    const [crear,setCrear]=useState(false)
    const borrarusuario=((usuarios)=>{
        const url=process.env.REACT_APP_API_URL+API_USUARIO+"/"+usuarios.Documento;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("El usuario no fue eliminado ")
        })
    }
    );
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_USUARIO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setUsuarios(repuesta.data);
        })
    },[appState]);
    const mostraeditarusuario=((usuario)=>{
        setEditar(true)
        setUsuario(usuario)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarusuario=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearusuario=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearusuario=(()=>{
        setCrear(true)
    })
    return(
        <div>
            <button onClick={mostrarcrearusuario}>Nuevo</button>
           <Table data={usuarios} borrar={borrarusuario} mostrar={mostraeditarusuario}></Table>
           {editar && <EditarUsuario cancelar={cancelar} usuario={usuario} editar={editarusuario} mostrar={mostraeditarusuario}> </EditarUsuario>}
           
           {crear && <CrearUsuario cancelar={cancelar} crear={crearusuario}></CrearUsuario>}
        </div>
    )
}
export default Usuario