
function ErrorBlock ({ error, hideError, children}) {
   
    return (
        <div className={`error-block ${error && "error-shown"} `}>
            <div className="error-rod">
                <div className={`error-rod__ball`} onClick={hideError}/>
            </div>
            <div className="error-ring ring" />
            
            <div className="error-block__body">
                <div className="error-block__top">
                    <div className="error-block__hole" />
                </div>
                <div className="error-block__content">
                    {children} 
                </div>
            </div>
        </div>
    )
}

export default ErrorBlock;
