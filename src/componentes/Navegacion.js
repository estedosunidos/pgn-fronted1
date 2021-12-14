import MenuDato from "../componentes/MenuDato"
import React, { useState } from "react"
import { IconContext } from 'react-icons';
import { Link } from "react-router-dom"
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa';
import { useEffect } from "react";
import "../css/Navegacion.css"
function Navegacion() {
    const [sidebar, setSidebar] = useState(true);
    const mostrarSiderbar = () => setSidebar(!sidebar);
    const [menu, setMenu] = useState([])
    const perfil = JSON.parse(localStorage.getItem("perfil"))
    useEffect(() => {
        if (perfil.idperfil === 2) {
            setMenu(MenuDato.filter((ruta) => ruta.IsAdministrativo))
        } else if (perfil.idperfil === 4) {
            setMenu(MenuDato.filter((ruta) => ruta.IsDocente))
        } else if (perfil.idperfil === 3) {
            setMenu(MenuDato.filter((ruta) => ruta.IsEstudiante))
        }
    }, [])
    return (
        <IconContext.Provider value={{ color:"#fff"}}>
            <div className="navbar">
                {!sidebar && <Link className="menu-bars" to="#">
                    <FaIcons.FaBars onClick={mostrarSiderbar}/>
                </Link>}
                {sidebar && <Link className="menu-bars" to="#">
                    <AiIcons.AiOutlineClose onClick={mostrarSiderbar}/>
                </Link>}
            </div>
            <nav className={ sidebar? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={mostrarSiderbar} >
                    {menu.map((ruta, index) => (
                        <li key={index} className={ruta.style} ><Link to={ruta.ruta}>{ruta.icono} <span>{ruta.titulo}</span></Link></li>
                    ))}
                    
                </ul>
            </nav>
        </IconContext.Provider>
    );
}
export default Navegacion;
