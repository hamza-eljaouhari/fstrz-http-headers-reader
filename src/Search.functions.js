const axios = require('axios');
const errors = require('./config/errors.json')

async function fetchHttpHeaders(url){
    return await axios.post('http://localhost:3000', {
        "url": url
    })
};

function handleChange(e) {
    this.setState({ url: e.target.value });
};

function validateURL(url){
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    var regex = new RegExp(urlPattern);
  
    if (!url.match(regex)) {
        return false;
    }

    return true;
}

async function onSubmit(e, url){
    e.preventDefault();
    var timestamp = (new Date()).getTime();

    if(!this.validateURL(url)){
        this.props.onError({
            id: timestamp,  
            data: errors['invalid-url']
        })
        return false;
    }

    this.props.onLoading({
        id: timestamp,
        url: url, 
        loading: true
    });

    this.setState({
        url: ''
    })

    this.fetchHttpHeaders(url)
        .then((response) => {
            var now = new Date();
            var link = response.data;
            link.url = url;
            link.date = String(now.getDate()).padStart(2, '0')    + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear() 
            
            this.props.onDataRetrieval(link)
            this.props.onLoaded({
                id: timestamp
            })
        })
        .catch((error) => {
            console.log(error);
        })
}


const functions = {
    fetchHttpHeaders,
    handleChange,
    onSubmit,
    validateURL
}

export default functions