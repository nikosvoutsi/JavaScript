'use strict';

    window.addEventListener("load", init);

    function init(){
        let images=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        let newArr=[];
        draw();
    }
    let images=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    let newArr=[];

    function draw(){ 
        images=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; 
        newArr=[];
        for(let i=1; i<21; i++){
           let x=Math.floor(Math.random()*images.length);
           newArr.push(images[x]);
           images.splice(x,1);
           console.log(images);
           let src=document.querySelector("div#container img:nth-child("+i+")");
           src.setAttribute("src","images/trapoula.jpg")
        }
        let points01=document.getElementById("points01");
        let points02=document.getElementById("points02");
        points01.value=0;
        points02.value=0;
    }
    console.log(newArr)
    draw();

    function getImage(child, img){
        let x=document.querySelector("div#container img:nth-child("+child+")");
        if(x.getAttribute('src')=='images/trapoula.jpg'){
            x.setAttribute("src","images/"+newArr[img]+".jpg");  
        }else
            x.setAttribute("src","images/trapoula.jpg");
    }