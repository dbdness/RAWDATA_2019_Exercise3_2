let viewModel;
let dataService;
let knockout;

define(["knockout", "dataService"], function (ko, ds) {
    knockout = ko;
    dataService = ds;
    viewModel = ko.observable({});
    let hasPrev = ko.observable(hasPrevFunc());

    ds.getPostsWithJQuery("api/posts", null, resp => {
        console.log(resp);
        viewModel({
            total: ko.observable(resp.total),
            prev: ko.observable(resp.prev),
            pages: ko.observable(resp.pages),
            next: ko.observable(resp.next),
            items: ko.observable(resp.items)
        })
    });

    let next = () => {
        ds.getPostsWithJQuery(viewModel().next(), null, resp => {
                viewModel({
                    prev: ko.observable(resp.prev),
                    next: ko.observable(resp.next),
                    items: ko.observable(resp.items),
                });
                hasPrev = hasPrevFunc();
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
            hasPrev = hasPrevFunc();
        });
    };

    return {
        viewModel,
        next,
        prev,
        hasPrev
    };
});

function hasPrevFunc() {
    return viewModel().hasOwnProperty("prev") && viewModel().prev();
}

