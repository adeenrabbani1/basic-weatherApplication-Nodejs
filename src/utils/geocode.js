const request = require('request')
const geocode = (address, callback)=>{
  
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRlZW4wMSIsImEiOiJjanhqeWx6eXUxMjdjM3hudm1hb3djYjNtIn0.O9zfcq17I3vhsDE86Gxfcw&limit=1'
   //making a request is asynchronous. Which mean it uses the same node concepts that run in the background
    request({url , json: true} , (error, response) => {
        if(error)
        callback('Unable to connect to Weather Services!', undefined);
        else if (response.body.features.length ===0)
        callback('Unable to find the location provided! Try another search..' , undefined);
        else {
            callback(undefined, {
                Longitude : response.body.features[0].center[0],
                Latitude: response.body.features[0].center[1],
                Location: response.body.features[0].place_name
            })
        }
        
    })
 }
 module.exports = geocode

  