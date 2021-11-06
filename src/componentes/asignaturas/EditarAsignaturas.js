import React,{useState} from "react";
import axios from "axios";
import  {API_ASIGNATURA,cabeceras} from "../../store/constante"
function EditarAsignaturas(props){
    const [asignatura,setAsignatura]=useState(props.asignatura)
    const editarasignatura=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_ASIGNATURA+"/"+asignatura.Id;
        const body={
            Nombre_Asignatura:asignatura.Asignatura,
            Semestre:asignatura.Semestre,
            Descripcion:asignatura.Descripcion,
            Unidad_de_credito:asignatura.Creditos,
            Observacion:asignatura.Observacion,
            Contenido:asignatura.Contenido,
            idAdministrador:JSON.parse(localStorage.getItem("perfil"))["idAdministrador"]
            }
        console.log(JSON.stringify(body))
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        }
        )
        .catch(error=>{
            alert("Se ha presentado un error")
            console.log(error)
        })

    })
    const handleChange=(prop)=>(event)=>{
        setAsignatura({...asignatura,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Actualizar Asignatura</h2>
            </div>
            <form onSubmit={editarasignatura}>
                    <label>Nombre Asignatura</label>
                    <input type="text" value={asignatura.Asignatura} onChange={handleChange("Asignatura")}></input>
                    <label>Semestre</label>
                    <input type="text" value={asignatura.Semestre} onChange={handleChange("Semestre")}></input> 
                    <label>Descripcion</label>
                    <input type="text" value={asignatura.Descripcion} onChange={handleChange("Descripcion")} ></input>
                    <label>Unidad de Credito</label>
                    <input type="text" value={asignatura["Creditos"]} onChange={handleChange("Creditos")} ></input>
                    <label>Observacion</label>
                    <input type="text" value={asignatura.Observacion} onChange={handleChange("Observacion")} ></input>
                    <label>Contenido</label>
                    <input type="text" value={asignatura.Contenido} onChange={handleChange("Contenido")} ></input>
                    <button  type="submit"> Editar</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
                </form>
        </div>
    )
}
export default EditarAsignaturas