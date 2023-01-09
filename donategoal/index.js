async function auth() {
    
    const result = await fetch('https://declider.deta.dev/donategoalforhuman', {
        method: "POST",
        body: JSON.stringify({
            "code":code
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    })
    const data = await result.json()
    return data
    
}

let url = new URL("https://declider.github.io/somestuff/donategoal/widget/widget.html")

let params = (new URL(document.location)).searchParams
const code = params.get("code") || undefined

if(code!==undefined) {
    auth().then(data => {
        console.log(data)
        url.searchParams.set("daid", data["id"])
        url.searchParams.set("datoken", data["token"])
        
        document.getElementById("link").value = url.toString()
    })
}

function addDPToken() {
    let dptoken = document.getElementById("dptoken").value
    url.searchParams.set("dptoken", dptoken)

    document.getElementById("link").value = url.toString()
}

function copy_link() {
    let link = document.getElementById("link").value
    navigator.clipboard.writeText(link)
    alert("Ссылка для OBS скопирована!")
}
