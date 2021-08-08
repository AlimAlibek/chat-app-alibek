import "./header-item.css"

function HeaderItem(props) {
    return (
        <div className={`header-item header-item_${props.position}`}>
            <div className="header-item__ring"></div>
            <div className="header-item__body" >
                <div className="header-item__top"></div>
                {
                    props.children        
                }
            </div>
        </div>
    )
}

export default HeaderItem;