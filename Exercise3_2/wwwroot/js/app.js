let viewModel;

define(["knockout", "dataService"], function (ko, ds) {
    viewModel = ko.observable({});
    let totalPosts = ko.observable();
    let hasPrev = ko.observable(hasPrevFunc());
    let hasNext = ko.observable(hasNextFunc());

    ds.getPostsWithJQuery("api/posts", null, resp => {
        totalPosts(resp.total);
        viewModel({
            prev: ko.observable(resp.prev),
            pages: ko.observable(resp.pages),
            next: ko.observable(resp.next),
            items: ko.observable(resp.items)
        });
        hasPrev(hasPrevFunc());
        hasNext(hasNextFunc());
    });

    let next = () => {
        ds.getPostsWithJQuery(viewModel().next(), null, resp => {
                viewModel({
                    prev: ko.observable(resp.prev),
                    next: ko.observable(resp.next),
                    items: ko.observable(resp.items),
                });
                hasPrev(hasPrevFunc());
                hasNext(hasNextFunc());
            }
        );
    };

    let prev = () => {
        ds.getPostsWithJQuery(viewModel().prev(), null, resp => {
            viewModel({
                prev: ko.observable(resp.prev),
                next: ko.observable(resp.next),
                items: ko.observable(resp.items),
            });
            hasPrev(hasPrevFunc());
            hasNext(hasNextFunc());
        });
    };

    return {
        totalPosts,
        viewModel,
        next,
        prev,
        hasPrev,
        hasNext
    };
});

function hasPrevFunc() {
    return viewModel().hasOwnProperty("prev") && viewModel().prev();
}

function hasNextFunc() {
    return viewModel().hasOwnProperty("next") && viewModel().next();
}

