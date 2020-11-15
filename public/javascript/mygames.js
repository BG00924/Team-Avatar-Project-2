
var saveInputBtn = document.getElementById('savesubmit')
var saveInputEl = document.getElementById('save-Input')
var platformDropdownEl = document.getElementById('platform-dropdown')
var savedImageEl = document.getElementById('gameimage')



// API fetch from rawg which provides the game information
// var getGameInfo = function(game) {
//     fetch("https://rawg-video-games-database.p.rapidapi.com/games/" + game, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
// 		"x-rapidapi-key": "2dced9ba08msh3b63096614e89a5p18b302jsnd75e5b94f864"
// 	}
//     })
//         .then(response => {
//         if (response.ok) {
//             response.json().then(data => {
//                 displayGameInfo(data, game)
//             })
//         }
//         })
//         .catch(err => {
//         $(".modal").addClass("is-active")
//         });
// }
// End rawg fetch

// Displays the information to the website
var displayGameInfo = function (game, searchTerm) {
    if (game == "No result") {
        savedImageEl.setAttribute("src", "")
        $(".modal").addClass("is-active")
    } else {
        // savedImageEl.setAttribute("src", "")
        // savedImageEl.setAttribute("src", game.background_image)
    }
}
// End display function

// need to adjust to pull info from server
async function renderSaveGame () {
    // const session = req.session
    // const id = session.user_id
    const users = await fetch(`/api/games/`, {
        //users instead of game
        method: 'GET',
        // body: JSON.stringify({
        //     title
        // }),
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    let game = data[i].title;
                    let platform = data[i].platform

                    game = game.replace(/\s/g, "-")

                    getGameInfo(game)
                    
                }
            })
        }
    })

    // console.log(game.json())


    // const platform = await fetch(`/api/games`, {
    //     method: 'GET',
    //     body: JSON.stringify({
    //         platform
    //     }),
    // })

    // const game = games[i].title
    // const platform = games[i].platform    

    // getGameInfo(game, platform);

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