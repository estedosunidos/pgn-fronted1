import React,{useState,useEffect} from "react";
import  {cabeceras,API_USUARIO,API_PERFIL} from "../../store/constante"
import axios from "axios";
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
function EditarUsuario(props){
    const [usuario,setUsuario]=useState(props.usuario)
    const [perfiles, setPerfiles] = useState([])
    const [perfil, setPerfil] = useState({})
    const editarusuario=((event)=>{
        event.preventDefault()
        const url=process.env.REACT_APP_API_URL+API_USUARIO+"/"+usuario.Documento;
        const body={
            Documento:usuario.Documento,
            Nombre:usuario.Nombres,
            Apellido:usuario.Apellidos,
            Telefono:usuario.Telefono,
            Direccion:usuario.Direccion,
            Fecha_de_nacimiento:usuario["Fecha Nacimiento"],
            Email:usuario.Email
        }
        axios.put(url,body,{headers:cabeceras})
        .then(repuesta=>{
            console.log(repuesta.data);
            props.editar();
        })
        .catch(error=>{
            alert("El usuario no fue editado")
            console.log(error)
        })
    })
    const handleChange=(prop)=>(event)=>{
        setUsuario({...usuario,[prop]:event.target.value})  
    }
    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + API_PERFIL;
        axios.get(url, { headers: cabeceras })
            .then(repuesta => {
                console.log(repuesta.data);
                setPerfiles(repuesta.data);
            })
    }, []);
    return(
        <div>
             <BootstrapDialog
                onClose={() => props.cancelar()}
                aria-labelledby="customized-dialog-title1"
                open={props.showModal}>
                <BootstrapDialogTitle id="customized-dialog-title1" onClose={() => props.cancelar()}>
                    <label>Actualizar Usuario</label>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <Box sx={{ minWidth: 400 }}>
                        <FormControl fullWidth>
                            <TextField id="standard-basic1" name="Documento" label={'Documento'} margin="normal" value={usuario.Documento} onChange={handleChange("Documento")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic4" name="Telefono" label={'Telefono'} margin="normal" value={usuario.Telefono} onChange={handleChange("Telefono")} />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="standard-basic5" name="Direccion" label={'Direccion'} margin="normal" value={usuario.Direccion} onChange={handleChange("Direccion")} />
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DesktopDatePicker
                                label="Fecha de nacimiento"
                                inputFormat="MM/dd/yyyy"
                                value={usuario.Fecha_de_nacimiento}
                                onChange={(newvalue) => {
                                    setUsuario({ ...usuario, ["Fecha_de_nacimiento"]: newvalue })
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth>
                            <TextField id="standard-basic6" name="Email" label={'Email'} margin="normal" value={usuario.Email} onChange={handleChange("Email")} />
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={editarusuario}>
                        Editar
                    </Button>
                    <Button color="secondary" onClick={() => props.cancelar()}>
                        Cancelar
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}
export default EditarUsuario;