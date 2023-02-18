'use strict';

    let counterMoves=0;

    function start(){
        let h2=document.querySelector("h2");
        h2.style.color="green";
        let player01=document.getElementById("player01").value;
        let player02=document.getElementById("player02").value;
        reset();
        h2.textContent=player01+" it's your turn!!!";
        
        counterMoves=0;
    }
    
    function insert(element) {
        let h2=document.querySelector("h2");
        let player01=document.getElementById("player01").value;
        let player02=document.getElementById("player02").value;
        if(element.textContent==""){
            counterMoves++;
            if(counterMoves%2==1){
                element.style.color="green";
                element.textContent="X";
                h2.textContent=player02 +" it's your turn!!!";
                h2.style.color="red";
            }else{
                element.style.color="red";
                element.textContent="O";
                h2.textContent=player01+" it's your turn!!!";
                h2.style.color="green";
            }
        }else{
            return;
        }
     
        if((box01.textContent==box02.textContent&&box02.textContent==box03.textContent&&box01.textContent!="")||
        (box01.textContent==box04.textContent&&box04.textContent==box07.textContent&&box01.textContent!="")||
        (box01.textContent==box05.textContent&&box05.textContent==box09.textContent&&box01.textContent!="")||
        (box02.textContent==box05.textContent&&box05.textContent==box08.textContent&&box02.textContent!="")||
        (box03.textContent==box05.textContent&&box05.textContent==box07.textContent&&box03.textContent!="")||
        (box03.textContent==box06.textContent&&box06.textContent==box09.textContent&&box03.textContent!="")||
        (box07.textContent==box08.textContent&&box08.textContent==box09.textContent&&box07.textContent!="")||
        (box04.textContent==box05.textContent&&box05.textContent==box06.textContent&&box04.textContent!="")){
            if(h2.textContent==player02 + " it's your turn!!!"){
                h2.style.color="green";
                h2.textContent=player01 + " is the winner!!!";
                let points01=document.getElementById("player01Wins");
                points01.value++;
                console.log(points01.value);
                let x=document.getElementById("box01");
                x.removeEventListener('click', insert);
            }
            if(h2.textContent==player01 + " it's your turn!!!"){
                h2.style.color="red";
                h2.textContent=player02 + " is the winner!!!";
                let points02=document.getElementById("player02Wins");
                points02.value++;
                console.log(points02.value);
                let x=document.getElementById("box01");
                x.removeEventListener('click', insert);
            }
            
              
        }

        if(box01.textContent!=""&&box02.textContent!=""&&box03.textContent!=""&&box04.textContent!=""&&box05.textContent!=""&&box06.textContent!=""&&box07.textContent!=""&&box08.textContent!=""&&box09.textContent!=""){
            h2.style.color="black";
            h2.textContent="Nobody wins!!!";
        }   
            
    }

    function reset(){
        counterMoves=0;
        let h2=document.querySelector("h2");
        h2.textContent="";
        let box=document.querySelectorAll("div#container div#row div");
        for(let i in box) box[i].textContent="";
    }