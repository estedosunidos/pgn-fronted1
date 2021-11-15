import React,{useEffect,useState} from "react";
import  {API_EVALUACIONTIPO,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import Editarevaluaciontipo from "../componentes/Evaluaciontipo/Editarevaluaciontipo"
import Crearevaluaciontipo from "../componentes/Evaluaciontipo/Crearevaluaciontipo"
function Evaluaciontipo(){
    const [evaluaciontipos,setEvaluaciontipos]=useState([]);
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [evaluaciontipo,setEvaluaciontipo]=useState({})
    const [crear,setCrear]=useState(false)
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setEvaluaciontipos(repuesta.data);
        })
    },[appState]);
    const borrarevaluaciontipo=((evaluaciontipo)=>{
        const url=process.env.REACT_APP_API_URL+API_EVALUACIONTIPO+"/"+evaluaciontipo.Id;
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("El tipo de evaluacion no fue eliminada ")
        })
    }
    );
    const mostrareditarevaluaciontipo=((evaluaciontipo)=>{
        setEditar(true)
        setEvaluaciontipo(evaluaciontipo)
    });
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    const editarevaluaciontipo=(()=>{
        setAppState(!appState)
        setEditar(false)
    })
    const crearevaluaciontipo=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const mostrarcrearevaluaciontipo=(()=>{
        setCrear(true)
    })
    return(
        <div>
            <button onClick={mostrarcrearevaluaciontipo}>Nuevo</button>
           <TableCustom data={evaluaciontipos} borrar={borrarevaluaciontipo} mostrar={mostrareditarevaluaciontipo}></TableCustom>
           {editar && <Editarevaluaciontipo showModal={editar}  cancelar={cancelar} evaluaciontipo={evaluaciontipo} editar={editarevaluaciontipo}> </Editarevaluaciontipo>}
           
           {crear && <Crearevaluaciontipo  showModal={crear} cancelar={cancelar} crear={crearevaluaciontipo}></Crearevaluaciontipo>}
        </div>
    )
}
export default Evaluaciontipo