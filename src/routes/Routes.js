import MenuDato from "../componentes/MenuDato"
import Navegacion from "../componentes/Navegacion"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function Routes() {
    return (
        <Router>
            <Navegacion></Navegacion>
            <Switch>
                {MenuDato.map((ruta, index) => (
                    <Route key={index} path={ruta.ruta} exact={ruta.exact} component={ruta.componente}></Route>
                ))}
            </Switch>
        </Router>
    );
}
export default Routes;