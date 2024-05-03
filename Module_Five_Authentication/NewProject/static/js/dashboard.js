const token = localStorage.getItem('token')

if (token) {

    fetch("http://localhost:3000/movies/", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        redirect: "follow"
    })
        .then(rawData => rawData.json())
        .then(movies => document.write(JSON.stringify(movies)))

}