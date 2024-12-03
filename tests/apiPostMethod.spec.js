const { test, expect} = require('@playwright/test')
const { request } = require('http')

test('Should be able to create a new post', async({request}) => {

    //Construct the data
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    const postContent = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    const options = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        data: postContent
    }
    //Send a POST request
    const response = await request.post(url, options);
    const responseBody = await response.json();
    //Print out the response content
    console.log(response.status());
    console.log(responseBody);
    //Verification
    expect(response.status()).toBe(201);
    const {title, body, userId, id} = responseBody;
    expect(title).toBe(postContent.title);
    expect(body).toBe(postContent.body);
    expect(userId).toBe(postContent.userId);
    expect(id).toBeTruthy();

} )