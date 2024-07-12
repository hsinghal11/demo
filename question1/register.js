const axios = require('axios');

const registerCompany = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName: "GLA University",
            ownerName: "Vishal",
            rollNo: "2115001124",
            ownerEmail: "vishal.gla_cs21@gla.ac.in",
            accessCode: "lIntgp"
        });

        console.log('Registration Response:', response.data);
    } catch (error) {
        console.error('Error registering company:', error.response ? error.response.data : error.message);
    }
};

registerCompany();

// Registration Response: {
//   companyName: 'GLA University',
//   clientID: 'a5b9c00d-5118-4b30-a48f-ceec55c16029',
//   clientSecret: 'jQbvcHPGAlbIhvuL',
//   ownerName: 'Vishal',
//   ownerEmail: 'vishal.gla_cs21@gla.ac.in',
//   rollNo: '2115001124'
// }
