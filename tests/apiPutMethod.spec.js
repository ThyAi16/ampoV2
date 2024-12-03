const { test, expect} = require('@playwright/test');
const { url } = require('inspector');

test('', async({request}) => {
    //Construct data
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const postContent = {
        title: 'This is a foot',
        id: 1,
        body: 'This is a Body',
        userId: 1,
    }
    const options = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        data: postContent
    }

    //Send PUT request
    const response = await request.put(url, options);
    //Method 1: Console.log for Status
    //console.log(response.status());
    //Method 2: Console.log for Status
    const status = response.status();

    const bodyJson = await response.json();
    console.log(bodyJson);
    
    //Verification
    //expect(response.status()).toBe(200);
    const {id, title, body, userId} = bodyJson;
    expect(id).toBe(postContent.id);
    expect(userId).toBe(postContent.userId);
    expect(body).toBe(postContent.body);
    expect(title).toBe(postContent.title);
    expect(status).toBe(200);
})