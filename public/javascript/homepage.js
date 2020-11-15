// Variables used to select specific elements
var searchInputBtn = document.getElementById('gamesubmit')
var searchInputEl = document.getElementById('search-Input')
// var platformDropdownEl = document.getElementById('platform-dropdown')
var nameEl = document.getElementById('name')
// var platformEl = document.getElementById('platform')
var genreEl = document.getElementById('genre')
var scoreEl = document.getElementById('score')
var descriptionEl = document.getElementById('description')
var gameImageEl = document.getElementById('gameimage')
var youTubeEl = document.getElementById('youtube')
var videoEl = document.getElementById('video')
var saveBtn = document.getElementById('gamesave')



// API fetch from rawg which provides the game information
var getGameInfo = function(game) {
    fetch("https://rawg-video-games-database.p.rapidapi.com/games/" + game, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		"x-rapidapi-key": "2dced9ba08msh3b63096614e89a5p18b302jsnd75e5b94f864"
	}
    })
        .then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayGameInfo(data, game)
            })
        }
        })
        .catch(err => {
        $(".modal").addClass("is-active")
        });
}
// End rawg fetch

// Displays the information to the website
var displayGameInfo = function (game, searchTerm) {
    if (game == "No result") {
        nameEl.textContent = ""
        // platformEl.textContent = ""
        genreEl.textContent = ""
        descriptionEl.textContent = ""
        gameImageEl.setAttribute("src", "")
        $(".modal").addClass("is-active")
    } else {
        nameEl.textContent = ""
        nameEl.textContent = game.name
        // platformEl.textContent = ""
        // // Cojoined multiple items from an array with ", "
        // platformEl.textContent = game.result.alsoAvailableOn.join(", ")
        genreEl.textContent = ""
        genreEl.textContent = game.genres[0].name    
        scoreEl.textContent = ""
        scoreEl.textContent = game.metacritic
        descriptionEl.textContent = ""
        descriptionEl.textContent = game.description_raw
        gameImageEl.setAttribute("src", "")
        gameImageEl.setAttribute("src", game.background_image)
        // getVideo(game.name)
        // youTubeEl.setAttribute("src", "")
        // youTubeEl.setAttribute("src", game.clip.clip)
        var video = document.createElement("source")
        video.classList="youtubeVid"
        video.setAttribute("src", "")
        video.setAttribute("src", game.clip.clip)
        video.setAttribute("type", "video/mp4")
        youTubeEl.appendChild(video)

    }
}
// End display function

// Save game
var saveSubmitHandler = function(event) {
    event.preventDefault()

    // console.log(Session)

    var title = nameEl.value
    var genre = genreEl.value
    var score = scoreEl.value
    var description = descriptionEl.value
    // var user_id = req.session.user_id

    fetch(`/api/games/`, {
        //users instead of game
        method: 'POST',
        body: JSON.stringify({
            title,
            genre,
            score,
            description,
            // user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// End save game

// Function to get video from YouTube API
// var getVideo = function(game) {
    // var apiKey = "AIzaSyD4dKAJC5SxpR7m_aPCEWXvMPO4tJyoDmc"
    // var maxResults = 5
    // var youTubeAPI = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey 
    //     + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + game
    // fetch(youTubeAPI)
    //     .then(function(response) {
    //         if (response.ok) {
    //             response.json().then(function(data) {
    //                 youTubeEl.textContent=""
    //                 for (var i = 0; i < data.items.length; i++) {
    //                     var video = document.createElement("iframe")
    //                     video.classList="youtubeVid"
    //                     video.setAttribute("src", "https://www.youtube.com/embed/" + data.items[i].id.videoId)
    //                     video.setAttribute("frameborder", "0")
    //                     video.setAttribute('allowfullscreen', '')
    //                     youTubeEl.appendChild(video)
    //                 }
    //             })
    //         }
    //     })
    //     .catch(err => {
    //         $(".modal").addClass("is-active")
    //     });
    // var video = document.createElement("iframe")
    // video.classList="youtubeVid"
    // video.setAttribute("src", game.clips.clip)
    // video.setAttribute("frameborder", "0")
    // video.setAttribute('allowfullscreen', '')
    // youTubeEl.appendChild(video)
// }
// End YouTube API

// Function that handles what happens when game name and platform submitted
var searchSubmitHandler = function(event) {
    event.preventDefault();
    var gameInput = searchInputEl.value.trim()
    gameInput = gameInput.replace(/\s/g, "-")
    if (gameInput) {
        getGameInfo(gameInput)
        // next two lines are for future updates
        // searchInputEl.value = ""
        // platformDropdownEl.value = ""
        localStorage.setItem("game", gameInput); 
    } else {
        $(".modal").addClass("is-active");
    }
}
// end submit handler

// add persistence
var renderLastGame = function(){
    var game = localStorage.getItem("game")
    if (game === null) {
        searchInputEl.value = ""
        return;
    }
    else if (game){
    
    searchInputEl.value = game
    getGameInfo(game);
     }
}
// adds persistence

// bulma modal javascript 
var refs = {
    modalEdicion: {
      open: function() { document.getElementById('modalEdicion').classList.add('is-active');
      },
      close: function() { document.getElementById('modalEdicion').classList.remove('is-active');
                        
      }
    }
  };
// bulma modal end

// Event listeners
searchInputBtn.addEventListener("click", searchSubmitHandler);
saveBtn.addEventListener("click", saveSubmitHandler);
renderLastGame();
