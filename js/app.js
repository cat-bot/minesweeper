(function($) {
    "use strict";

    let $loginUI = $("#login-ui-container");

    function onSignIn(oAuthUser) {
        $loginUI
            .find("#login-prompt")
            .toggleClass('d-none')
            .end()
            .find("#login-profile")
            .find('img')
            .prop('src', oAuthUser.photoURL)
            .prop('alt', 'logged in as ' + oAuthUser.displayName)
            .end()
            .toggleClass('d-none')
            .end()
            .attr('data-signed-in', 'true');
    }

    function onSignOut() {
        if ($loginUI.attr('data-signed-in') == 'false')
            return;

        $loginUI
            .find("#login-profile")
            .find('img')
            .prop('src', '')
            .prop('alt', '')
            .end()
            .toggleClass('d-none')
            .end()
            .find("#login-prompt")
            .toggleClass('d-none')
            .end()
            .attr('data-signed-in', 'false');
    }
  
    let g_auth = new GoogleAuthHandler(onSignIn, onSignOut);

    // bind log in
    $("#login-prompt").on('click', function(e) {     
        g_auth.GoogleSignInPopup();
    });

    $("#login-profile").on('click', function(e) {     
        g_auth.GoogleSignOut();
    });

})(jQuery);