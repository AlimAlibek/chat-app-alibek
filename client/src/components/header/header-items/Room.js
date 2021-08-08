import HeaderItem from "./HeaderItem"

function Room({room, participants, onClick}) {
    return (
        <HeaderItem position={room}>
            <div className="header-item__content" onClick={() => onClick(room)}>
                <div>Комната{room}</div>
                <small>участники-{participants}</small>
            </div>
        </HeaderItem>
    )
}

export default Room;