const stock = {
    bottle: "20",
    socks: "20",
    shirt: {
        small: "20",
        medium: "20",
        large: "20",
        xlarge: "20",
    },
};

const customers = [{
        givenName: "Rick",
        surname: "Sanchez",
        email: "rick@sanchez.com",
        address: "123 Main Street",
        city: "Montreal",
        province: "Quebec",
        postcode: "H8H 1H1",
        country: "Canada",
    },
    {
        givenName: "John",
        surname: "Doe",
        email: "some@amnesia.net",
        address: "932 Avenue Unknown",
        city: "Vancouver",
        province: "British Columbia",
        postcode: "M5C 2E4",
        country: "Canada",
    },
];

module.exports = { stock, customers };