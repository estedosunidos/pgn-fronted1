import axios from "axios";
import React,{useState,useEffect} from "react";
import  {API_ASIGNATURACARRERA,cabeceras,API_ASIGNATURA}  from "../../store/constante"
function CrearAsignaturaCarrera(props){
    const [asignacioncarrera,setAsignacioncarrera]=useState({})
    const [asignaturas,setAsignaturas]=useState([])
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAsignaturas(repuesta.data);
        })
    },[]);
    const crearAsignaturaCarrera=((event)=>{
        console.log(asignacioncarrera)
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURACARRERA;
        const body={
            

            IdAsignatura:asignacioncarrera.Asignatura,
            IdCarrera:props.carrera.Id

        }
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La asignatura no fue asociada  ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignacioncarrera({...asignacioncarrera,[prop]:event.target.value})
    }
    return(
        <div>
                <form onSubmit={crearAsignaturaCarrera}>
                <label>Asignatura</label>
                <select name="asignaturas" defaultValue=" " onChange={handleChange("Asignatura")}>
                        <option value=" " disabled selected>seleccione</option>
                        {asignaturas.map((asignatura,index)=>{
                            return <option key={index} value={asignatura.Id}>{asignatura.Asignatura}</option>
                        })}
                        </select>
                    <button  type="submit">Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAsignaturaCarrera