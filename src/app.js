const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require ('express') 
const hbs = require('hbs') //setting up handlebars to render templates!
 const app = express()
 const port = process.env.PORT || 3000
//setting up express configurations
  const publicPath = path.join(__dirname , '../public')
  const viewPath = path.join(__dirname , '../templates/views' )
  const partialsPath = path.join(__dirname , '../templates/partials')
 // response argument is used to send something back from 
 
 //the server, back to the client!

  app.use(express.static(publicPath)) //setting up static content manager!
  app.set('view engine', 'hbs')
  app.set('views' , viewPath )
  hbs.registerPartials(partialsPath);


  // setting up routes for out webiste!
  app.get('',(req ,res)=>{
      res.render('index', {
          name:'Muhamamd Adeen rabbani',
          title: 'Weather Application'
      })
  })

  app.get('/about', (req , res) =>{
      res.render('about', {
          name:'Muhamamd Adeen Rabbani',
          title:'about Page'
      })
  })


  app.get('/help', (req , res) =>{
    res.render('help', {
        name:'Muhamamd Adeen Rabbani',
        message:'You are on the help page!!',
        title: 'Help page'
    })
})

 // recieving any request from /weather page!
 app.get('/weather' , (req , res)=>{
     
    if(!req.query.address){
        return res.send({
            Error: 'No address was entered!'
        })
    }
     //making a request to geocode the loaction provided
    geocode(req.query.address , (error , geocodes)=>{
        if(error){
            return res.send({Error: error})
        }
        //sending the geocode data of the provided location to fetch the 
        //weather data from API
        
        forecast(geocodes,( error, response)=>{
            if(error){
               return res.send({Error: error})
            }
            //sending the fetch data back, "We received from forecast()"
            res.send({
                Forcast: response,
                Location: geocodes.Location,
                Search: req.query.address
            })
        })
    })
})

 // setting up error pages, when server couldnt serve the requested content
 // These are declared at the end for a reason that, express will match the call
 //from start and, when the route matches it just ignore the other content below.
 // SO WE ALWAYS NEED TO RENDER ERROR PAGES WHEN REQUEST DOESNT MATCH WITH ANY CALL!
 app.get('/help/*' , (req, res) =>{
    res.render('error', {
        error:'Help article not found!',
        name:'Muhammad Adeen Rabbani',
        title: 'Error Page!'
    })
})
app.get('/' , (req, res) =>{
    res.render('error', {
        error:'Page not found!',
        name:'Muhammad Adeen Rabbani',
        title: 'Error Page!'
    })
})


 app.get('/*' , (req, res) =>{
     res.render('error', {
         error:'Page not found!',
         name:'Muhammad Adeen Rabbani',
         title: 'Error Page!'
     })
 })

 app.listen(port,()=>{
     console.log('server is up and running!');
     
 })
