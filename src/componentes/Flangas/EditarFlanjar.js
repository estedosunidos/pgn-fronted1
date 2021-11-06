import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_UBICACION,cabeceras,API_FRANJAS} from "../../store/constante"
function EditarFlanjar(props){
    const [ubicaciones,setUbicaciones]=useState([])
    const [franja,setFranja]=useState({})
    const [dias,setDias]=useState(["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"])
    useEffect(()=>{
        console.log(franja)
        const url=process.env.REACT_APP_API_URL+API_UBICACION;
        console.log("ssss",franja)
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setUbicaciones(repuesta.data);
        })
        .catch(error=>{
            alert("La franja no fue creada")
            console.log(error)
        })
    },[]);
    const handleChange=(prop)=>(event)=>{
            setFranja({...franja,[prop]:event.target.value})
    }
    const editarfranja=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_FRANJAS+"/"+props.franja1
        const body={
            HoraInicio:"1970-01-01 "+franja["Hora Inicio"]+":00",
            HoraFinal:"1970-01-01 "+franja["Hora Fin"]+":00",
            Dia:franja["dia"],
            idUbicacion:franja["ubicacion"],
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
                <select name="Ubicaciones" defaultValue="" onChange={handleChange("ubicacion")}>
                <option value="" disabled>Seleccione</option>
                {ubicaciones.map((ubicacion,index)=>{
                    return <option key={index} value={ubicacion.Id}>{ubicacion.Ubicacion}</option>
                })}
                </select>
                <label>Dia</label>
                <select name="dia" defaultValue="" onChange={handleChange("dia")}>
                <option value="" disabled>Seleccione</option>
                {dias.map((dia,index)=>{
                    return <option key={index} value={dia}>{dia}</option>
                })}
                </select>
                <label>Hora Inicial</label>
                <input type="time" value={franja["Hora Inicio"]} onChange={handleChange("Hora Inicio")}></input>
                <label>Hora Final</label>
                <input type="time" value={franja["Hora Fin"]} onChange={handleChange("hora_fin")}></input>
                <button  type="submit"> Editar</button>
                <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default EditarFlanjar