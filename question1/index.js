const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs for products
const app = express();
const port = 3000;

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const TEST_SERVER_URL = 'http://20.244.56.144/test/companies';

// Function to get top n products for a given company, category, minPrice, and maxPrice
const getTopProducts = async (company, category, top, minPrice, maxPrice) => {
    try {
        const url = `${TEST_SERVER_URL}/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        console.log(`Requesting URL: ${url}`); // Logging the URL

        // Example: Add headers for authentication
        const headers = {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc4OTIwLCJpYXQiOjE3MjA3Nzg2MjAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE1YjljMDBkLTUxMTgtNGIzMC1hNDhmLWNlZWM1NWMxNjAyOSIsInN1YiI6InZpc2hhbC5nbGFfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJHTEEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiYTViOWMwMGQtNTExOC00YjMwLWE0OGYtY2VlYzU1YzE2MDI5IiwiY2xpZW50U2VjcmV0IjoialFidmNIUEdBbGJJaHZ1TCIsIm93bmVyTmFtZSI6IlZpc2hhbCIsIm93bmVyRW1haWwiOiJ2aXNoYWwuZ2xhX2NzMjFAZ2xhLmFjLmluIiwicm9sbE5vIjoiMjExNTAwMTEyNCJ9.GIWofhndIpUZuzT3k6hL9b_jgWrKMupKNMDvtJzRt8E', // Replace with actual token
        };

        const response = await axios.get(url, { headers });
        return response.data.map(product => ({
            ...product,
            id: uuidv4(),
        }));
    } catch (error) {
        console.error(`Error fetching products for ${company}, ${category}:`, error.message);
        throw error;
    }
};


// Endpoint to get top n products for a category
app.get('/categories/:categoryname/products', async (req, res) => {
    try {
        const { categoryname } = req.params;
        const { top = 10, minPrice = 0, maxPrice = 10000, sortBy, order = 'asc', page = 1 } = req.query;

        console.log(`Received request: category=${categoryname}, top=${top}, minPrice=${minPrice}, maxPrice=${maxPrice}, sortBy=${sortBy}, order=${order}, page=${page}`);

        if (!categories.includes(categoryname)) {
            console.log(`Invalid category: ${categoryname}`);
            return res.status(400).json({ error: 'Invalid category' });
        }

        let allProducts = [];
        for (const company of companies) {
            const products = await getTopProducts(company, categoryname, top, minPrice, maxPrice);
            allProducts = allProducts.concat(products);
        }

        // Sorting
        if (sortBy) {
            allProducts.sort((a, b) => {
                if (order === 'asc') {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                } else {
                    return a[sortBy] < b[sortBy] ? 1 : -1;
                }
            });
        }

        // Pagination
        const pageSize = parseInt(top, 10);
        const totalProducts = allProducts.length;
        const totalPages = Math.ceil(totalProducts / pageSize);
        const currentPage = Math.min(Math.max(parseInt(page, 10), 1), totalPages);
        const paginatedProducts = allProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        res.json({
            products: paginatedProducts,
            page: currentPage,
            totalPages,
            totalProducts,
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get details of a specific product
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    try {
        const { categoryname, productid } = req.params;

        console.log(`Received request for product details: category=${categoryname}, productid=${productid}`);

        const productDetails = await getTopProducts(categoryname).find(product => product.id === productid);

        if (!productDetails) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(productDetails);
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
