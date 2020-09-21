const express = require( 'express' )
const app = express()
const PORT = process.env.PORT || 8080;

app.use( express.static( 'public' ) )
app.use( express.urlencoded( { extended: true } ) )
app.use( express.json() )

app.listen( PORT, function () {
    if ( process.env.NODE_ENV !== 'production' )
        console.log( "http://localhost:" + PORT )
} )