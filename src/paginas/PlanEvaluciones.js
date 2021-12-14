import React,{useEffect,useState} from "react";
import  {API_DOCENTE,cabeceras} from "../store/constante"
import axios from "axios";
import RegistroPlanEvaluacion from "../componentes/PlanEvaluacionDocente/RegistroPlanEvaluacion"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
function PlanEvaluacion(){
    const [asignaturas,setAsignaturas]=useState([])
    const [asignatura,setAsignatura]=useState({})
    const [docente,setDocente]=useState({})
    const [mostraregistroplanevaluacion,setMostraregistroplanevaluacion]=useState(false)
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    useEffect(()=>{
        const documento =localStorage.getItem("documento")
        const url=process.env.REACT_APP_API_URL+API_DOCENTE+"/documento/"+documento
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data)
            let docente1=repuesta.data
            if (docente1.length>0){
                setAsignaturas(docente1[0]["AsignaturaDocente"])
                setDocente(docente1[0])
            }
        })
        .catch(error=>{
            console.log(error)
            setTextError("La asignatura no pudieron ser cargadas")
            setShowError(true)
        })
    },[])
    const handleChange=(prop)=>(event)=>{
        setAsignatura(event.target.value)
    }
    const consulta=(()=>{
        setMostraregistroplanevaluacion(true)
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
                    return <option key={index} value={asigantura.Id}>{asigantura["Nombre Asignatura"]}</option>
                })}
            </select>
            <button onClick={consulta}>Consultar:</button>
            {mostraregistroplanevaluacion && <RegistroPlanEvaluacion asignatura={asignatura}></RegistroPlanEvaluacion>}
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
export default PlanEvaluacion