

let optionscont = document.querySelector('.options-cont');
let toolscont = document.querySelector('.tools-cont');
let pencilToolcont = document.querySelector('.pencil-tools-cont');
let eraserToolcont = document.querySelector('.eraser-tools-cont');
let pencilimg = document.querySelector('.pen');
let eraser = document.querySelector('.eraser');
let sticky = document.querySelector('.sticky');
let upload = document.querySelector('.upload');
let pencilFlag = false;
let eraserFlag = false;
let optionFlag = true;

optionscont.addEventListener('click' ,(e) => {

    optionFlag = !optionFlag ; 

    if(optionFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconEle = optionscont.children[0];
    iconEle.classList.remove('fa-times');
    iconEle.classList.add('fa-bars');
    toolscont.style.display = 'flex';
    
}

function closeTools(){
    let iconEle = optionscont.children[0];
    iconEle.classList.add('fa-times');
    iconEle.classList.remove('fa-bars');
    toolscont.style.display = 'none';

    pencilToolcont.style.display ='none';
    eraserToolcont.style.display = 'none';
    
}

 pencilimg.addEventListener('click', (e)=>{
     
    pencilFlag =!pencilFlag;

    if(pencilFlag) pencilToolcont.style.display = 'block';
    else pencilToolcont.style.display = 'none';
})

 eraser.addEventListener('click', (e)=>{
    eraserFlag =!eraserFlag;
    
    if(eraserFlag) eraserToolcont.style.display = 'flex'
    else eraserToolcont.style.display='none';
})

upload.addEventListener('click' ,(e) =>{
       
  let input = document.createElement('input');
  input.setAttribute('type' ,'file');
  input.click();

  input.addEventListener('change',(e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
  
  let stickycont = document.createElement('div');
  stickycont.setAttribute("class","sticky-cont");
  stickycont.innerHTML =
   `<div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
  </div>
  <div class="note-cont">
     <img src='${url}'/> 
  </div> `;
   
  document.body.appendChild(stickycont);

  


  let minimize = stickycont.querySelector('.minimize');
  let remove = stickycont.querySelector(".remove");

  noteAction(minimize ,remove ,stickycont)


  



  stickycont.onmousedown = function(event) {
      // (1) prepare to moving: make absolute and on top by z-index
      stickycont.style.position = 'absolute';
      stickycont.style.zIndex = 1000;
    
      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(stickycont);
    
      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
          stickycont.style.left = pageX - stickycont.offsetWidth / 2 + 'px';
          stickycont.style.top = pageY - stickycont.offsetHeight / 2 + 'px';
      }
    
      // move our absolutely positioned ball under the pointer
      moveAt(event.pageX, event.pageY);
    
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
    
      // (2) move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // (3) drop the ball, remove unneeded handlers
      stickycont.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        stickycont.onmouseup = null;
      };
    
    };
    stickycont.ondragstart = function() {
      return false;
    };
  })
})


sticky.addEventListener('click',(e) =>
{
    let stickycont = document.createElement('div');
    stickycont.setAttribute("class","sticky-cont");
    stickycont.innerHTML = `<div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
    <textarea spellcheck="false"></textarea> 
    </div> `;
     
    document.body.appendChild(stickycont);

    
  
  
    let minimize = stickycont.querySelector('.minimize');
    let remove = stickycont.querySelector(".remove");

    noteAction(minimize ,remove ,stickycont)


    



    stickycont.onmousedown = function(event) {
        // (1) prepare to moving: make absolute and on top by z-index
        stickycont.style.position = 'absolute';
        stickycont.style.zIndex = 1000;
      
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(stickycont);
      
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            stickycont.style.left = pageX - stickycont.offsetWidth / 2 + 'px';
            stickycont.style.top = pageY - stickycont.offsetHeight / 2 + 'px';
        }
      
        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (3) drop the ball, remove unneeded handlers
        stickycont.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          stickycont.onmouseup = null;
        };
      
      };
      stickycont.ondragstart = function() {
        return false;
      };

})



function noteAction(minimize ,remove ,stickycont){
  console.log(minimize); // Check if minimize element is selected
  console.log(remove); // Check if remove element is selected

  remove.addEventListener('click', (e) => {
      console.log("Remove clicked");
      stickycont.remove();
  });
  minimize.addEventListener('click' ,(e) => {
       let notecont = stickycont.querySelector('.note-cont');
       let display = getComputedStyle(notecont).getPropertyValue('display');
       if(display === 'none') notecont.style.display = 'block';
       else notecont.style.display = 'none';
     
  });
}
