const base_url = "http://localhost:3000/"

$(document).ready(() => {
  auth()
  $("#login-form").on("submit", (e) => {
      e.preventDefault()
      login()
  })
  
})

const auth = () => {
  if(!localStorage.getItem("access_token")) {
    // $("#login").show()
    // $("#register").hide()
    // $("#login-btn").show()
    $("#logout-btn").hide()
    $("#regist-btn").hide()
    $("#movie-list").hide()
    $("#comic-list").hide()
    $("#anime-list").hide()
    $("#favorite-list").hide()
  } else {
    // $("#login").show()
    // $("#register").hide()
    // $("#login-btn").show()
    $("#logout-btn").hide()
    $("#regist-btn").hide()
    $("#movie-list").hide()
    $("#comic-list").hide()
    $("#anime-list").hide()
    $("#favorite-list").hide()
      getTodoList()
  }
}

const onSignIn = (googleUser) => {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: base_url + "",
        method: "POST,"
        data: {
            googleToken: id_token
        }
            .done(res => {
                localStorage.setItem("access_token", res.access_token);
                checkLocalStorage()
            })
            .fail(err => {
                console.log(err);
            })
    })
}

const logout = () => {
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

const getFavorite = () => {
  $.ajax({
    url: base_url + "",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(favorite => {

    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}

const addFavorite = (name, type) => {
  $.ajax({
    url: base_url + "",
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      name: "",
      type: ""
    }
  })
    .done(favorite => {

    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}

const delFavorite = () => {
  $.ajax({
    url: base_url + "",
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(favorite => {

    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}

// CLIENT ID 282382347754-qkp163cpqic8bhjoiu8daeggp6k8477a.apps.googleusercontent.com
// CLIENT SECRET OVb4cxtQtKVAfjZSuiB4pSrO

// googleSignIn AT CONTROLLER

/**
 *  1. INSTALL npm install google-auth-library --save
 *  2. Create routing
 *  3. Create controller
 */

static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let fullName = ""
    let email = ""
    client
        .verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                fullName = payload.name
                email = payload.email

                return User.findOne({where: {email}})
            })
            .then(user => {
                if(user) {
                    const access_token = generateToken({
                        id: registeredUser.id,
                        email: registeredUser.email
                    })
                    res.status(200).json({access_token})
                } else {
                    return User.create({
                        fullName,
                        email,
                        password: "littlefoxes"
                    })
                }
            })
            .then(registeredUser => {
                const access_token = generateToken({
                    id: registeredUser.id,
                    email: registeredUser.email
                })
                res.status(201).json({access_token})
            })
            .catch(err => {
                console.log(err)
            })
}

// ROUTER

router.post('/googlelogin', UserController.googleLogin)