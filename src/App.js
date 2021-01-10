import './App.css';
import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar'
import Header from './Header'
import Search from './Search'
import History from './History'

function App() {


  const [links, setLinks] = useState([]);

  useEffect(() => {
    var localStorageLinks = localStorage.getItem('links');
    var setting = localStorageLinks?.length > 0 ? JSON.parse(localStorageLinks) : [];
    setLinks(setting);
  }, []);
  
  function onDataRetrieval(link){
    var newLinks = [link, ...links]; 
    setLinks(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks));
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

            { links.length }
        { links.length > 0 &&
          <History key={links.length} links={links} className="App-History" ></History>
        }
      </section> 
    </div>
  );
}

export default App;
