import axios from "axios";
import React,{useState,useEffect} from "react";
import moment from "moment"
import  {API_UBICACION,cabeceras,API_FRANJAS} from "../../store/constante"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
function EditarFlanjar(props){
    const [ubicaciones,setUbicaciones]=useState([])
    const [franja,setFranja]=useState(props.franja1)
    const [dias,setDias]=useState(["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"])
    useEffect(()=>{
        console.log(props)
        const urlubicacion=process.env.REACT_APP_API_URL+API_UBICACION;
        const urlfranjahoraria=process.env.REACT_APP_API_URL+API_UBICACION+"/franjahorario/"+props.franja1.Id;
        const axiosubicacion=axios.get(urlubicacion,{headers:cabeceras})
        const axiosfranjahorariia=axios.get(urlfranjahoraria,{headers:cabeceras})
        axios.all([axiosubicacion,axiosfranjahorariia])
        .then(axios.spread((...repuestas)=>{
            repuestas.map((repuesta,index)=>{
                console.log(repuesta.data)
                if(index===0){
                    setUbicaciones(repuesta.data)
                }else{
                    let franjahoraria1=repuesta.data
                    if(franjahoraria1.length>0){
                        console.log(0)
                        console.log(franjahoraria1[0])
                        setFranja({...franja,["Ubicacion"]:franjahoraria1[0]})
                    }
                }
            })
        }))
        .catch(axios.spread((...errores)=>{
            errores.map((error,index)=>{
                console.log(error)
                if (index===0){
                    alert("La ubicaciones no fueron listada")
                }else if(index===1){
                    alert("La franja no fueron cargada")
                }
            })
        })) 
    },[]);
    const handleChange=(prop)=>(event)=>{
            setFranja({...franja,[prop]:event.target.value})
    }
    const editarfranja=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_FRANJAS+"/"+props.franja1.Id
        const body={
            HoraInicio:"1970-01-01 "+franja["Hora Inicio"]+":00",
            HoraFinal:"1970-01-01 "+franja["Hora Fin"]+":00",
            Dia:franja["dia"],
            idUbicacion:franja["Salon"],
            IdCurso:props.curso
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("La franjas no fue editada")
            console.log(error)
        })
    })
    return(
        <div>
            <form onSubmit={editarfranja}>
                <label>Ubicacion</label>
                <select name="Ubicaciones" defaultValue="" onChange={handleChange("Salon")}>
                <option value="" disabled>Seleccione</option>
                {ubicaciones.map((ubicacion,index)=>{
                    return <option key={index} value={ubicacion.Id} selected={ubicacion.Id == franja.Ubicacion.Id ? true : false} >{ubicacion.Ubicacion}</option>
                })}
                </select>
                <label>Dia</label>
                <select name="diafranja" defaultValue="" onChange={handleChange("dia")}>
                <option value="" disabled>Seleccione</option>
                {dias.map((dia,index)=>{
                    return <option key={index} value={dia} selected={dia == franja.Dia}>{dia}</option>
                })}
                </select>
                <label>Hora Inicial</label>
                <input type="time" value={moment(new Date("1970-01-01 "+franja["Hora Inicio"]+":00")).format("HH:mm")} onChange={handleChange("Hora Inicio")}></input>
                <label>Hora Final</label>
                <input type="time" value={moment(new Date("1970-01-01 "+franja["Hora Fin"]+":00")).format("HH:mm")} onChange={handleChange("Hora Fin")}></input>
                <button  type="submit"> Editar</button>
                <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default EditarFlanjar