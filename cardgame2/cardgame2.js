let counter1=0;
    let counter2=0;
    let trexon1;
    let previous1;
    let trexon2;
    let previous2;

    let h2=document.querySelector('h2');
    h2.textContent="Player 1 pick up 2 cards";
    h2.setAttribute('style', 'color:green');
   

    let cards01=["c01","c01","c02","c02","c03","c03","c04","c04","c05","c05","c06","c06"];
    let cards02=["c01","c01","c02","c02","c03","c03","c04","c04","c05","c05","c06","c06"];
    let newArr1=[];
    let newArr2=[];
    for(let i=0;i<12;i++){
        
        let x=Math.floor(Math.random()*cards01.length);
        let y=Math.floor(Math.random()*cards02.length);
        newArr1.push(cards01[x]);
        newArr2.push(cards02[y]);
        cards01.splice(x, 1);
        cards02.splice(y, 1);
        //console.log(x,y);
        }  
        console.log(cards01);
    /* } */

    function draw(){
        window.location.reload();   
    }

    console.log(newArr1);
    console.log(newArr2);

    function insert1(element,index){
        let points1=document.getElementById('points01');
        let points2=document.getElementById('points02');
        if(element.getAttribute('src')=='images/bg.jpg'){
            element.setAttribute('src','images/'+newArr1[index]+'.jpg');
            trexon1=newArr1[index];
            counter1++;
        }else{
            element.setAttribute('src','images/bg.jpg')
        }
        
        if(counter1%2==0){
           let h2=document.querySelector('h2');
           
           if(previous1==trexon1){ 
                points1.value++;
           }
           if(points1.value==6){
            h2.setAttribute('style', 'color:green');
            h2.textContent="Player 1 is the winner with "+points1.value+"-"+points2.value;
            
            let y=document.getElementsByClassName('box02');
            for(i in y){
                y[i].removeAttribute('onclick',`insert2(this, ${i})`);
            }
            }else{
            h2.textContent="Player 2 pick up 2 cards";
            h2.setAttribute('style', 'color:red');
            }
           previous1=null;
        }else{
            previous1=trexon1;
        }
        
        
    }

    function insert2(element,index){
        let points1=document.getElementById('points01');
        let points2=document.getElementById('points02');
        console.log(element.getAttribute("style"))
        if(element.getAttribute('src')=='images/bg2.jpg'){
            element.setAttribute('src','images/'+newArr2[index]+'.jpg');
            trexon2=newArr2[index];
            counter2++;
        }else{
            element.setAttribute('src','images/bg2.jpg')
        }
        if(counter2%2==0){
           
           if(previous2==trexon2){  
                points2.value++;
           }
           previous2=null;
           let h2=document.querySelector('h2');
           if(points2.value==6){
               h2.setAttribute('style', 'color:red');
               h2.textContent="Player 2 is the winner with "+points1.value+"-"+points2.value;
               let x=document.getElementsByClassName('box01');
                for(i in x){
                    y[i].removeAttribute('onclick', 'insert1(this, i)');
                }
           }else{
               h2.textContent="Player 1 pick up 2 cards";
               h2.setAttribute('style', 'color:green');
           }
        }else{
            previous2=trexon2;
        }
        
        
    }