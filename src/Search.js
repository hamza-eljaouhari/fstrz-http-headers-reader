import React from 'react';
import SearchFunctions from './Search.functions'
import './Search.css';

export default class Search extends React.Component { 
    constructor(props) {
        super(props);
        this.fetchHttpHeaders = SearchFunctions.fetchHttpHeaders.bind(this);
        this.handleChange = SearchFunctions.handleChange.bind(this);
        this.onSubmit = SearchFunctions.onSubmit.bind(this);
        this.state = {
            url: ''
        }
    }

    render(){
        return (
            <section>
                <div className="Title-Container">
                    <div className="Square-Border-Radius"></div>
                    <div className="Header-Title">
                        <h1>HEADER DEBUGGER</h1>
                    </div>
                </div>

                <div className="Search-Container">
                    <form onSubmit={(e) => this.onSubmit(e, this.state.url)} className="Searchbar-Container">
                        <label>
                            Url to check
                        </label>
                        <input className="Query" value={this.state.url} onChange={this.handleChange} type="text"></input>
                        <button type="submit">LAUNCH ANALYSIS</button>
                    </form>
                </div>
            </section>
        );
    }
};