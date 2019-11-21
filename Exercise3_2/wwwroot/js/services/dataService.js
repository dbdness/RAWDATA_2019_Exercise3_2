define(["jquery"], function ($) {
    let getPostsWithJQuery = function (url, queries, callback) {
        $.getJSON(url, queries, callback);
    };

    let getPostsWithFetch = function (callback) {
        fetch("api/posts/")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                callback(data);
            });
    };

    let getPostsWithFetchAsync = async function (callback) {
        let response = await fetch("api/posts");
        let data = await response.json();
        callback(data);
    };

    return {
        getPostsWithJQuery,
        getPostsWithFetch,
        getPostsWithFetchAsync
    }
});