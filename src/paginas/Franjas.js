import React,{useEffect,useState} from "react";
import  {API_ASIGNATURA,cabeceras,API_CURSO} from "../store/constante"
import axios from "axios";
import Franjas1 from "../componentes/Flangas/Franjas1"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function Franjas(){
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [grupo,setGrupo]=useState({})
    const [grupos,setGrupos]=useState([])
    const [mostrafranjas,setMostrafranjas]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setAsignaturas(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            setTextError("La asignatura no pudieron ser cargadas")
            setShowError(true)
        })
    },[])
    const handleChange=(prop)=>(event)=>{
        if(prop==="Asignatura"){
        setAsignatura({...asignatura,[prop]:event.target.value})
        returngrupo(event.target.value)
        }else if(prop==="Grupo"){
        setGrupo({...grupo,[prop]:event.target.value})
        setMostrafranjas(true)
        } 
    }
    const returngrupo=((Id)=>{
        const url =process.env.REACT_APP_API_URL+API_CURSO+"/asignatura/"+Id
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            setGrupos(repuesta.data)
        })
        .catch(error=>{
            console.log(error)
            setTextError("Los grupos no fueron cargador")
            setShowError(true)
        })
    })
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return(
        <div>
            <label>Asignatura</label>
            <select name="asignaturas" defaultValue="" onChange={handleChange("Asignatura")}>
                <option value="" disabled>Seleccione</option>
                {asignaturas.map((asigantura,index)=>{
                    return <option key={index} value={asigantura.Id}>{asigantura.Asignaturas}</option>
                })}
            </select>
            <div>
            <label>Grupo</label>
            <select name="grupos" defaultValue="" onChange={handleChange("Grupo")}>
                <option value="" disabled>Seleccione</option>
                {grupos.map((grupo,index)=>{
                    return <option key={index} value={grupo.Id}>{grupo.Grupo}</option>
                })}
            </select>
           </div>
          <div>
          {mostrafranjas && <Franjas1  grupo={grupo}  ></Franjas1>}
          </div>
          {showError && <Dialog onClose={handleClose} open={showError}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-error">{textError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>}
        </div>
    )
}
export default Franjas