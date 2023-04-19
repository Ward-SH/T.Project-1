// check if there is local storage color option
let mainColors =localStorage.getItem("color_option");
// console.log(mainColors);

if(mainColors !==null){
    // console.log('local storage is not empty you can set it on root now')
    // console.log(localStorage.getItem("color_option"));
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));


  
    
        //remove active class from all color list items
     document.querySelectorAll(".colors-list li").forEach(element=>{

        element.classList.remove('active');

         //add active class on element withd data color === local storage item

            if(element.dataset.color === mainColors){
                //add active class
                element.classList.add("active");
            }

    });

   

}

// random backgrounds option
let backgroundOption = true;

//variable to control the background interval
let bkInterval;

// check if there is local storage random background item
let backgroundLocalItem= localStorage.getItem("background_option");

//check if random background local storage is not empty

if (backgroundLocalItem !==null) {
   // console.log(typeof(backgroundLocalItem))//string not boolean

   if (backgroundLocalItem === 'true') {
    backgroundOption= true;
   }else{
    backgroundOption=false;
   }

//    console.log(backgroundLocalItem);

//remove  active class from all spans
document.querySelectorAll(".random-backgrounds span").forEach(element=>{
    element.classList.remove('active');
});
//when refreshing it will stay a its was put before
 if(backgroundLocalItem=== 'true'){
    document.querySelector('.random-backgrounds .yes').classList.add("active");

 }else{
    document.querySelector('.random-backgrounds .no').classList.add("active");
 }
}



// toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick =function(){
   //toggle class fa spin for rotation on self
    this.classList.toggle("fa-spin");

// toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("opened");


};

//switch colors
const colorsLi =document.querySelectorAll(".colors-list li");

// console.log(colorsLi)


//loop on all list items
colorsLi.forEach(li=>{
    // console.log(li);

        //click on every list items

    li.addEventListener("click",(e)=>{
        console.log(e.target.dataset.color);
        //set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color_option",e.target.dataset.color)
        handleActive(e);
 //////////////////old way/////////////////////
        // //remove active class from childrens
        // e.target.parentElement.querySelectorAll(".active").forEach(element=>{

        //     element.classList.remove('active');
        // });

        // // add active class on target
        // e.target.classList.add('active');
/////////////////////////end old way/////////////

    });
});

//switch random background option
const randomBackEl =document.querySelectorAll(".random-backgrounds span");

// console.log(colorsLi)


//loop on all spans
randomBackEl.forEach(span=>{

        //click on every span
    span.addEventListener("click",(e)=>{

        handleActive(e);

        if(e.target.dataset.backgrounds==='yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
            // console.log("yes");
        }else{
            // console.log("no");
            backgroundOption = false;
            clearInterval(bkInterval);
            localStorage.setItem("background_option",false);
        }
    });
});







// select landing page element
let landingPage =document.querySelector('.landing-page');
//get array of images
let imgsArray=['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg'];



//function to randomize imgs
function randomizeImgs(){
    if(backgroundOption===true){
        bkInterval= setInterval(()=>{
            //get random number
        let randomNumber=Math.floor(Math.random() * imgsArray.length);
        // change background image url
        landingPage.style.backgroundImage = 'url("img/' +imgsArray[randomNumber] + '")';
        },3000);
    }
}
randomizeImgs();





//select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll =function(){
    //skills offset top
    let skillsOffsetTop =ourSkills.offsetTop;
    //skills outer height
    let skillsOuterHeight=ourSkills.offsetHeight;
    //Window height
    let windowHeight=this.innerHeight;
    //window scrollTop
    let windowScrollTop =this.pageYOffset;




    console.log(  (skillsOffsetTop + skillsOuterHeight - windowHeight));
    console.log( windowScrollTop);

    let allskills =document.querySelectorAll(".skill-box .skill-progress span");
    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

     

     allskills.forEach(skill =>{

        skill.style.width = skill.dataset.progress;

     }); 
    } else{
        allskills.forEach(skill=>{
            skill.style.width = 0;
        })
    }
    
};





//create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img=>{
    img.addEventListener('click',(e)=>{

        //create overlay element
        let overlay = document.createElement("div")

        //add class to overlay
        overlay.className='popup-overlay';
        //append overlay to body
        document.body.appendChild(overlay);

        //create the popup were we put the image
        let popupBox = document.createElement("div");

        //add class to the popupBox
        popupBox.className='popup-box';
        if(img.alt !== null){

            //create heading
            let imgHeading =document.createElement("h3");

            //create text for heading
            let imgText =document.createTextNode(img.alt);

            //append the text to the heading
            imgHeading.appendChild(imgText);

            //append the heading to the popup box
            popupBox.appendChild(imgHeading);
            
        }
        //create the image
        let popupImage = document.createElement("img");

        // console.log(img.src);
        //set image source
        popupImage.src=img.src;

        //add image to popup box
        popupBox.appendChild(popupImage);

        //append the popup box to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton =document.createElement("span");

        //create the close button text
        let closeButtonText=document.createTextNode("X");
        
        //append text to close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className ='close-button';

        //add close button to the popup box
        popupBox.appendChild(closeButton);
    });


});

//close popup

document.addEventListener('click',function(e){

    if(e.target.className == 'close-button'){
        // remove the current popup
        e.target.parentNode.remove();

        //remove the overlay//and another way to remove
        document.querySelector('.popup-overlay').remove();
    }

});



//select all bullets
 const allBullets =document.querySelectorAll(".nav-bullets .bullet");

//     allBullets.forEach(bullet=>{
//     bullet.addEventListener("click",(e)=>{
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior:'smooth'
//         });
//     });
// });


//select all links
 const allLinks =document.querySelectorAll(".links  a");

//     allLinks.forEach(link=>{
//     link.addEventListener("click",(e)=>{
//         e.preventDefault();


//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior:'smooth'
//         });
//     });
// });

function scrollToSomewhere(elements){
  
 elements.forEach(element=>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();

        
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth'
        });
    });
 });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
//handle ACTIVE state
function handleActive(ev){
    
        //remove active class from all spans
        ev.target.parentElement.querySelectorAll(".active").forEach(element=>{

            element.classList.remove('active');
        });

        // add active class on target
        ev.target.classList.add('active');
        
}


let bulletsSpan =document.querySelectorAll(".bullets-option span");
let bulletsContainer =document.querySelector(".nav-bullets");

let bulletLocalItem=localStorage.getItem("bullets_option");
if(bulletLocalItem!== null){
    // console.log('not empty');

   bulletsSpan.forEach(span=>{
    span.classList.remove("active");
   });

   if(bulletLocalItem === 'block'){
    bulletsContainer.style.display ='block';
    document.querySelector(".bullets-option .yes").classList.add("active");

   }else{

    bulletsContainer.style.display ='none';
    document.querySelector(".bullets-option .no").classList.add("active");

   }


}

bulletsSpan.forEach(span=> {

    span.addEventListener("click",(e)=>{

        if(span.dataset.display === 'show'){
            bulletsContainer.style.display ='block';

            localStorage.setItem("bullets_option",'block');
        }else{
           bulletsContainer.style.display= 'none' 
           localStorage.setItem("bullets_option",'none');

        }
        handleActive(e);
    });

});


//reset button

document.querySelector(".reset-options").onclick = function(){

    localStorage.clear();//will delete every thing
    // localStorage.removeItem("bullets-option");
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");

    
    //reload window
    window.location.reload();
}



//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks =document.querySelector(".links");

toggleBtn.onclick =function(e){

    //stop propagation
    e.stopPropagation();

    //toggle class "menu-active" on button
    this.classList.toggle("menu-active");
    // toggle class "open" on links
    tLinks.classList.toggle("open");

};

// click anywhere outside the menu and toggle button
document.addEventListener("click",(e)=>{
// console.log(e.target)

    if(e.target!== toggleBtn && e.target!==tLinks){
        // console.log("this is not the button and not the menu");
        //check if menu is open
        if(tLinks.classList.contains("open")){
            // console.log("menu is open");                //toggle class "menu-active" on button
            toggleBtn.classList.toggle("menu-active");
            // toggle class "open" on links
            tLinks.classList.toggle("open");
        }
    }

});
//stop propgation on menu
tLinks.onclick =function(e){
    e.stopPropagation();
}//this means anything inside the menu will be involved with the menu
