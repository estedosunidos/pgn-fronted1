import MenuDato from "../componentes/MenuDato"
import React,{useState} from "react"
import { IconContext } from 'react-icons';
import {Link} from "react-router-dom"
import * as FaIcons from 'react-icons/fa';
import { Icon } from "@material-ui/core";
import * as AiIcons from 'react-icons/ai';
import { useEffect } from "react";

function Navegacion(){
    const [sidebar,setSidebar]=useState(false);
    const mostrarSiderbar=()=>setSidebar(!sidebar);
    const [menu,setMenu]=useState([])
    const perfil=JSON.parse(localStorage.getItem("perfil"))
    
    useEffect(()=>{
        if (perfil.idperfil === 2) {
            setMenu(MenuDato.filter((ruta, index)=>ruta.IsAdministrativo))
        }else if (perfil.idperfil === 4){
            setMenu(MenuDato.filter((ruta, index)=>ruta.IsDocente))
        }else if (perfil.idperfil === 3){
            setMenu(MenuDato.filter((ruta, index)=>ruta.IsEstudiante))
        }
    },[])

    return(
        <IconContext.Provider value={{color:'#000'}}>
           <div>
                <Link to="#">
                    <FaIcons.FaBars onClick={mostrarSiderbar}>
                        
                    </FaIcons.FaBars>
                </Link>
            </div> 
            <nav>
                <ul onClick={mostrarSiderbar}>
                    <li>
                        <Link to="#">
                            <Icon>
                                 <AiIcons.AiOutlineClose>
                                        
                                 </AiIcons.AiOutlineClose>
                            </Icon>
                        </Link>
                    </li>
                    {menu.map((ruta,index)=>(
                        <li key={index} ><Link to={ruta.ruta}> <span>{ruta.titulo}</span></Link></li>
                    ))}
                </ul>
            </nav>
        </IconContext.Provider>
        
    );
}
export default Navegacion;
