import "./error.css";
import { useSelector, useDispatch } from "react-redux";
import { throwError } from "../../redux/action/actions";

import ErrorBlock from "./ErrorBlock";

function Error () {
    const error = useSelector(state => state.error.error);
    const dispath = useDispatch();
    const hideError = () => {
        dispath(throwError(""));
    }
    return (

        <ErrorBlock 
            hideError={hideError}
            error={error}
        >
            <div>{error}</div>
        </ErrorBlock>
    )
}
export default Error;