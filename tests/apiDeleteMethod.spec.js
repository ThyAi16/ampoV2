const { test, expect} = require('@playwright/test');
const exp = require('constants');

test('Should be able to send a Delete request', async({request}) => {
    //Construct the data
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    
    //Send DELETE request
    const response = await request.delete(url);
    console.log(response.status());
    const bodyJson = await response.json();
    console.log(bodyJson);

    //Verify the response
    expect(response.status()).toBe(200);
})