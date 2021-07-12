const express = require('express');
const app = express();
const axios = require('axios');

const Authorization = { Bearer: '8048c8d1-b607-4400-9f58-c056e247879e' }
const headers = {
    'Authorization': `Bearer ${Authorization.Bearer}`
}

const PORT = 3000;
const baseURL = 'https://nubela.co/proxycurl/api/linkedin/company';

const cors = require('cors');
app.use(cors());
let proccess = false;

const { setup } = require('axios-cache-adapter');

// Create `axios` instance passing the newly created `cache.adapter`
const api = setup({
    // `axios` options
    baseURL,
    // `axios-cache-adapter` options
    cache: {
      maxAge: 15 * 60 * 1000
    }
  })

app.get('/*', async (req, res) => {
    
    if(proccess) {
        console.log('in process...');
        return res.json({ msg: 'in process' });
    }
    
    proccess = true;
    
    const { path, query } = req;
    
    const queryString = ((q) => { 
        let str = [];
        for(const k in  q) {
            if(k && q[k]) {
                str.push(`${k}=${q[k]}`);
            }
        }        
        return str.join('&'); 
    })(query);
    
    const url = `${baseURL}${path}?${queryString}`;
    console.log(`[get] ${url}`);

    api.get('/resolve?' + queryString, { headers })
    .then(async (response) => {
        // Do something awesome with response.data \o/
        console.log('Request response:', response.data)
      
        // Interacting with the store, see `localForage` API.
        const length = await api.cache.length()
      
        console.log('Cache store length:', length)
        const { data } = response;
        
        proccess = false;
        res.json(data); 
      }).catch(err => {
          const { data } = err.response;
          res.json(data);
          proccess = false;
          console.log('catch: ', data);
      });

/*

    api.get(url, {
        headers: {
            'Authorization': `Bearer ${Authorization.Bearer}`
        }
    })
    .then(result => { 
        const { data } = result;
        console.log('then: ', data); 
        proccess = false;
        res.json(data); 
    })
    .catch(err => { 
        const { data } = err.response || {};
        console.log('catch: ', data); 
        proccess = false;
        res.json(data);
    });

    */
});

app.listen(PORT, () => console.log('proxy runnign:' + PORT));