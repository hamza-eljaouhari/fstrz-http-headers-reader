import React from 'react'
import './ErrorBox.css'



function ErrorBox(props){
    return (
        <div className="Error-Box">
            <ul key="ul">
                {
                    props.errors.map((error, index) => {
                        return (
                            <React.Fragment key={error.id + '-Fragment'}>
                                <li className="Error-Message">
                                    {error.data}
                                    <span 
                                    onClick={() => props.onDeleteError(error.id)} 
                                    className="Close-Error-Message">x</span>
                                </li>
                            </React.Fragment>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default ErrorBox