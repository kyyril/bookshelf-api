// This file serves as the main entry point for Vercel
const server = require('./src/server');

module.exports = async (req, res) => {
  const hapiServer = await server();
  
  // Process the request through Hapi
  const options = {
    method: req.method,
    url: req.url,
    payload: req.body,
    headers: req.headers,
    validate: false,
  };

  const response = await hapiServer.inject(options);
  
  // Set the status code
  res.statusCode = response.statusCode;
  
  // Set the headers
  Object.entries(response.headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  // Send the response
  res.end(response.payload);
};