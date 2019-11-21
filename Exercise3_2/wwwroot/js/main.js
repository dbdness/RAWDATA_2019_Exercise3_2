require.config({
    baseUrl: "js",
    paths: {
        jquery: "../lib/jquery/dist/jquery",
        knockout: "../lib/knockout/build/output/knockout-latest.debug",
        dataService: "services/dataService"
    }
});

require(["knockout", "app"], function(ko, app, ds) {
    ko.applyBindings(app);
});