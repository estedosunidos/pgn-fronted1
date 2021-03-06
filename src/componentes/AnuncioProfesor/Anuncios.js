import React,{useEffect,useState} from "react";
import  {cabeceras,API_ANUNCIO} from "../../store/constante"
import axios from "axios";
import TableCustom from "../TableCustom"
import EditarAnuncio from "./EditarAnuncio";
import CrearAnuncio from "./CrearAnuncio"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function Anuncios(props){
    const [anuncios,setAnuncios]=useState([])
    const [anuncio,setAnuncio]=useState({})
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ANUNCIO+"/curso/"+props.grupo
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setAnuncios(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            alert("Los anuncio no fueron cargados")
        })
    },[appState])
    const mostracrearanuncio=(()=>{
        setCrear(true)
        
    })
    const borraranuncio=((anuncio)=>{
        console.log(anuncio)
        const url=process.env.REACT_APP_API_URL+API_ANUNCIO+"/"+anuncio.Id
        console.log(anuncios)
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("El anuncio  no fue eliminado ")
        })
    });
    const mostrareditaranuncio=((anuncio)=>{
        setEditar(true)
        setAnuncio(anuncio)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editaranuncio=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearanuncio=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    return(
        <div>
            <button onClick={mostracrearanuncio}>Nuevo</button>
            <TableCustom data={anuncios} borrar={borraranuncio} mostrar={mostrareditaranuncio}></TableCustom>
            {editar && <EditarAnuncio cancelar={cancelar}  anuncio={anuncio} editar={editaranuncio}> </EditarAnuncio>}
            {crear && <CrearAnuncio cancelar={cancelar}   curso={props.grupo} crear={crearanuncio}> </CrearAnuncio>}
        </div>
    )
}
export default Anuncios