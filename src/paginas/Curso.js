import React,{useEffect,useState} from "react";
import  {API_CURSO,cabeceras} from "../store/constante"
import axios from "axios";
import TableCustom from "../componentes/TableCustom"
import Editarcurso from "../componentes/cursos/EditarCurso"
import CrearCurso from "../componentes/cursos/CrearCurso";
function Curso(){
    const [appState,setAppState]=useState(false)
    const [editar,setEditar]=useState(false)
    const [crear,setCrear]=useState(false)
    const [cursos,setCursos]=useState([])
    const [curso,setCurso]=useState({})
    const borrarcurso=((cursos)=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO+"/"+cursos.Id
        console.log(cursos)
        axios.delete(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setAppState(!appState)
        }
        )
        .catch(error=>{
            console.log(error)
            alert("El curso  no fue eliminado ")
        })
    }
    );
    const editarcurso=(()=>{
        setAppState(!appState)
        setEditar(false)

    })
    const mostrareditarcurso=((curso)=>{
        setEditar(true)
        setCurso(curso)
    })
    useEffect(()=>{
        const url=process.env.REACT_APP_API_URL+API_CURSO;
        axios.get(url,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            setCursos(repuesta.data);
        })
    },[appState]);
    const mostracrearacurso=(()=>{
        setCrear(true)
    })
    const crearcurso=(()=>{
        setAppState(!appState)
        setCrear(false)
    })
    const cancelar=(()=>{
        setEditar(false)
        setCrear(false)
    })
    return(
        <div>
            <button onClick={mostracrearacurso}>Nuevo</button>
            <TableCustom data={cursos} borrar={borrarcurso} mostrar={mostrareditarcurso}></TableCustom>
            {editar && <Editarcurso cancelar={cancelar}   curso={curso} editar={editarcurso}> </Editarcurso>}
            {crear && <CrearCurso cancelar={cancelar}   curso={curso} crear={crearcurso}> </CrearCurso>}
        </div>
    )
}
export default Curso