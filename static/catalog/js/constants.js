/**
 * Created by Sunday on 16/04/2015.
 */

//member objects
var memberObjects = {
    plan_choosen:0
};
var misc = {
    ajaxLoader:'<img src="assets/img/ajax-loader.GIF"/>',
    error_html: '<div class="alert alert-danger" role="alert">',
    success_html:'<div class="alert alert-success" role="alert">'
};
var validate = {
    email:function(email){
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    }
};

var ajax_path={
    member:'http://www.igniteafricalibrary.org/assets/Xhr/member_xhr.php',
    book:'assets/Xhr/book_xhr.php',
    volunteer:'assets/Xhr/volunteer_xhr.php',
    events:'assets/Xhr/event_xhr.php',
    donate:'assets/Xhr/donate_xhr.php'
};

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

// Create and return the constructor function for the Timer.
// We'll wrap this in its own execution space.
var Timer = (function( $ ){
    // Define the constructor for the timer.
    function timer( timeout ){
        // Create a new Deferred object - this will be
        // resolved when the timer is finished.
        var deferred = $.Deferred();

        // Lock the deferred object. We are doing this so we
        // can alter the resultant object.
        var promise = deferred.promise();

        // Define our internal timer - this is what will be
        // powering the delay.
        var internalTimer = null;

        // Store the context in which this timer was executed.
        // This way, we can resolve the timer in the same
        // context.
        var resolveContext = this;

        // Get any additional resolution arguments that may
        // have been passed into the timer.
        var resolveArguments = Array.prototype.slice.call(arguments,1);

        // Add a CLEAR method to the timer. This will stop
        // the underlying timer and reject the deferred.
        promise.clear = function(){
            // Clear the timer.
            clearTimeout( internalTimer );

            // Reject the deferred. When rejecting, let's use
            // the given context and arguments.
            deferred.rejectWith(resolveContext,resolveArguments);

        };

        // Set the internal timer.
        internalTimer = setTimeout(function(){
                // Once the timer has executed, we'll resolve
                // the deferred object. When doing so, let's
                // use the given context and arguments.
                deferred.resolveWith(resolveContext,resolveArguments);

                // Clear the timer (probably not necessary).
                clearTimeout( internalTimer );

            },
            timeout
        );

        // Return the immutable promise object.
        return( promise );

    };
    // Return the timer function.
    return( timer );
})( jQuery );

//Actual implementation of message/dialog delays
function delayMessage(container,msg){
    var delay = Timer(7000,'');
    delay.then(
        function(){
            //success
            $(container).html(msg);
        },
        function(){
            //fail
        }
    );
}

var tabs = ['#featured-tab','#top-seller-tab'];
var tabsList = ['.featured-tab','.top-seller-tab'];
var index = 0;
var Clock = {
    totalSeconds: 0,

    start: function () {
        var self = this;

        this.interval = setInterval(function () {

            if(index === 0){
                //make top-seller-tab active
                $(tabs[index+1]).addClass('active');
                $(tabs[index+1]).addClass('in');
                $(tabsList[index+1]).addClass('active');
                $(tabs[index]).removeClass('active');
                $(tabsList[index]).removeClass('active');
                index += 1;
                console.log('top seller active');
            }else if(index === 1){
                //make featured tab active
                $(tabs[index-1]).addClass('active');
                $(tabs[index-1]).addClass('in');
                $(tabsList[index-1]).addClass('active');
                $(tabs[index]).removeClass('active');
                $(tabsList[index]).removeClass('active');
                index -= 1;
                console.log('featured active');
            }
        }, 20000); //20 seconds
    },

    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },

    resume: function () {
        if (!this.interval) this.start();
    }
};