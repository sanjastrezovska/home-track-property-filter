var appRouter = function(app) {
	app.get("/", function(req, res) {
    res.send("Testing...");
});
}

module.exports = appRouter;