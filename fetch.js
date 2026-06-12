fetch('http://localhost:8082/').then(async r => { console.log(r.status); console.log(await r.text()) }).catch(console.error)
