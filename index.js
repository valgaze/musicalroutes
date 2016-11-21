"use strict";

exports = module.exports = function () {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (req, res, next) {
        var SHOULD_PLAY = true;
        var timeout_duration = 0;

        if (opts.predicate && typeof opts.predicate === "function") {
            if (opts.predicate(req, res, next)) {
                SHOULD_PLAY = true;
            } else {
                SHOULD_PLAY = false;
            }
        }

        if (SHOULD_PLAY) {
            var inst = _play(opts, next); //pass in flags
        } else {
            next();
        }
    };
};

exports.demo = function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://www.youtube.com/watch?v=DUMq6imrMmI";

    var config = { "source": url };
    var inst = _play(config);
};

function _play(opts, next) {
    var debug = opts.debug ? console.log : function () {};
    var flags = opts.rawFlags && opts.rawFlags.length ? opts.rawFlags : [];

    if (!opts.rawFlags) {
        if (opts.source) {
            flags.push("-p");
            flags.push(opts.source);
        }
    }

    var spawn = require('child_process').spawn;
    debug("Invoking local npmusic with flags:", flags);
    var cmd = spawn('./node_modules/.bin/npmusic', flags); //Need flag builder

    next();

    if (opts.timeout) {
        var SONG_START_FUDGE_FACTOR = 4000; //ms
        //Todo: Better way to determine if audio playing first then invoke shutdown
        timeout_duration = Number(opts.timeout) + SONG_START_FUDGE_FACTOR;
        setTimeout(function () {
            _shutOff(cmd);
        }, timeout_duration);
    }

    cmd.on('error', function (err) {
        debug("There was an error:", err);
    });

    cmd.stdout.on('data', function (data) {
        debug(data.toString());
    });

    cmd.stderr.on('data', function (data) {
        debug(data.toString());
    });

    cmd.on('exit', function (code) {
        next();
    });

    return cmd;
}

function _shutOff(inst) {
    try {
        process.kill(inst.pid + 1);
        process.kill(inst.pid);
    } catch (e) {}
}
