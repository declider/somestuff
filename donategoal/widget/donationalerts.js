async function getTokenDA() {
    let res = await fetch('https://www.donationalerts.com/api/v1/user/oauth', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+datoken
        }
    })

    return (await res.json()).data.socket_connection_token
}


async function startDA() {
    centrifugeDA.setToken(await getTokenDA())

    centrifugeDA.on('error', (e) => {
        console.log('error', e)
    })

    centrifugeDA.on('subscribe', (e) => {
        console.log('subscribe', e)
    })

    centrifugeDA.on('connect', async function(context) {
        let clientID = context.client
        centrifugeDA.subscribe('$alerts:donation_'+clientID, message => {
            console.log(message)
        })
    })

    centrifugeDA.connect()
}


if(datoken&&daid){
    startDA()
}
