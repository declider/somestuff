async function getTokenDA() {
    let res = await fetch('https://www.donationalerts.com/api/v1/user/oauth', {
        method: 'get'
    })
    let socket_connection_token = (await res.json()).data.socket_connection_token
    return socket_connection_token
}


async function startDA() {
    let socket_connection_token = await getTokenDA()
    centrifugeDA.setToken(socket_connection_token)

    centrifugeDA.on('error', (e) => {
        console.log('error', e)
    })

    centrifugeDA.on('subscribe', (e) => {
        console.log('subscribe', e)
    })

    centrifugeDA.on('connect', (e) => {
        console.log(e)
        centrifugeDA.subscribe('$alerts:donation_'+daid, message => {
            let sum = message.data.amount_in_user_currency
            add_sum(sum)
        })
    })

    centrifugeDA.connect()
}


if(datoken&&daid){
    startDA()
}
