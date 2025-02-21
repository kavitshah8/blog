function getUsers(data, callback) {
    $.get('/api/users', data, callback(data));
}

describe('getUsers', function() {
    const post = sinon.stub($, 'get');
    const callback = sinon.spy();
    const data = { users: [{ name: 'John' }] };
    post.yields(data); // call the firstcallback the stub receives with the data object
    getUsers(data, callback);
    expect(post).to.have.been.calledOnce;
    post.restore();
});