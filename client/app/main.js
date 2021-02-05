const base_url = "http://localhost:3000/"

$(document).ready(() => {
  auth()
  })

const auth = () => {
  if(!localStorage.access_token) {
    $("#login").show()
    $("#register").hide()
    $("#login-btn").hide()
    $("#logout-btn").hide()
    $("#regist-btn").show()
    $("#movie-list").hide()
    $("#comic-list").hide()
    $("#anime-list").hide()
    $("#favorite-list").hide()
  } else {
    $("#login").hide()
    $("#register").hide()
    $("#login-btn").hide()
    $("#logout-btn").show()
    $("#regist-btn").hide()
    $("#movie-list").hide()
    $("#comic-list").hide()
    $("#anime-list").hide()
    $("#favorite-list").show()
    getFavorite()
  }
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token

  $.ajax({
      url: base_url + "googlelogin",
      method: "POST",
      data: {
        googleToken : id_token
      }
        .done(res => {
            localStorage.setItem("access_token", res.access_token);
            auth()
        })
        .fail(xhr, text => {
          console.log(xhr, text);
        })
  })
}

$(`#btn-login`).click((event) => {
  event.preventDefault()
  const email = $("#login-email-input").val()
  const password = $("#login-password-input").val()
  $.ajax({
      url: base_url + "/user/login",
      method: "POST",
      data: { email, password }
  })
      .done(res => {
          localStorage.setItem("access_token", res.accessToken)
          auth()
      })
      .fail(xhr, text => {
          console.log(xhr, text);
      })
      .always(_ => {
          $("#login-email-input").trigger("reset")
          $("#login-password-input").trigger("reset")
      })
})

const register = () => {
  const fullName = $("#regist-fullname-input").val()
  const email = $("#regist-email-input").val()
  const password = $("#regist-password-input").val()
  $.ajax({
      url: base_url + "regist",
      method: "POST",
      data: { fullName, email, password }
  })
      .done(res => {
        auth()
      })
      .fail(xhr, text => {
          console.log(xhr, text);
      })
      .always(_ => {
          $("#regist-email-input").trigger("reset")
          $("#regist-password-input").trigger("reset")
      })
}

const logout = () => {
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    auth()
}

const getFavorite = () => {
  $.ajax({
    url: base_url + "",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(favorites => {
      $("#favorite-cont").empty()
      favorites.forEach(e => {
        $("#favorite-cont").append(`
          <div class="card mb-3" style="max-width: 440px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${e.img}" alt="">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="card-text"><small class="text-muted">${e.type}</small></p>
                  <h5 class="card-title">${e.title}</h5>
                  <p class="card-text">${e.description}</p>
                  <a href="#" onclick="deleteFavorite(${e.id})" class="card-link">Add Favorite</a>
                </div>
              </div>
            </div>
          </div>
        `) // <<<<<<<<<<
      })
    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}

const addFavorite = () => {
  const title = ""
  const description = ""
  const img = ""
  $.ajax({
    url: base_url + "",
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title,
      description,
      img
    }
  })
    .done(favorites => {
      getFavorite()
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

const showComics = () => {
  $.ajax({
    url: base_url + "comics",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(comics => {
      $("#comic-cont").empty()
      for (let i = 0; i < 10; i++) {
        $("#comic-cont").append(`
          <div class="card mb-3" style="max-width: 440px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${comics[i].img}" alt="">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${comics[i].title}</h5>
                  <p class="card-text">${comics[i].description}</p>
                  <a href="#" onclick="addFavorite(${comics[i].title}, ${comics[i].description}, ${comics[i].img}, "comics")" class="card-link">Add Favorite</a>
                </div>
              </div>
            </div>
          </div>
        `)
      }
    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}

const showAnimes = () => {
  $.ajax({
    url: base_url + "animes",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(animes => {
      $("#anime-cont").empty()
      for (let i = 0; i < 10; i++) {
        $("#anime-cont").append(`
          <div class="card mb-3" style="max-width: 440px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${animes[i].img}" alt="">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${animes[i].title}</h5>
                  <p class="card-text">${animes[i].description}</p>
                  <a href="#" onclick="addFavorite(${animes[i].title}, ${animes[i].description}, ${animes[i].img}, "animes")" class="card-link">Add Favorite</a>
                </div>
              </div>
            </div>
          </div>
        `)
      }
    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}

const showMovies = () => {
  $.ajax({
    url: base_url + "movies",
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
    .done(movies => {
      $("#movie-cont").empty()
      for (let i = 0; i < 10; i++) {
        $("#movie-cont").append(`
          <div class="card mb-3" style="max-width: 440px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${movies[i].img}" alt="">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${movies[i].title}</h5>
                  <p class="card-text">${movies[i].description}</p>
                  <a href="#" onclick="addFavorite(${movies[i].title}, ${movies[i].description}, ${movies[i].img}, "movies")" class="card-link">Add Favorite</a>
                </div>
              </div>
            </div>
          </div>
        `)
      }
    })
    .fail(xhr, text => {
      console.log(xhr, text);
    })
}
