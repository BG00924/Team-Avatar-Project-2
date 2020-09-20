// Variables used to select specific elements
var searchInputBtn = document.getElementById('gamesubmit')
var searchInputEl = document.getElementById('search-Input')
var platformDropdownEl = document.getElementById('platform-dropdown')
var nameEl = document.getElementById('name')
var platformEl = document.getElementById('platform')
var genreEl = document.getElementById('genre')
var scoreEl = document.getElementById('score')
var descriptionEl = document.getElementById('description')
var gameImageEl = document.getElementById('gameimage')
var youTubeEl = document.getElementById('youtube')



// API fetch from Chicken Coop which provides the game information
var getGameInfo = function(game, platform) {
    fetch("https://chicken-coop.p.rapidapi.com/games/" + game + "?platform=" + platform, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "chicken-coop.p.rapidapi.com",
		"x-rapidapi-key": "2dced9ba08msh3b63096614e89a5p18b302jsnd75e5b94f864"
	}
    })
        .then(response => {
        if (response.ok) {
            response.json().then(data => {
                displayGameInfo(data, game, platform)
            })
        }
        })
        .catch(err => {
        $(".modal").addClass("is-active")
        });
}
// End Chicken Coop fetch

// Displays the information to the website
var displayGameInfo = function (game, searchTerm) {
    if (game.result == "No result") {
        nameEl.textContent = ""
        platformEl.textContent = ""
        genreEl.textContent = ""
        descriptionEl.textContent = ""
        gameImageEl.setAttribute("src", "")
        $(".modal").addClass("is-active")
    } else {
        nameEl.textContent = ""
        nameEl.textContent = game.result.title
        platformEl.textContent = ""
        // Cojoined multiple items from an array with ", "
        platformEl.textContent = game.result.alsoAvailableOn.join(", ")
        genreEl.textContent = ""
        genreEl.textContent = game.result.genre.join(", ")    
        scoreEl.textContent = ""
        scoreEl.textContent = game.result.score
        descriptionEl.textContent = ""
        descriptionEl.textContent = game.result.description
        gameImageEl.setAttribute("src", "")
        gameImageEl.setAttribute("src", game.result.image)
        getVideo(game.result.title)
    }
}
// End display function

// Function to get video from YouTube API
var getVideo = function(game) {
    var apiKey = "AIzaSyD4dKAJC5SxpR7m_aPCEWXvMPO4tJyoDmc"
    var maxResults = 5
    var youTubeAPI = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey 
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + game
    fetch(youTubeAPI)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    youTubeEl.textContent=""
                    for (var i = 0; i < data.items.length; i++) {
                        var video = document.createElement("iframe")
                        video.classList="youtubeVid"
                        video.setAttribute("src", "https://www.youtube.com/embed/" + data.items[i].id.videoId)
                        video.setAttribute("frameborder", "0")
                        video.setAttribute('allowfullscreen', '')
                        youTubeEl.appendChild(video)
                    }
                })
            }
        })
        .catch(err => {
            $(".modal").addClass("is-active")
        });
}
// End YouTube API

// Function that handles what happens when game name and platform submitted
var searchSubmitHandler = function(event) {
    event.preventDefault();
    var gameInput = searchInputEl.value.trim()
    var platformInput = platformDropdownEl.value.trim()
    if (gameInput && platformInput) {
        getGameInfo(gameInput, platformInput)
        // next two lines are for future updates
        // searchInputEl.value = ""
        // platformDropdownEl.value = ""
        localStorage.setItem("game", gameInput);
        localStorage.setItem("platform", platformInput);
        
    } else {
        $(".modal").addClass("is-active");
    }
}
// end submit handler

// add persistence
var renderLastGame = function(){
    var game = localStorage.getItem("game")
    var platform = localStorage.getItem("platform")
    if (game && platform === null) {
        searchInputEl.value = ""
        platformDropdownEl.value = ""  
        return;
    }
    else if (game && platform){
    searchInputEl.value = game
    platformDropdownEl.value = platform
    getGameInfo(game, platform);
     }
}
// adds persistence

// bulma modal javascript 
var refs = {
    modalEdicion: {
      open: function() { document.getElementById('modalEdicion').classList.add('is-active');
      },
      close:function() { document.getElementById('modalEdicion').classList.remove('is-active');
                        
      }
    }
  };
// bulma modal end

// Event listeners
searchInputBtn.addEventListener("click", searchSubmitHandler);
renderLastGame();
