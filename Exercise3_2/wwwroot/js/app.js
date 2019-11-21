let posts;

define(["knockout", "dataService"], function (ko, ds) {
    
    viewModel = ko.observable({});
    
    ds.getPostsWithJQuery(resp => {
        console.log(resp);
        viewModel({
            total: ko.observable(resp.total),
            prev: ko.observable(resp.prev),
            pages: ko.observable(resp.pages),
            next: ko.observable(resp.next),
            items: ko.observable(resp.items)
        })
    });
    
    return viewModel;
});



