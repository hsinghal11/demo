const axios = require('axios');

const getAuthToken = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/auth', {
            companyName: "GLA University",
            clientID: "a5b9c00d-5118-4b30-a48f-ceec55c16029", // Replace with the actual clientID from the registration response
            clientSecret: "jQbvcHPGAlbIhvuL", // Replace with the actual clientSecret from the registration response
            ownerName: "Vishal",
            ownerEmail: "vishal.gla_cs21@gla.ac.in",
            rollNo: "2115001124"
        });

        console.log('Authorization Token:', response.data);
    } catch (error) {
        console.error('Error obtaining auth token:', error.response ? error.response.data : error.message);
    }
};

getAuthToken();

// Authorization Token: {
//     token_type: 'Bearer',
//     access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc4OTIwLCJpYXQiOjE3MjA3Nzg2MjAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE1YjljMDBkLTUxMTgtNGIzMC1hNDhmLWNlZWM1NWMxNjAyOSIsInN1YiI6InZpc2hhbC5nbGFfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJHTEEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiYTViOWMwMGQtNTExOC00YjMwLWE0OGYtY2VlYzU1YzE2MDI5IiwiY2xpZW50U2VjcmV0IjoialFidmNIUEdBbGJJaHZ1TCIsIm93bmVyTmFtZSI6IlZpc2hhbCIsIm93bmVyRW1haWwiOiJ2aXNoYWwuZ2xhX2NzMjFAZ2xhLmFjLmluIiwicm9sbE5vIjoiMjExNTAwMTEyNCJ9.GIWofhndIpUZuzT3k6hL9b_jgWrKMupKNMDvtJzRt8E',
//     expires_in: 1720774846
//   }
