const axios = require('axios');

// Function to make an API call with a retry mechanism
const makeApiCallWithRetry = async (url, options, maxRetries = 3) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await axios(url, options);
      return response.data; // Return data if the request is successful
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error.message);
      retries++;
      await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff or linear delay
    }
  }
  throw new Error('Exceeded maximum retries'); // Throw an error after exhausting retries
};

// Function to throttle API calls
const throttleApiCalls = async (apiFunction, delay, maxRequests) => {
  let requestCount = 0;
  const makeRequest = async () => {
    if (requestCount < maxRequests) {
      requestCount++;
      await apiFunction();
      setTimeout(makeRequest, delay);
    }
  };
  makeRequest();
};

// Sample API function to call
const sampleApiFunction = async () => {
  const url = 'https://api.example.com/data';
  const options = { method: 'GET' };
  try {
    const data = await makeApiCallWithRetry(url, options);
    console.log('API Response:', data);
  } catch (error) {
    console.error('Error making API call:', error.message);
  }
};

// Throttle API calls to execute every 3 seconds (3000ms), limited to 5 requests
throttleApiCalls(sampleApiFunction, 3000, 5);
