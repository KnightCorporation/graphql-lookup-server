const m = 1000000;

export const US = 'USKey'; // United States
export const CA = 'CAKey'; // Canada

export const bopData = {};

bopData[US] = {
    capitalAccount: {
        exports: { // capital trade surplus $3 million
            realEstate: {
                value: 1 * m // $1 million
            },
            treasuries: {
                value: 1 * m
            },
            privateEquity: {
                value: 3 * m
            },
            privateDebt: {
                value: 2 * m
            }
        },
        imports: {
            realEstate: {
                value: 1 * m // $1 million
            },
            treasuries: {
                value: 1 * m
            },
            privateEquity: {
                value: 1 * m
            },
            privateDebt: {
                value: 1 * m
            }
        }
    },
    currentAccount: {
        exports: { // current trade deficit $3 million
            goods: {
                value: 10 * m
            },
            services: {
                value: 40 * m
            }
        },
        imports: {
            goods: {
                value: 50 * m
            },
            services: {
                value: 3 * m
            }
        }
    }
};

bopData[CA] = {
    capitalAccount: {
        exports: {
            realEstate: {
                value: 0.5 * m // $500,000
            },
            treasuries: {
                value: 0.5 * m
            },
            privateEquity: {
                value: 1.5 * m
            },
            privateDebt: {
                value: 1 * m
            }
        },
        imports: {
            realEstate: {
                value: 0.5 * m // $500,000
            },
            treasuries: {
                value: 0.5 * m
            },
            privateEquity: {
                value: 0.5 * m
            },
            privateDebt: {
                value: 0.5 * m
            }
        }
    },
    currentAccount: {
        exports: {
            goods: {
                value: 5 * m
            },
            services: {
                value: 10 * m
            }
        },
        imports: {
            goods: {
                value: 25 * m
            },
            services: {
                value: 1.5 * m
            }
        }
    }
}