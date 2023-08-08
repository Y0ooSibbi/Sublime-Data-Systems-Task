# Node.js Customer Management REST API

This repository contains a simple Node.js REST API for managing customer data. The API allows you to list customers, retrieve individual customer information, list cities with customer counts, add customers with validations, and more.

## Features

- List customers with search by first name, last name, and city with pagination.
- Retrieve a single customer's data by their ID.
- List all unique cities with the number of customers from each city.
- Add a new customer with validations for required fields and existing city/company.
- (Optional) Update customer attributes and delete customers.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/customer-api.git
Install dependencies:

bash
 
npm install
Modify customers.js with your customer data or integrate with your preferred database.

Start the server:

bash
 
npm start
Access the API endpoints as documented below.

API Endpoints
List Customers
Retrieve a list of customers with optional filters and pagination.

bash
 
GET /customers?first_name=&last_name=&city=&page=&limit=
Get Customer by ID
Retrieve a single customer's data by their ID.

bash
 
GET /customers/:id
List Cities
List all unique cities with the number of customers from each city.

bash
 
GET /cities
Add Customer
Add a new customer with required fields and validations.

bash
 
POST /customers
Request Body:

json
 
{
  "first_name": "John",
  "last_name": "Doe",
  "city": "New York",
  "company": "ACME Inc."
}
(Optional) Update and Delete Customer
You can implement and document these endpoints if needed.

Problem Solving
Two additional problem-solving questions are included:

Convert a sentence to camel case string.
Check if you can reach the last index of an array based on jump lengths.
Contributions
Feel free to contribute by opening issues or submitting pull requests. Let's make this API even better together!

Credits
This project was created by Alpesh Vaghela. You can reach me at alpesh57678@gmail.com.
