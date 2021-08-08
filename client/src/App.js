import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";

import Main from "./components/Main"
import Auth from "./components/Auth";
import Error from "./components/error/Error";
import { socket } from "./socket";
import {throwError, setLoader} from "./redux/action/actions";



function App() {
    const [user, setUser] = useState("");
    const dispath = useDispatch();
    useEffect(() => {
        socket.on("ERROR", ({message}) => {
            dispath(throwError(message));
            dispath(setLoader(false));
            if (message === "вы не авторизованы") {
                setUser("");
            }
        })
    })
    return (
        <div className="app">
            <BrowserRouter>
                {
                    user ?
                        <Switch>
                            <Route path="/chat" exact>
                                <Main />
                            </Route>
                            <Redirect to="/chat" />
                        </Switch>
                    :
                        <Switch>
                            <Route path="/" exact>
                                <Auth setUser={setUser}/>
                            </Route>
                            <Redirect to="/"/>
                        </Switch>
                }
            </BrowserRouter>
            <Error />
        </div>
    )
}

export default App;