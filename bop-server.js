import express from 'express';
import * as bopLookup from './bop-lookup.js';

process.env.NODE_ENV = 'production';

const ERROR_OBJ = { msg: 'Sorry, there was an error.' };

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.get('/graphql', async (req,res) => {
    if (req.query.query) {
        console.log(req.query.query);
        const returnObj = await bopLookup.lookup(req.query.query);
        res.send(JSON.stringify(returnObj));
    } else {
        res.send(JSON.stringify(ERROR_OBJ));
    }
});

/*
    Example queries:
    const usExportsQuery = `{ capitalAccount(country: "USKey") { exports { realEstate { value }, treasuries { value }, privateEquity { value }, privateDebt { value } } }, currentAccount(country: "USKey") { exports { goods { value }, services { value } } } }`;
    const usImportsQuery = `{ capitalAccount(country: "USKey") { imports { realEstate { value }, treasuries { value }, privateEquity { value }, privateDebt { value } } }, currentAccount(country: "USKey") { imports { goods { value }, services { value } } } }`;
    const caExportsQuery = `{ capitalAccount(country: "CAKey") { exports { realEstate { value }, treasuries { value }, privateEquity { value }, privateDebt { value } } }, currentAccount(country: "CAKey") { exports { goods { value }, services { value } } } }`;
    const caImportsQuery = `{ capitalAccount(country: "CAKey") { imports { realEstate { value }, treasuries { value }, privateEquity { value }, privateDebt { value } } }, currentAccount(country: "CAKey") { imports { goods { value }, services { value } } } }`;
    const usSomeCalculation = `{ currentAccount(country: "USKey") { imports { goods { someCalculation } } } }`;
    const caSomeCalculation = `{ currentAccount(country: "CAKey") { imports { goods { someCalculation } } } }`;

    Example URL:
    http://localhost:3000/graphql?query={ currentAccount(country: "CAKey") { imports { goods { someCalculation } } } }
*/
