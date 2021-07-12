const express = require('express');
const app = express();
const axios = require('axios');
const Authorization = { Bearer: '8048c8d1-b607-4400-9f58-c056e247879e' }
const PORT = 3000;
const baseUrl = 'https://nubela.co/proxycurl/api/linkedin/company';

app.get('/*', async (req, res) => {
    const { path, query } = req;
    
    const queryString = ((q) => { 
        let str = ''; 
        return str; 
    })(query);
    
    const url = `${baseUrl}${path}?${queryString}`;
    const result = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${Authorization.Bearer}`
        }
    });
    
   return res.json(result.data);
});

app.listen(PORT, () => console.log('proxy runnign:' + PORT));