import Principal from "../paginas/Principal"
import Carrera from "../paginas/Carrera"
import Asignatura from "../paginas/Asignatura"
import Docente from "../paginas/Docente"
import Estudiante from "../paginas/Estudiante"
import Usuario from "../paginas/Usuario"
import Ubicacion from "../paginas/Ubicacion"
import Evaluaciontipo from "../paginas/Evaluaciontipo"
import Curso from "../paginas/Curso"
import Administrador from "../paginas/Administrador"
import AsinancionCarrera from "../paginas/AsinanacionCarrera"
import Franjas from "../paginas/Franjas"
import RegistroNotas from "../paginas/RegistroNotas"
import RegistroAsistencia from "../paginas/RegistroAsistencia"
import RegistroPlanEvaluacion from "../paginas/PlanEvaluciones"
import AnuncioProfesor from "../paginas/AnuncioProfesor"
import RegistroCortesAcademicos from "../paginas/Registrodecortesacademicos"
import RegisstroPeriodo from "../paginas/RegistroPeridod"
import CortesAsignatura from "../paginas/CortesAsignatura"
import RegistroAsignatura from "../paginas/RegistroAsignatura"
import ConsultarHorario from "../paginas/Consultarhorario"
import Consultarnotas from "../paginas/Consultarnotas"
import AnuncioEstudiante from "../componentes/AnuncioEstudiante/AnuncioEstudiante"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
const menu =[{
    titulo: "Principal",
    icono: <AiIcons.AiFillHome />,
    ruta: "/",
    exact:true,
    style:"nav-text",
    IsAdministrativo:true,
    IsDocente:true,
    IsEstudiante:true,
    componente:Principal
},
{
    titulo:"Carreras",
    icono:<FaIcons.FaToolbox/>,
    ruta: "/Carreras",
    style:"nav-text",
    componente:Carrera,
    IsAdministrativo:true
},
{
    titulo:"Asignaturas",
    icono:<FaIcons.FaBookReader/>,
    ruta:"/Asignaturas",
    style:"nav-text",
    componente:Asignatura,
    IsAdministrativo:true
},
{
    titulo:"Usuarios",
    icono:<FaIcons.FaUserFriends
    />,
    ruta:"/Usuarios",
    componente:Usuario,
    style:"nav-text",
    IsAdministrativo:true
},
{
    titulo:"Docentes",
    icono:<GiIcons.GiTeacher/>,
    ruta:"/Docentes",
    componente:Docente,
    style:"nav-text",
    IsAdministrativo:true
},
{
    titulo:"Estudiantes",
    icono:<FaIcons.FaUserGraduate/>,
    ruta:"/Estudiantes",
    componente:Estudiante,
    style:"nav-text",
    IsAdministrativo:true
},
{
    titulo:"Ubicaciones",
    icono:<FaIcons.FaBuilding
    />,
    ruta:"/Ubicaciones",
    componente:Ubicacion,
    style:"nav-text",
    IsAdministrativo:true
},{
    

    titulo:"EvaluacionTipos",
    icono:<FaIcons.FaFileSignature
    />,
    ruta:"/Evaluaciontipos",
    componente:Evaluaciontipo,
    style:"nav-text",
    IsAdministrativo:true
},{
    

    titulo:"Cursos",
    icono:<FaIcons.FaChalkboardTeacher/>,
    ruta:"/Cursos",
    style:"nav-text",
    componente:Curso,
    IsAdministrativo:true
},{
    titulo:"Administradores",
    icono:<FaIcons.FaUsersCog/>,
    ruta:"/Administradores",
    style:"nav-text",
    componente:Administrador,
    IsAdministrativo:true
},{
    titulo:"AsinancionCarreras",
    ruta:"/AsinancionCarreras",
    style:"nav-text",
    componente:AsinancionCarrera,
    IsAdministrativo:true
},{
    titulo:"Franjas",
    icono:<AiIcons.AiOutlineSchedule/>,
    ruta:"/Franjas",
    style:"nav-text",
    componente:Franjas,
    IsAdministrativo:true
},{
    

    titulo:"RegistroAsistencia",
    icono:<FaIcons.FaCalendarCheck/>,
    ruta:"/RegistroAsistencia",
    style:"nav-text",
    componente:RegistroAsistencia,
    IsDocente:true
},{
    titulo:"RegistroNotas",
    ruta:"/RegistroNotas",
    style:"nav-text",
    componente:RegistroNotas,
    IsDocente:true
},{
    titulo:"Registro Plan de evaluaciones",
    ruta:"/RegistroPlandeEvaluaciones",
    style:"nav-text",
    componente:RegistroPlanEvaluacion,
    IsDocente:true
},{
    

    titulo:"AnuncioProfesor",
    icono:<AiIcons.AiFillBell/>,
    style:"nav-text",
    ruta:"/AnuncioProfesor",
    componente:AnuncioProfesor,
    IsDocente:true
},{
    titulo:"RegistroCortesAcademicos",
    ruta:"/RegistroCortesAcademicos",
    style:"nav-text",
    componente:RegistroCortesAcademicos,
    IsAdministrativo:true
},{
    

    titulo:"RegistroPeriodos",
    icono:<AiIcons.AiFillCalendar/>,
    style:"nav-text",
    ruta:"/RegistroPeriodos",
    componente:RegisstroPeriodo,
    IsAdministrativo:true
},{
    titulo:"CortesAsignatura",
    ruta:"/CortesAsignatura",
    style:"nav-text",
    componente:CortesAsignatura,
    IsDocente:true
},{
    titulo:"RegistroAsignaturas",
    icono:<FaIcons.FaCalendarCheck/>,
    ruta:"/RegistroAsignaturas",
    style:"nav-text",
    componente:RegistroAsignatura,
    IsEstudiante:true
},{
    titulo:"ConsultarHorarios",
     icono:<AiIcons.AiOutlineSchedule/>,
    ruta:"/ConsultaHorarios",
    style:"nav-text",
    componente:ConsultarHorario,
    IsEstudiante:true
},{
    

    titulo:"ConsultarNotas",
    icono:<FaIcons.FaReceipt/>,
    ruta:"/ConsultarNota",
    style:"nav-text",
    componente:Consultarnotas,
    IsEstudiante:true
},{
    titulo:"",
    icono:<FaIcons.FaBell/>,
    ruta:"/AnuncioEstudiante",
    componente:AnuncioEstudiante,
    style:"nav-text-alert",
    IsEstudiante:true
}]
;
export default menu 