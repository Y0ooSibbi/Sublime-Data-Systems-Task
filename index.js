const express = require('express');
const bodyParser = require('body-parser');
const customers = require('./customers'); // Assuming you have customers data in customers.js

const app = express();
app.use(bodyParser.json());

// List API with search and pagination
app.get('/customers', (req, res) => {
  const { first_name, last_name, city, page, limit } = req.query;

  let filteredCustomers = customers;

  if (first_name) {
    filteredCustomers = filteredCustomers.filter(customer => customer.first_name.toLowerCase().includes(first_name.toLowerCase()));
  }

  if (last_name) {
    filteredCustomers = filteredCustomers.filter(customer => customer.last_name.toLowerCase().includes(last_name.toLowerCase()));
  }

  if (city) {
    filteredCustomers = filteredCustomers.filter(customer => customer.city.toLowerCase() === city.toLowerCase());
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  res.json(paginatedCustomers);
});

// Get single customer by ID
app.get('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find(customer => customer.id === customerId);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// List unique cities with number of customers
app.get('/cities', (req, res) => {
  const cityCounts = customers.reduce((cityMap, customer) => {
    cityMap[customer.city] = (cityMap[customer.city] || 0) + 1;
    return cityMap;
  }, {});

  res.json(cityCounts);
});

// Add a customer with validations
app.post('/customers', (req, res) => {
  const newCustomer = req.body;

  if (!newCustomer.first_name || !newCustomer.last_name || !newCustomer.city || !newCustomer.company) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingCity = customers.some(customer => customer.city === newCustomer.city);
  const existingCompany = customers.some(customer => customer.company === newCustomer.company);

  if (!existingCity || !existingCompany) {
    return res.status(400).json({ message: 'City or company does not exist for an existing customer' });
  }

  // Assuming there's a function to generate a new customer ID
  newCustomer.id = generateNewCustomerId();
  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
