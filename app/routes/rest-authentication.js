// route middleware to make sure a user is logged in
module.exports = function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.status(401);
    res.send('Not authorized');
};
