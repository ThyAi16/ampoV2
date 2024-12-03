/*Get authen token > Create order > Read order details > Update order > Delete Order || CRUD*/
const {test, expect} = require('@playwright/test');
test('Should be able to perform CRUD on post type', async({request}) => {
    //Construct
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const postContent = {
        title: 'foot',
        body: 'bar',
        userId: 1,
    }
    const putContent = {
        title: 'This is a foot',
        id: 1,
        body: 'This is a Body',
        userId: 100,
    }
    const headers = {
        'Content-type': 'application/json; charset=UTF-8'
    }
    const postOptions = {
        headers: headers,
        data: postContent

    }
    const putOptions = {
        headers: headers,
        data: putContent

    }

    //Create a post
    const postResponse = await request.post(baseUrl + '/posts', postOptions);
    const postJsonBody = await postResponse.json();
    //const postId = postJsonBody.id;//101
    let postId = postJsonBody.id;
    postId = Number(postId) - 1;//100
    // TODO: Verification

    //Reuse the post ID to read the details
    const getResponse = await request.get(`${baseUrl}/posts/${postId}`);
    const getJsonBody = await getResponse.json();
    console.log(getJsonBody);
    // TODO: Verification

    //Update the post
    const putResponse =  await request.put(`${baseUrl}/posts/${postId}`, putOptions);
    const putJsonBody = await putResponse.json();
    console.log(putJsonBody);
    // TODO: Verification

    //Delete the post
    const deletetResponse = await request.delete(`${baseUrl}/posts/${postId}`);
    // TODO: Verification

})