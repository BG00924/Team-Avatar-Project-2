
var saveInputBtn = document.getElementById('savesubmit')
var saveInputEl = document.getElementById('save-Input')
var platformDropdownEl = document.getElementById('platform-dropdown')



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
        gameImageEl.setAttribute("src", "")
        $(".modal").addClass("is-active")
    } else {
        gameImageEl.setAttribute("src", "")
        gameImageEl.setAttribute("src", game.result.image)
    }
}
// End display function

// need to adjust to pull info from server
async function renderSaveGame () {
    const game = await fetch(`/api/games`, {
        method: 'GET',
        body: JSON.stringify({
            title
        }),
    })

    console.log(game.json())


    const platform = await fetch(`/api/games`, {
        method: 'GET',
        body: JSON.stringify({
            platform
        }),
    })

    getGameInfo(game, platform);

}
// end

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

renderSaveGame()

// Event listeners
//#####.addEventListener("click", searchSubmitHandler);