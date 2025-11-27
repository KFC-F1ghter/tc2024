var User = require("../models/user").User;

module.exports = async function(req, res, next){
    res.locals.user = null;

    if (req.session.user_id) {
        var user = await User.findById(req.session.user_id);
        if (user) {
            res.locals.user = user;
        }
    }

    next();
}
