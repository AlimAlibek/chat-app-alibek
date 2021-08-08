import { useEffect, useRef } from "react";

function MessageCard({message, own}) {
    const liRef = useRef("li");
    useEffect(() => {
      liRef.current.scrollIntoView({behavior: 'smooth'})
    }, []);

    return (
        <li className={`message-card ${own && "own-message"}`} ref={liRef}>
            
          <div>
            <div className="message-card__avatar">
                <img src={message.authorAvatar} alt="ava" />
            </div>
            <div className="message-card__right-block">
                <div className="message-card__author" >{message.author}</div>
                { 
                  message.image && 
                    <div className="message-card__image">
                      <img src={message.image} alt="fileImg"/>
                    </div> 
                }
                <div className="message-card__text" > {message.text} </div>
            </div>
          </div>
            
        </li>
    )
}

export default MessageCard;