import "./header.css"
import Crossbar from "./crossbar/crossbar"
import HeaderItems from "./header-items/HeaderItems"

function Header() {
    return (
        <div className="header">
            <Crossbar />
            <HeaderItems />
        </div>
    )
}

export default Header;