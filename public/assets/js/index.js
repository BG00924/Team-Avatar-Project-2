// Variables Used To Select Specific Elements
var searchInputBtn = document.getElementById( 'gamesubmit' )
var searchInputEl = document.getElementById( 'search-Input' )
var platformDropdownEl = document.getElementById( 'platform-dropdown' )
var nameEl = document.getElementById( 'name' )
var platformEl = document.getElementById( 'platform' )
var genreEl = document.getElementById( 'genre' )
var scoreEl = document.getElementById( 'score' )
var descriptionEl = document.getElementById( 'description' )
var gameImageEl = document.getElementById( 'gameimage' )
var youTubeEl = document.getElementById( 'youtube' )
var modal = document.getElementById( 'modalEdicion' )
var closeModalEls = document.getElementsByClassName( 'closeModal' )

for ( var i = 0; i < closeModalEls.length; i++ ) {
    closeModalEls[ i ].addEventListener( "click", function ( event ) {
        modal.classList.remove( "is-active" )
    } )
}

// API Fetch From Chicken Coop Which Provides The Game Information
var getGameInfo = function ( game, platform ) {
    $.ajax( {
        method: "GET",
        url: "https://chicken-coop.p.rapidapi.com/games/" + game + "?platform=" + platform,
        headers: {
            "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
            "x-rapidapi-key": "2dced9ba08msh3b63096614e89a5p18b302jsnd75e5b94f864"
        }
    } ).then( displayGameInfo )
        .catch( openModal );

}
// End Chicken Coop Fetch

// Displays The Information To The Website
var displayGameInfo = function ( game ) {
    if ( game.result == "No result" ) {
        nameEl.textContent = ""
        platformEl.textContent = ""
        genreEl.textContent = ""
        descriptionEl.textContent = ""
        gameImageEl.setAttribute( "src", "" )
        openModal()
    } else {
        nameEl.textContent = game.result.title
        // Co-Joined Multiple Items From An Array With ", "
        platformEl.textContent = game.result.alsoAvailableOn.join( ", " )
        genreEl.textContent = game.result.genre.join( ", " )
        scoreEl.textContent = game.result.score
        descriptionEl.textContent = game.result.description
        gameImageEl.setAttribute( "src", game.result.image )
        getVideo( game.result.title )
    }
}
// End Display Function

// Function To Get Video From YouTube API
var getVideo = function ( game ) {
    var apiKey = "AIzaSyD4dKAJC5SxpR7m_aPCEWXvMPO4tJyoDmc"
    var maxResults = 5
    var youTubeAPI = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey
        + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + game

    $.get( youTubeAPI )
        .then( displayYouTubeInfo )
        .catch( openModal );

}

function displayYouTubeInfo( data ) {
    youTubeEl.textContent = ""
    for ( var i = 0; i < data.items.length; i++ ) {
        var video = document.createElement( "iframe" )
        video.classList = "youtubeVid"
        video.setAttribute( "src", "https://www.youtube.com/embed/" + data.items[ i ].id.videoId )
        video.setAttribute( "frameborder", "0" )
        video.setAttribute( 'allowfullscreen', '' )
        youTubeEl.appendChild( video )
    }
}
// End YouTube API

// Function That Handles What Happens When Game Name And Platform Submitted
var searchSubmitHandler = function () {
    var gameInput = searchInputEl.value.trim()
    var platformInput = platformDropdownEl.value.trim()
    if ( gameInput && platformInput ) {
        getGameInfo( gameInput, platformInput )
        // Next Two Lines Are For Future Updates
        // searchInputEl.value = ""
        // platformDropdownEl.value = ""
        localStorage.setItem( "game", gameInput );
        localStorage.setItem( "platform", platformInput );
        return
    }
    openModal()
}
// End Submit Handler

// Add Persistence
var renderLastGame = function () {
    var game = localStorage.getItem( "game" )
    var platform = localStorage.getItem( "platform" )

    if ( game === null || platform === null ) {
        searchInputEl.value = ""
        platformDropdownEl.value = ""
        return;
    }
    searchInputEl.value = game
    platformDropdownEl.value = platform
    getGameInfo( game, platform );
}
// Adds Persistence

// Bulma Modal JavaScript 
// var refs = {
//     modalEdicion: {
//         open: function () {
//             document.getElementById( 'modalEdicion' ).classList.add( 'is-active' );
//         },
//         close: function () {
//             document.getElementById( 'modalEdicion' ).classList.remove( 'is-active' );

//         }
//     }
// };
// Bulma Modal End

function openModal() {
    modal.addClass( "is-active" )
}

// Event Listeners
searchInputBtn.addEventListener( "click", searchSubmitHandler );
renderLastGame();