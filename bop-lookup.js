import {
    graphql,
    buildSchema
} from 'graphql';
import * as data from './data.js';

const bopSchema = buildSchema(`
    type Query {
        capitalAccount(country: String!): CapitalAccount!
        currentAccount(country: String!): CurrentAccount!
    }

    type CapitalAccount {
        exports: CapitalTradeComponents!
        imports: CapitalTradeComponents!
    }

    type CurrentAccount {
        exports: CurrentTradeComponents!
        imports: CurrentTradeComponents!
    }

    type CapitalTradeComponents {
        realEstate: TradeComponent!
        treasuries: TradeComponent!
        privateEquity: TradeComponent!
        privateDebt: TradeComponent!
    }

    type CurrentTradeComponents {
        goods: TradeComponent!
        services: TradeComponent!
    }

    type TradeComponent {
        value: Int!
        someCalculation: String!
    }
`);

class CapitalAccount {
    constructor(capitalAccountObj) {

        const exports = capitalAccountObj.exports;
        this.e = new CapitalTradeComponents(exports.realEstate,
            exports.treasuries,
            exports.privateEquity,
            exports.privateDebt);

        const imports = capitalAccountObj.imports;
        this.i = new CapitalTradeComponents(imports.realEstate,
            imports.treasuries,
            imports.privateEquity,
            imports.privateDebt);
    }

    exports = () => this.e;
    imports = () => this.i;
}

class CurrentAccount {
    constructor(currentAccountObj) {
        const exports = currentAccountObj.exports;
        this.e = new CurrentTradeComponents(exports.goods,
            exports.services);

        const imports = currentAccountObj.imports;
        this.i = new CurrentTradeComponents(imports.goods,
            imports.services);
    }

    exports = () => this.e;
    imports = () => this.i;
}

class CapitalTradeComponents {
    constructor(realEstate,
        treasuries,
        privateEquity,
        privateDebt) {
      this.re = new TradeComponent(realEstate.value);
      this.t = new TradeComponent(treasuries.value);
      this.pw = new TradeComponent(privateEquity.value);
      this.pd = new TradeComponent(privateDebt.value);
    }
  
    realEstate = () => this.re;
    treasuries = () => this.t;
    privateEquity = () => this.pw;
    privateDebt = () => this.pd;
}

class CurrentTradeComponents {
    constructor(goods, services) {
        this.g = new TradeComponent(goods.value);
        this.s = new TradeComponent(services.value);
    }
  
    goods = () => this.g;
    services = () => this.s;
}

class TradeComponent {
    constructor(value) {
      this.v = value;
    }
  
    value() {
      return this.v;
    }

    someCalculation() {
        return 'Put some calculation here that does work on the server and returns a primitive.';
    }
}

const root = {
    capitalAccount: args => {
        return new CapitalAccount(data.bopData[args.country].capitalAccount);
    },
    currentAccount: args => {
        return new CurrentAccount(data.bopData[args.country].currentAccount);
    }
};

export const lookup = async (query) => {
    const ERROR_OBJ = { msg: 'Sorry, there was an error.' };
    return await graphql(bopSchema, query, root).then((result) => {
        if (!result.errors) {
            return result.data;
        } else {
            result.errors.forEach((error) => {
                console.log(error);
            });
            return ERROR_OBJ;
        }
    });
};
