
const videoSection = document.querySelector('section')
fetch('https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCv3nA8R49Dbi2sekQeye0Qg&key=AIzaSyBBEJ6SSSeKxnttpOQ2NqG1_S4rAHnLgiI')
  .then(res => res.json())
  .then(data=>{
    data.items.forEach(el => {
        videoSection.innerHTML += ` 
        <a target= "blank" href= "https://www.youtube.com/watch?v=${el.snippet.resourceId} 
        "class=youtube-videos">
        <img src="${el.snippet.thumbnails.maxres.url}" />
        <h3>${el.snippet.title}<h3>
             </a>`  
        
    });
    console.log(data.items[0]);
  })
  


