async function getUserId() {
    let res = await fetch('https://donatepay.ru/api/v1/user?access_token='+dptoken, {
        method: 'get',
        headers: {
            "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
            "Content-Type": "application/json" // this shows the expected content type
        }
    })
    return (await res.json()).data.id
}


async function getTokenDP() {
    let res = await fetch('https://donatepay.ru/api/v2/socket/token', {
        method: 'post',
        body: JSON.stringify({
            access_token: dptoken
        }),
        headers: {
            "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
            "Content-Type": "application/json" // this shows the expected content type
        }
    })
    return (await res.json()).token
}


async function startDP() {
    centrifugeDP.setToken(await getTokenDP())

    let id = await getUserId()

    centrifugeDP.subscribe("$public:"+id, function (message) {
        console.log(message)
    });

    centrifugeDP.on('error', (e) => {
        console.log('error', e)
    })

    centrifugeDP.on('subscribe', (e) => {
        console.log('subscribe', e)
    })

    centrifugeDP.on('connect', (e) => {
        console.log(e)
    })

    // Метод фактического подключения к серверу
    centrifugeDP.connect()
}


if(dptoken){
    startDP()
}
