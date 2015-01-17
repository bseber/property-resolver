
function isString (o) { return typeof o === 'string' }
function last (a) { return a[a.length - 1] }

module.exports = function getter () {

    var args = [].slice.call (arguments);

    function ret0rn () {
        return isString (last (args)) ? step : resolve ();
    }

    function resolve () {
        var result = args.pop ()
        args.forEach (function(arg) {
            if (/\[\d+\]$/.test (arg)) {
                var attr = arg.replace (/\[\d+\]$/, '');
                var idx  = arg.replace (/.+\[(\d+)\]$/, function (_, idx) { return idx });
                result = result[attr][idx];
            }
            else {
                result = result[arg];
            }
        });
        return result;
    }

    function step () {
        [].push.apply (args, arguments);
        return ret0rn ();
    }

    return ret0rn ();
};
