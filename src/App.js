import './App.css';
import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar'
import Header from './Header'
import Search from './Search'
import History from './History'
import LoadingBox from './LoadingBox'
import ErrorBox from './ErrorBox'

function App() {


  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    var localStorageLinks = localStorage.getItem('links');
    var setting = localStorageLinks?.length > 0 ? JSON.parse(localStorageLinks) : [];
    setLinks(setting);
  }, []);
  
  function onError(error){
    const newErrors = [error, ...errors];
    setErrors(newErrors);
  }

  function onDataRetrieval(link){
    var newLinks = [link, ...links]; 
    setLinks(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks));
  }

  function onLoading(data){
    const newLoadingLinks = [data, ...loadingLinks]
    setLoadingLinks(newLoadingLinks);
  }

  function onLoaded(data){

    console.log("loadingLinks on Loaded", loadingLinks  )
    const cleanedLinks = loadingLinks.filter(function(element){
      return element.id !== data.id;
    });

    setLoadingLinks(cleanedLinks);
  }

  function onDeleteError(id){
    var cleanedErrors = errors.filter((error) => {
      return error.id !== id;
    });

    setErrors(cleanedErrors);
  }

  return (
    <div className="App">
      <section className="First-Column">
        <Sidebar className="App-Sidebar"></Sidebar>
      </section>
      <section className="Second-Column">
        <Header className="App-Header"></Header>
        {
          errors.length > 0 && 
          <ErrorBox 
            key={errors.length} 
            errors={errors}
            onDeleteError={onDeleteError}
            ></ErrorBox>
        }
        <Search 
            className="App-Search"
            onDataRetrieval={onDataRetrieval}
            onLoading={onLoading}
            onLoaded={onLoaded}
            onError={onError}
            ></Search>

        { loadingLinks.length > 0 && 
          <LoadingBox key={loadingLinks.length + '-Loading-Box'} links={loadingLinks}></LoadingBox>
        }
        { links.length > 0 &&
          <History key={links.length + '-History'} links={links} className="App-History" ></History>
        }
        
      </section> 
    </div>
  );
}

export default App;
