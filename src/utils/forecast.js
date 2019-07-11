 const request = require('request')

const forecast = (data, callback)=>
{
    const url = 'https://api.darksky.net/forecast/ff426527c8791c254c2af63239f286a0/'+ encodeURIComponent(data.Latitude)+','+ encodeURIComponent(data.Longitude)+'?units=si'
    request({url , json:true}, (error, {body})=>{
        if(error)
        //if there is an error then sending the error back and setinng up the respos etag  underfined
        callback('Unable to connect to weather services' , undefined)
        else if (body.error)
        callback('Unable to find the Location!', undefined)
        else{
            //console.log(response.body.currently.temperature);
            
             callback(undefined , 'Its currently ' + body.currently.temperature + ' Degrees, and there are ' +body.currently.precipProbability +'% chances of rain!' )
        }
    })
}

module.exports = forecast