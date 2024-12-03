const { test, expect } = require('@playwright/test');
const exp = require('constants');


test('Should be able to send a GET method request bu fetch', async({request}) => {
    let response = await request.fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "get"
    })
    console.log(response.status());
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const responseBody = await response.body();
    console.log(JSON.parse(responseBody));
});
test('Should be able to send a GET method request by get', async({request}) => {
    let response = await request.get('https://jsonplaceholder.typicode.com/posts')

    //Extract response data
    const status = response.status();
    const jsonResponse = await response.json();
    const firstPost = jsonResponse[0];

    console.log(firstPost);
    // {
    //     userId: 1,
    //     id: 1,
    //     title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    //     body: 'quia et suscipit\n' +
    //       'suscipit recusandae consequuntur expedita et cum\n' +
    //       'reprehenderit molestiae ut ut quas totam\n' +
    //       'nostrum rerum est autem sunt rem eveniet architecto'
    //   }

    //Verification
    expect(status).toBe(200);
    expect(jsonResponse.length).toBeGreaterThan(99);
    const {userId, id, title, body} = firstPost;
    expect(userId).toBe(1);
    expect(id).toBe(1);
    expect(title).toBeTruthy();// not null
    expect(body).toBeTruthy();//null, defined,...: toBeFalsy()

    //Get random 1 value
    //let randomIndex = Math.floor(Math.random() * jsonResponse.length)
});

test('Should be able to send a POST method request for Ampo', async({request}) => {
    let responseAmpo = await request.fetch('https://staging.ampo.vn/graphql', {
        method: 'post'
    })
    const jsonResponse = await responseAmpo.json();
    console.log(jsonResponse);
})