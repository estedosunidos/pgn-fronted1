import React,{useState,useEffect} from "react";
import  {API_FRANJAS,cabeceras} from "../../store/constante"
import axios from "axios";
import Table from "../Table"
import CrearFranjas from "./CrearFranjas"
import EditarFlanjar from "./EditarFlanjar"
function Franjas1(props){
    const [franjas1,setFranjas1]=useState([])
    const [franja1,setFranja1]=useState({})
    const [editar,setEditar]=useState(false)
    const [appState,setAppState]=useState(false)
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url = process.env.REACT_APP_API_URL+API_FRANJAS+"/curso/"+ props.grupo.Grupo
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setFranjas1(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("La franjas no fueron cargada ")
        })
    },[appState]);
    const borrarfranja=((franja)=>{
        const url=process.env.REACT_APP_API_URL+API_FRANJAS+"/"+franja.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("La franja no fue eliminada ")
        })
    }
    )
    const mostrareditarfranja=((franja1)=>{
        setEditar(true)
        setFranja1(franja1)
    })
    const mostracrearfranjas=(()=>{
        setCrear(true)
    })
    const crearfranja=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const editafranja=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    return(
        <div>
            <label>Franjas</label>
            <div>
                <button onClick={mostracrearfranjas}>Nuevo</button>
            </div>
            <Table data={franjas1} borrar={borrarfranja} mostrar={mostrareditarfranja}></Table>
            {crear && <CrearFranjas franja1={props.franja} curso={props.grupo.Grupo} cancelar={cancelar} crear={crearfranja}></CrearFranjas>}
            {editar && <EditarFlanjar cancelar={cancelar} franja1={props.franja1} curso={props.grupo.Grupo} editar={editafranja}> </EditarFlanjar>}
        </div>
    )   
}
export default Franjas1