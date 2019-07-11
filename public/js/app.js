const weatherForm = document.querySelector('form')
const userSearch  = document.querySelector('input')
heading = document.querySelector('#whead');
weather = document.querySelector('p');
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = userSearch.value
    
    heading.textContent = ''
    weather.textContent = "Loading..."

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{

     response.json().then((data)=>{
         if(data.Error){
           
            heading.classList.remove("pass")
            heading.classList.add('error');
            heading.textContent = 'Oops! Error Occurred!'
          weather = document.querySelector('p');
           weather.textContent = data.Error
         }else{
             let html = '';
        // heading = document.querySelector('#whead');
         heading.classList.remove('error');
         heading.classList.add('pass');
        // weather = document.querySelector('p');
         heading.textContent= 'We have Found Your Weather Search!'
          
         html+= `
           <h2>Forcast </h2>${data.Forcast}
           <h2>Location </h2> ${data.Location}
           <h2>Search  </h2> ${data.Search}  

         `;
         weather.innerHTML= html
         console.log(html);
         heading.classList.remove('success')
         }
     })
})

})
