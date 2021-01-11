const axios = require('axios');
const errors = require('./config/errors.json')

async function fetchHttpHeaders(url){
    return await axios.post('http://localhost:3000', {
        "url": url
    })
};

function handleChange(e) {
    this.setState({ urls: e.target.value.split(',') });
};
 
function validateURL(url){
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    var regex = new RegExp(urlPattern);
  
    if (!url.match(regex)) {
        return false;
    }

    return true;
}

function submitMultiple(e, urls){
    e.preventDefault();

    urls.forEach((url, index) => {
        if(!this.validateURL(url)){
            this.props.onError({
                id: (new Date()).getTime() + index,  
                data: errors['invalid-url'].message + ' ' + url
            })

            urls.splice(index, 1);
        }
    })
    
    const loadingSettingsUrls = urls.map((url, index) => {
        return {
            id: (new Date()).getTime() + index,
            url: url
        }
    });

    urls.forEach((url, index) => {
        this.props.onLoading(loadingSettingsUrls);
        this.onSubmit(url, index, loadingSettingsUrls);
    })
}

async function onSubmit(url, index, mappedUrls){

    this.fetchHttpHeaders(url)
        .then((response) => {
            var now = new Date();
            var link = response.data;
            link.url = url;
            link.date = String(now.getDate()).padStart(2, '0')    + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear() 
            
            this.props.onDataRetrieval(link)
        })
        .catch((error) => {
            if(error.response){
                if(error.response.status === 404){
                    this.props.onError({
                        id: mappedUrls[index].id,  
                        data: errors['not-found']
                    })
                }
            }
        }).finally(() => {
            this.props.onLoaded({
                id: mappedUrls[index].id
            })
            
            this.setState({
                urls: []
            })
        })
}


const functions = {
    fetchHttpHeaders,
    handleChange,
    onSubmit,
    validateURL,
    submitMultiple
}

export default functions