const express = require('express');
const app = express();
const axios = require('axios');

const TOKEN = '8048c8d1-b607-4400-9f58-c056e247879e';
const headers = {
    'Authorization': `Bearer ${TOKEN}`
}

const PORT = 3000;
const baseURL = 'https://nubela.co/proxycurl/api/linkedin/company';

const cors = require('cors');
app.use(cors());

let proccess = false;

const flat = (q) => { 
    let str = [];
    for(const k in  q) {
        if(k && q[k]) {
            str.push(`${k}=${q[k]}`);
        }
    }        
    return str.join('&'); 
}

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

app.get('/*', async (req, res) => {
    
    if(proccess) {
        console.log('in process...');
        return res.json({ msg: 'in process' });
    }    
    proccess = true;
    
    const { path, query } = req;
    const config = { headers };
    if(query.url) {
        query.url = encodeURIComponent(query.url);
    }
    const queryString = flat(query);
    const url = `${baseURL}${path.replace('/', '')}?${queryString}`;
    console.log(`[get] ${url}`);
    let data = null;
    try {

        data = cache.getValue(url);

        if(!data) {
            const apiResponse = await axios.get(url, config);
            data = apiResponse.data;
            cache.setValue(url, data);
        }

        res.json(data);


    } catch(err) {
        data = err.response.data;
        res.json(data);
    } finally {
        proccess = false;
        console.log('done: ', data);
        console.log('cache', cache);
    }

});

app.listen(PORT, () => console.log('proxy runnign on port ' + PORT));