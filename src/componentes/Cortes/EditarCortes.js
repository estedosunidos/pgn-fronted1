import React,{useState} from "react";
import axios from "axios";
import  {API_CORTE,cabeceras} from "../../store/constante"
function EditarCortes(props){
    const [corte,setCorte]=useState(props.corte)
    const crearcortes=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_CORTE+"/"+corte.Id;
        const body={
            Descripcion:corte.Descripcion
        }
        console.log(JSON.stringify(body));
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("El corte academico no se pudo actualizar exitosamente ")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setCorte({...corte,[prop]:event.target.value})
    }
    return(
        <div>
            <div>
                <h2>Actualizar  Corte Academico</h2>
            </div>
            <form onSubmit={crearcortes}>
                    <label>Corte Academico</label>
                    <input type="text" value={corte.Descripcion} onChange={handleChange("Descripcion")}></input>
                    <button  type="submit"> Crear</button>
                    <button onClick={()=>props.cancelar()}>Cancelar</button>
            </form>
        </div>
    )
}
export default EditarCortes