export const getData = (akiKey, country) =>{
    return fetch(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${akiKey}&format=json`)
    .then(response => response.json())
    .then (json => json.topartists.artist);

}