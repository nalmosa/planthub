
var ytAPI = "AIzaSyB1wxbpiJoa90aLYGo-ZJOoRmCGQEuM2jY"
//var searchedPlantName = currentSearch.commonname **Update once you have plantprofile.js
var searchedPlantName = "cactus"
var plantNameSearched = `%22${searchedPlantName}+care%22`


fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${plantNameSearched}&key=${ytAPI}`)
.then((ytResults)=>{
    return ytResults.json()
}).then((data)=>{
    console.log(data)
    let videos = data.items
    let videoContainer = document.querySelector(".ytContainer")
    for(video of videos){
        videoContainer.innerHTML += `
            <img src="${video.snippet.thumbnails.default.url}">
        `
    }
})