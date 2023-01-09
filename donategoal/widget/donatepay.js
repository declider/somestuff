async function getUserId() {
    let res = await fetch('https://donatepay.ru/api/v1/user?access_token='+dptoken, {
        method: 'get'
    })
    return (await res.json()).data.id
}


async function getTokenDP() {
    let res = await fetch('https://donatepay.ru/api/v2/socket/token', {
        method: 'post',
        body: JSON.stringify({
            access_token: dptoken
        })
    })
    return (await res.json()).token
}


async function startDP() {
    centrifugeDP.setToken(await getTokenDP())

    let id = await getUserId()

    centrifugeDP.subscribe("$public:"+id, function (message) {
        console.log("message",message)
        let sum = message.data.notification.vars.sum
        add_sum(sum)
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
