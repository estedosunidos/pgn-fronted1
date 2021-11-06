import React,{useEffect,useState} from "react";
import  {API_CARRERA,cabeceras} from "../store/constante"
import axios from "axios";
import Table from "../componentes/Table"
import EditarCarrera from "../componentes/carreras/EditarCarrera";
import CrearCarrera from "../componentes/carreras/CrearCarrera";

function Carrrera(){
    const [carreras,setCarreras]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [carrera,setCarrera]=useState({})
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_CARRERA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setCarreras(repuesta.data);
        })
    },[appState]);
    const borrarcarrera=((carreras)=>{
        const url=process.env.REACT_APP_API_URL+API_CARRERA+"/"+carreras.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("La carrera no fue eliminada ")
        })
    }
    );
  
    const mostrareditarcarrera=((carrera)=>{
        setEditar(true)
        setCarrera(carrera)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarcarrera=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearcarrera=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearcarrera=(()=>{
        setCrear(true)
    })
    return(
        <div>
            <button onClick={mostrarcrearcarrera}>Nuevo</button>
           <Table data={carreras} borrar={borrarcarrera} mostrar={mostrareditarcarrera}></Table>
         
           {editar && <EditarCarrera cancelar={cancelar} carrera={carrera} editar={editarcarrera}> </EditarCarrera>}
           {crear && <CrearCarrera cancelar={cancelar} crear={crearcarrera}></CrearCarrera>}

           
        </div>
    )
}

export default Carrrera;