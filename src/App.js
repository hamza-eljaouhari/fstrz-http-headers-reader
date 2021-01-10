import './App.css';
import React, { useState } from 'react';

import Sidebar from './Sidebar'
import Header from './Header'
import Search from './Search'
import History from './History'

function App() {

  const [links, setLinks] = useState([])
  
  function onDataRetrieval(link){
    console.log(link)
    setLinks([link].concat(links))
    var lsLinks = localStorage.getItem('links');
    if(lsLinks !== null){
      localStorage.setItem('links', JSON.parse(lsLinks).push(link))
    }
  }

  return (
    <div className="App">
      <section className="First-Column">
        <Sidebar className="App-Sidebar"></Sidebar>
      </section>
      <section className="Second-Column">
        <Header className="App-Header"></Header>
        <Search 
            className="App-Search"
            onDataRetrieval={onDataRetrieval}
            ></Search>
        { links.length > 0 &&
          <History links={links} className="App-History" ></History>
        }
      </section> 
    </div>
  );
}

export default App;
