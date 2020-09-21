async function newGameHandler(event) {
    event.preventDefault()

    const title = document.querySelector('input[name="game-title"]').value
    const platform = document.querySelector('input[name="game-platform').value

    const response = await fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({
            title,
            platform
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.new-game-form').addEventListener('submit', newGameHandler)