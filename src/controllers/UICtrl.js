const UICtrl = (function(){
  const UISelectors = {
    formSubmit: '#start-button',
    startingInput: '#start-input',
    createInput: '#create-input',
    buttonAfterLayoutLoad: '.button-with-class'
  }

  
  const person = {
    items: [], // stores characters from renderPeople
    stage: 0
  }

  return {
    getSelectors: function(){
      return UISelectors;
    },
    getStage: function(){
      return person.stage;
    },
    updateStage: function(){
      person.stage++;
      console.log('stage updated, now stage: ', person.stage);
    },
    
 
    getPersonById: function(id){
      // loop through the items and match the id

      let found = null;
      person.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });

      return found;
    },

  

    // Starting animation, display ="block" all UI
    showPersonUi: function(){
      setTimeout(() =>{
        const buttons = document.querySelectorAll(UISelectors.buttonAfterLayoutLoad);
        // console.log(buttons);
        buttons.forEach((button) => {
          button.style.display = "block";
          setTimeout(()=> {
            button.style.opacity = "1";
          }, 50)
        });
        document.querySelector('.statistics').style.display = "block";
        setTimeout(()=> {
          document.querySelector('.statistics').style.opacity = "1";
        }, 50)

      }, 2500)
    },

 

    renderPeople: function(data){
      //console.log(data);
      document.querySelector('.welcome-text').style.display = "block";
   
      let output = '';
        data.forEach(function(post){

          person.items.push(post);  // put each json unit into person.items
          let delay = (post.id)*150;
          
          output += 
          `
          <div id="${post.id}" class="person-block" style="animation-delay: ${delay}ms">
            <div class="img-container">
              <img src="${post.image}">
            </div>
            <p>${post.title}</p>
            <p>${post.body}</p>
          </div>
          `;
          
        });

        // add random block
       // let length = person.items;
        let delay = 6*150;
        output += 
        `
        <div class="random-block" style="animation-delay: ${delay}ms">
            <div class="img-container">
              <img src="./img/random.jpg">
            </div>
            <p>Random</p>
            <p>Actor</p>
          </div>
        `;
      
      document.querySelector('.content').innerHTML = output;
      return data
    },

   
    // Add Animation on clicked person [ starting phase ]
    getItemClickEvents: function(){
      const persons = document.querySelectorAll(".person-block");
      persons.forEach((person)=>{
        person.addEventListener('click', function(){

          setTimeout(()=>{
            document.querySelector('.fill-background-top > .welcome-text').style.opacity ="0";
          }, 150);

          setTimeout(()=>{
            let textNode = document.querySelector('.welcome-text');
            // let parent = document.querySelector('.fill-background-top');
            
            textNode.style.animation = "animationText forwards 2.5s";
            textNode.textContent = "Okay, let's start! - click me to begin.";
            
           
          }, 625)


          
          // Setting the coords of person
          let clickedPerson = this;
          let clickedPersonCoords = this.getBoundingClientRect();
          //console.log(clickedPersonCoords);
          let positionLeft = (clickedPersonCoords.x);    // distance from left edge
          let positionTop = (clickedPersonCoords.y);          // distance from top edge

          let contentWidth = document.querySelector('.content').getBoundingClientRect().width;
          let personBlockWidth = this.getBoundingClientRect().width;
          personBlockWidth = personBlockWidth/2;
          positionLeft = positionLeft-contentWidth/2;
          positionLeft = positionLeft+personBlockWidth;
          
          positionTop = positionTop-200;

          // hide siblings of chosen actor
          let content = Array.from(document.querySelector('.content').children);
          content.map((item) => item.style.display ='none' ); // hide all blocks

           
          // set CSS of clicked element
          let personCssSetBeforeAnimation = `display: block; transform: translate(${positionLeft}px, ${positionTop}px);`;
          //clickedPerson.style.cssText = personCssSetBeforeAnimation;
          clickedPerson.style.cssText = personCssSetBeforeAnimation;
          
          // animate chosen block to the top left corner
          personAnimationToTop(clickedPerson);

          // move the item to the top center
          function personAnimationToTop(person){
            setTimeout(function(){
              person.style.transition = 'transform 2s';
              person.style.transform = `translate(0, -200px)`;
              
       
            }, 550);
            
          }
          person.style.pointerEvents = "none";    // prevent from clicking multiple times

        
          
        });
       });
       
    }

    
    
   

   
  }
})();

export default UICtrl;