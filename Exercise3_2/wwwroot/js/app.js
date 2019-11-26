let viewModel;

define(["knockout", "dataService"], function (ko, ds) {
    viewModel = ko.observable({});
    let totalPosts = ko.observable();
    let hasPrev = ko.computed(() => {
        return viewModel().hasOwnProperty("prev") && viewModel().prev();
    });
    let hasNext = ko.computed(() => {
        return viewModel().hasOwnProperty("next") && viewModel().next();
    });

    ds.getPostsWithJQuery("api/posts", null, resp => {
        totalPosts(resp.total);
        viewModel({
            prev: ko.observable(resp.prev),
            pages: ko.observable(resp.pages),
            next: ko.observable(resp.next),
            items: ko.observableArray(resp.items)
        });
    });

    let next = () => {
        ds.getPostsWithJQuery(viewModel().next(), null, resp => {
                viewModel({
                    prev: ko.observable(resp.prev),
                    next: ko.observable(resp.next),
                    items: ko.observableArray(resp.items),
                });
            }
        );
    };

    let prev = () => {
        ds.getPostsWithJQuery(viewModel().prev(), null, resp => {
            viewModel({
                prev: ko.observable(resp.prev),
                next: ko.observable(resp.next),
                items: ko.observableArray(resp.items),
            });
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

