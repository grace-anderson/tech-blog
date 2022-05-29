const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        // If the user is not logged in, redirect the user to the login page
        res.redirect('/');
        return;
    } else {
        // If the user is logged in, allow them to access the route
        next();
    }
};

module.exports = withAuth;