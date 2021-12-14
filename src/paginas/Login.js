import React, { useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import { Grid, Container, Paper, TextField,Typography, Button, CssBaseline, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Routes from "../routes/Routes";
import { API_LOGIN } from "../store/constante"
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
    },

    button: {
        margin: theme.spacing(3, 0, 2)
    },
    container: {
        opacity: '0.8',
        height: '60%',
        marginTop: theme.spacing(10),
        [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
            marginTop: 0,
            width: '100%',
            height: '100%'
        }
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    div: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));
//:asignacion de un atributo
function Login() {
    const clases = useStyles();
    const [values, setValues] = useState({ usuario: "", Contraseña: "", mostrar: false });
    const [showError, setShowError] = useState(false)
    const [textError, setTextError] = useState("")
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })

    };
    const ingresar = (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_URL + API_LOGIN
        const body = {
            Nombre_de_Usuario: values.usuario,
            Contraseña: values.Contraseña
        }
        axios.post(url, body)
            .then(repuesta => {
                console.log(repuesta.data)
                validacionLogica(repuesta.data);
            })
            .catch(error => {
                setTextError("Se ha presentado un error  al ingresar")
                setShowError(true)
                console.log(error)
            })

    }
    //&& =y   || = or not =!
    function validacionLogica(repuesta) {
        if (repuesta['token'] === "" && 'Nombre' in repuesta) {
            setTextError("La contraseña es incorrecta")
            setShowError(true)
        } else if (repuesta['token'] === "") {
            setTextError("El usuario y la contraseña son incorrectas");
            setShowError(true)

        } else {
            localStorage.setItem("token", repuesta['token'])
            localStorage.setItem("nombre_de_usuario", repuesta['Nombre'] + " " + repuesta['Apellido']);
            localStorage.setItem("documento", repuesta['Documento']);
            localStorage.setItem("token", "Bearer " + repuesta["token"]);
            localStorage.setItem("perfil", JSON.stringify(repuesta["Perfil"]))
            //localStorage.setItem("foto",JSON.stringify(repuesta["foto"]))
            ReactDOM.render(
                <React.StrictMode>
                    <Routes />
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    }
    const mostrarPassword = () => {
        setValues({ ...values, mostrar: !values.mostrar })

    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    const handleClose = () => {
        setShowError(false)
        setTextError("")
    }
    return (
        <Grid container component='main' className={clases.root}>
            <CssBaseline />
            <Container component={Paper} elevation={5} maxWidth='xs' className={clases.container}>
            <div className={clases.div}>
                <Typography component='h1' variant='h5'>Ingresar </Typography>
                <form onSubmit={ingresar} className={clases.form}>
                    <div>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Usuario'
                            name='usuario'
                            id="txtUsuario"
                            value={values.usuario}
                            onChange={handleChange("usuario")}
                        >
                        </TextField>
                    </div>
                    <div>
                        <FormControl className={clsx(clases.margin, clases.textField)}>
                            <TextField
                                fullWidth
                                autoFocus
                                type='password'
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Password'
                                name='password'
                                type={values.mostrar ? "text" : "password"}
                                id="txtPassword"
                                value={values.contraseña}
                                onChange={handleChange("Contraseña")}
                            >
                            </TextField>
                        </FormControl>
                    </div>
                    <Button
                        type="submit"
                        variant='contained'
                        color='secondary'
                    >
                        Ingresar
                    </Button>
                </form>
                {showError && <Dialog onClose={handleClose} open={showError}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-error">{textError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>}
			</div>
        </Container>
        </Grid>
    );
}
export default Login;