import React from 'react';
import './History.css';
import Cloud from './icons/Cloud'

function TableTitle(){
    return (
        <div className="Title-Container">
            <div className="Square-Border-Radius"></div>
            <div className="Header-Title">
                <h4>HISTORY</h4>
            </div>
        </div>
    );
}

export default class History extends React.Component { 
    constructor(props) {
        super(props);

        this.isGreen.bind(this);
        this.isOrange.bind(this);
        this.isRed.bind(this);
        this.state = {
            headings: [
                "Date",
                "URL",
                "Status",
                "Flags",
                "Cloudfront Status",
                "Cloudfront pop"
            ]
        };
    }

    componentDidMount(){
    }

    isGreen(link){
        console.log("test", link.plugged === true && link.fstrzFlags.includes('optimisée'))
        return link.plugged === true && link.fstrzFlags.includes('optimisée');
    }

    isRed(link){
        return link.plugged === true && !link.fstrzFlags.includes('optimisée');
    }

    isOrange(link){
        return link.plugged === false;
    }
    
    getColorFill(link){
        if(link.plugged){
            if(link.fstrzFlags.includes('optimisée')){
                return '#00ff00';
            }else{
                return '#ffa500';
            }
        }

        return '#ff0000';
    }

    render(){

        const headings = this.state.headings.map((heading) => <th key={heading}>{ heading }</th>);

        const rows = this.props.links.map((link) => {
               return (
                    <tr key={link.url}>
                        <td>{link.date}</td>
                        <td>{link.url}</td>
                        <td>
                            { 
                                <Cloud colorFill={ this.getColorFill(link) }></Cloud>
                            }
                        </td>
                        <td>
                            { 
                                link.fstrzFlags.map((flag => {
                                    return <span className="Tag" key={flag}>{flag}</span>
                                }))
                            }
                        </td>
                        <td>{link.cloudFrontStatus}</td>
                        <td>{link.cloudFrontPOP}</td>
                    </tr> 
                )
            });

        return (
            <section>
                <TableTitle></TableTitle>
                <div id="Table-Container">
                    <table>
                        <thead>
                            <tr>
                                { headings }
                            </tr>
                        </thead>
                        <tbody>
                            { rows }
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
};