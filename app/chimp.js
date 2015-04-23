var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = 'REDACTED_MAILCHIMP_KEY';
try {
    var api = new MailChimpAPI(apiKey, {
        version: '2.0'
    });
} catch (error) {
    console.log(error.message);
}
exports.subscribe = function(req, res) {
    console.log(req.param('email'));
    if (req.param('email') == "" || !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.param('email'))) /* ' */ {
        res.send(403, "Please use a valid email address");
    } else {
        api.call('lists', 'subscribe', {
            id: "2407f7900c",
            email: {
                email: req.param('email')
            },
            double_optin: false
        }, function(error, data) {
            if (error) {
                console.log(error.message);
                res.send(403, error.message );
            } else {
                console.log(JSON.stringify(data));
                res.send("Thank you for signing up! You'll be the first to know when we have new releases."); // Do something with your data!
            }
        });
    }
};
