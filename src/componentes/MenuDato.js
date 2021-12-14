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
    titulo:"Carrera",
    icono:<FaIcons.FaToolbox/>,
    ruta: "/Carrera",
    style:"nav-text",
    componente:Carrera,
    IsAdministrativo:true
},
{
    titulo:"Asignatura",
    icono:<FaIcons.FaBookReader/>,
    ruta:"/Asignatura",
    style:"nav-text",
    componente:Asignatura,
    IsAdministrativo:true
},
{
    titulo:"Usuario",
    icono:<FaIcons.FaUserFriends
    />,
    ruta:"/Usuario",
    componente:Usuario,
    style:"nav-text",
    IsAdministrativo:true
},
{
    titulo:"Docente",
    icono:<GiIcons.GiTeacher/>,
    ruta:"/Docente",
    componente:Docente,
    style:"nav-text",
    IsAdministrativo:true
},
{
    titulo:"Estudiante",
    icono:<FaIcons.FaUserGraduate/>,
    ruta:"/Estudiante",
    componente:Estudiante,
    style:"nav-text",
    IsAdministrativo:true
},
{
    titulo:"Ubicacion",
    icono:<FaIcons.FaBuilding
    />,
    ruta:"/Ubicacion",
    componente:Ubicacion,
    style:"nav-text",
    IsAdministrativo:true
},{
    titulo:"EvaluacionTipo",
    icono:<FaIcons.FaFileSignature
    />,
    ruta:"/Evaluaciontipo",
    componente:Evaluaciontipo,
    style:"nav-text",
    IsAdministrativo:true
},{
    titulo:"Curso",
    icono:<FaIcons.FaChalkboardTeacher/>,
    ruta:"/Curso",
    style:"nav-text",
    componente:Curso,
    IsAdministrativo:true
},{
    titulo:"Administrador",
    icono:<FaIcons.FaUsersCog/>,
    ruta:"/Administrador",
    style:"nav-text",
    componente:Administrador,
    IsAdministrativo:true
},{
    titulo:"AsinancionCarrera",
    ruta:"/AsinancionCarrera",
    style:"nav-text",
    componente:AsinancionCarrera,
    IsAdministrativo:true
},{
    titulo:"Franjas",
    icono:<AiIcons.AiOutlineSchedule/>,
    ruta:"/Franja",
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
    titulo:"Registro Plan de evaluacion",
    ruta:"/RegistroPlandeEvaluacion",
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
    

    titulo:"RegistroPeriodo",
    icono:<AiIcons.AiFillCalendar/>,
    style:"nav-text",
    ruta:"/RegistroPeriodo",
    componente:RegisstroPeriodo,
    IsAdministrativo:true
},{
    titulo:"CortesAsignatura",
    ruta:"/CortesAsignatura",
    style:"nav-text",
    componente:CortesAsignatura,
    IsDocente:true
},{
    titulo:"RegistroAsignatura",
    icono:<FaIcons.FaCalendarCheck/>,
    ruta:"/RegistroAsignatura",
    style:"nav-text",
    componente:RegistroAsignatura,
    IsEstudiante:true
},{
    titulo:"ConsultarHorario",
     icono:<AiIcons.AiOutlineSchedule/>,
    ruta:"/ConsultaHorario",
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
    titulo:"Notificación",
    icono:<FaIcons.FaBell/>,
    ruta:"/AnuncioEstudiante",
    componente:AnuncioEstudiante,
    style:"nav-text-alert",
    IsEstudiante:true
}]
;
export default menu 