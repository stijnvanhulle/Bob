var passport                = require('passport');
var mysql                   = require('mysql');
var LocalStrategy           = require('passport-local').Strategy;
var FacebookStrategy        = require('passport-facebook').Strategy;
var pool                    = require('./mysql').getPool();


var FACEBOOK={
    APP_ID:"455870344603221",
    APP_SECRET:"d5d306ab2f78961d8cd8bdba69a50c55",
    CALLBACK_URL:"http://bob-2u15832u.cloudapp.net/api/auth/callback"
};

function findByEmail(email,password, fn) {
    pool.getConnection(function(error, connection) {
        if (error) {
            //connection.release();
            console.log(error);
            return fn(error, null);
        }

        var query;

        query='SELECT Users.ID, Users.Firstname, Users.Lastname, Users.Email, Users.Cellphone, Users.Bobs_ID, (Bobs.Active =true AND  Bobs.Active IS NOT NULL) AS IsBob, (Bobs.Offer =true) AS CanOffer, (Users.Bobs_ID IS NOT NULL) as CanBeBob FROM Users LEFT JOIN Bobs ON Users.Bobs_ID=Bobs.ID  WHERE Users.Email=? AND Users.Password=?';

        connection.query({//AND Password= ?
                sql: query,
                timeout: 40000 // 40s
            },
            [email, password],
            function (error, rows, fields) {
                var user= rows;
                connection.release();
                if(user!=null && user.length!=0){
                    return fn(null, user);
                }else{
                    return fn(null, null);
                }

            }
        );



    });
}
function findByFacebookID(id, fn) {
    pool.getConnection(function(error, connection) {
        if (error) {


            res.json({success: false, error: error});
        }

        var query;

        query='SELECT ID, FirstName, LastName, Email, Cellphone, (Bobs_ID IS NOT NULL) AS IsBob FROM Users WHERE FacebookID=?';

        connection.query({//AND Password= ?
                sql: query,
                timeout: 40000 // 40s
            },
            [id],
            function (error, rows, fields) {
                var user= rows;
                //console.log(user);
                connection.release();

                if(user!=null && user.length!=0){
                    return fn(null, user);
                }else{
                    return fn(null, null);
                }

            }
        );


    });
}

passport.use('local',new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'Email',
        passwordField: 'Password',
        session: false
    },
    function(body, email, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            findByEmail(email,password, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                //console.log(user);
                return done(null, user);
            })
        });
    }
));

passport.use("facebook", new FacebookStrategy({
        clientID: FACEBOOK.APP_ID,
        clientSecret: FACEBOOK.APP_SECRET,
        callbackURL: FACEBOOK.CALLBACK_URL,
        enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('Facebook ID:' + profile.id);
        process.nextTick(function () {

            findByFacebookID(profile.id, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                //console.log(user);
                return done(null, user);
            })
        });
        //User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //    return done(err, user);
        //});
    }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


