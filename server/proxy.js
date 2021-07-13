const express = require('express');
const app = express();
const axios = require('axios');
class Cache {
    cache = {};
    getValue(key) {
        return cache[key];
    }
    setValue(key, val) {
        cache[key] = val;
    }
}
const cache = new Cache();
const TOKEN = '8048c8d1-b607-4400-9f58-c056e247879e';
const headers = {
    'Authorization': `Bearer ${TOKEN}`
}
const config = { headers };
const PORT = 3000;

const baseURL = 'https://nubela.co';

const jobsApiUrl = 'proxycurl/api/v2/linkedin/company/job';
const companyApiUrl = 'proxycurl/api/linkedin/company';

const cors = require('cors');
app.use(cors());

let proccess = false;

const flat = (q) => { 
    let str = [];
    for(const k in  q) {
        if(k && q[k]) {
            str.push(`${k}=${encodeURIComponent(q[k])}`);
        }
    }        
    return str.join('&'); 
}



async function getApiRequest(url) {
    let data = null;
    try {
        data = cache.getValue(url);
        if(!data) {
            const result = await axios(url, config);
            data = result.data;
            cache.setValue(url, data);
        }
        proccess = true;    
        console.log('api success');
    } catch(err) {
        data = err.response?.data;
        console.log('api fail', err);
    } finally {
        proccess = false;
    }
    return data;
}

app.get('/company', async (req, res) => {
    const { query } = req;
    const queryString = flat(query);
    const url = `${baseURL}/${companyApiUrl}?${queryString}`;
    console.log('request[url]: ' + url);
    const result = await getApiRequest(url);
    console.log('request[result]: ', result);
    return res.json(result);
});

app.get('/jobs', async (req, res) => {
    const { query } = req;
    const queryString = flat(query);
    const url = `${baseURL}/${jobsApiUrl}?${queryString}`;
    console.log('request[url]: ' + url);
    const result = await getApiRequest(url);
    console.log('request[result]: ', result);
    return res.json(result);
});

app.listen(PORT, () => console.log('proxy runnign on port ' + PORT));