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
  // const [timeoutErrorsInterval, setTimeoutErrorInterval] = useState(-1);

  useEffect(() => {
    var localStorageLinks = localStorage.getItem('links');
    var setting = localStorageLinks?.length > 0 ? JSON.parse(localStorageLinks) : [];
    setLinks(setting);

  }, []);

  // useEffect(() => {
  //   if(errors.length === 0){
  //     clearInterval(timeoutErrorsInterval)
  //     setTimeoutErrorInterval(-1);
  //   } else {

  //     if(timeoutErrorsInterval === -1){
  //       var intervalId = setInterval(function(){
  //         const cleanedErrors = errors.filter(function(err){
  //           return (new Date()).getTime() - err.id < 2500;
  //         })

  //         setErrors(cleanedErrors)
          
  //         console.log("interval")
  //       }, 2500)

  //       setTimeoutErrorInterval(intervalId);
  //     }
  //   }

  //   console.log(intervalId);
  // }, [errors, timeoutErrorsInterval]);

  function onDataRetrieval(link){
    var newLinks = [link, ...links]; 
    setLinks(newLinks);
    localStorage.setItem('links', JSON.stringify(newLinks));
  }

  function onLoading(data){
    const newLoadingLinks = [...data, ...loadingLinks]
    setLoadingLinks(newLoadingLinks);
  }

  function onLoaded(data){

    console.log("loadingLinks on Loaded", loadingLinks  )
    const cleanedLinks = loadingLinks.filter(function(element){
      return element.id !== data.id;
    });

    setLoadingLinks(cleanedLinks);
  }

  function onError(error){
    const newErrors = [error, ...errors];

    setErrors(newErrors);
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
        <section className="Body-Container">
          <Search 
              className="App-Search"
              onDataRetrieval={onDataRetrieval}
              onLoading={onLoading}
              onLoaded={onLoaded}
              onError={onError}
              ></Search>
          { links.length > 0 &&
            <History key={links.length + '-History'} links={links} className="App-History" ></History>
          }
          { loadingLinks.length > 0 && 
            <LoadingBox key={loadingLinks.length + '-Loading-Box'} links={loadingLinks}></LoadingBox>
          }
        </section>
      </section> 
    </div>
  );
}

export default App;
