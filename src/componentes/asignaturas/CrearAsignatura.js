import React,{useState} from "react";
import axios from "axios";
import  {API_ASIGNATURA,cabeceras} from "../../store/constante"
function CrearAsignatura(props){
    const [asignatura,setAsignatura]=useState(props.asignatura)
    const crearasignaturas=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA;
        const body={
            Nombre_Asignatura:asignatura.Nombre_Asignatura,
            Semestre:asignatura.Semestre,
            Descripcion:asignatura.Descripcion,
            Unidad_de_credito:asignatura.Unidad_de_credito,
            Observacion:asignatura.Observacion,
            Contenido:asignatura.Contenido,
            idAdministrador:JSON.parse(localStorage.getItem("perfil"))["idAdministrador"]
        }
    
        console.log(JSON.stringify(body));
        axios.post(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.crear();
        })
        .catch(error=>{
            alert("La asignatura no fue creada")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setAsignatura({...asignatura,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Registra  Asignatura</h2>
            </div>
            <form onSubmit={crearasignaturas}>
                    <label>Nombre Asignatura</label>
                    <input type="text" value={asignatura.Nombre_Asignatura} onChange={handleChange("Nombre_Asignatura")}></input>
                    <label>Semestre </label>
                    <input type="text" value={asignatura.Semestre} onChange={handleChange("Semestre")}></input> 
                    <label>Descripcion</label>
                    <input type="text" value={asignatura.Descripcion} onChange={handleChange("Descripcion")} ></input>
                    <label>Unida de credito</label>
                    <input type="text" value={asignatura.Unidad_de_credito} onChange={handleChange("Unidad_de_credito")} ></input>
                    <label>Observacion</label>
                    <input type="text" value={asignatura.Observacion} onChange={handleChange("Observacion")} ></input>
                    <label>Contenido</label>
                    <input type="text" value={asignatura.Contenido} onChange={handleChange("Contenido")} ></input>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default CrearAsignatura