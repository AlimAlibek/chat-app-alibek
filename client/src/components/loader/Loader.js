import { Fragment } from "react";
import "./loader.css"
import Crossbar from "../header/crossbar/crossbar";
import HeaderItem from "../header/header-items/HeaderItem";
function Loader() {

    return(
        <Fragment>
            <Crossbar />
            <HeaderItem position="loader">
                <div className="loader__content">
                    ЗАГРУЗКА
                </div>
            </HeaderItem>
        </Fragment>     
    )
}

export default Loader;