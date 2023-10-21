export const currencyToString = (currency) => {
    switch(currency) {
        case CURRENCIES.USD:
            return 'United States Dollar';
        case CURRENCIES.AUD:
            return 'Australian Dollar';
        case CURRENCIES.GBP:
            return 'British Pound Sterling';
        case CURRENCIES.BTC:
            return 'Bitcoin';
        case CURRENCIES.CNY:
            return 'Chinese Renminbi';
        case CURRENCIES.CAD:
            return 'Canadian Dollar';
        case CURRENCIES.JPY:
            return 'Japanese Yen';
        case CURRENCIES.SGD:
            return 'Signapore Dollar';
        default:
            return 'United States Dollar';
    }
}

export const NAVIGATE = {
    ADD: 'add-invoice',
    EDIT: 'edit-invoice',
    VIEW: 'view-invoice',
    DEFAULT: '/'
}

export const CURRENCIES = {
    USD: '$',
    GBP: '£',
    JPY: '¥',
    CAD: "$",
    AUD: "$",
    SGD: "$",
    CNY: '¥',
    BTC: '₿',
}
