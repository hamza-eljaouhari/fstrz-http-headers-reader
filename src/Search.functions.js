const axios = require('axios');

async function fetchHttpHeaders(url){
    return await axios.post('http://localhost:3000', {
        "url": url
    })
};

function handleChange(e) {
    this.setState({ url: e.target.value });
};

function onSubmit(e, url){
    e.preventDefault();
    this.fetchHttpHeaders(url)
        .then((response) => {
            var now = new Date();
            var link = response.data;
            link.url = url;
            link.date = String(now.getDate()).padStart(2, '0')    + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear() 
            this.props.onDataRetrieval(link)

            this.setState({
                url: ''
            })
        })
        .catch((error) => {
            console.log(error);
        })
}


const functions = {
    fetchHttpHeaders,
    handleChange,
    onSubmit
}

export default functions