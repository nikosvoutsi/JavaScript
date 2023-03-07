window.addEventListener('load',()=>{
    let d=document.getElementById('dateDue');
    d.value=new Date().toISOString().split('T')[0] ;
    console.log(d.value)
})
let orderByDateAdded=[];
let orderByDateDue=[];
let orderByChecked=[];
let order = document.getElementById('order');
order=order.value;
console.log(order);

let divWarning=document.getElementById('warningArea');
    console.log(divWarning);
    divWarning.addEventListener('mouseclick', checkDue())

function add(){

   let newTask=document.getElementById("task").value;
   let divTask=document.createElement('div');
   let pTask=document.createElement('p')
   pTask.textContent=newTask;
   divTask.appendChild(pTask);
   let div=document.getElementById("container");
   if(newTask!='')div.appendChild(divTask);
   let checkbox=document.createElement('input');
   checkbox.setAttribute('type', 'checkbox');
   checkbox.setAttribute('class', 'checkbox');
   divTask.appendChild(checkbox);
   divTask.setAttribute('class', 'task')
   let del=document.createElement('div');
   del.setAttribute('class', 'del');
   del.textContent='🗑';
   divTask.appendChild(del);
   del.setAttribute('onclick', 'deleteTask(this)');

   let date=new Date().toLocaleString();

   let pDate=document.createElement('p');
   pDate.setAttribute('class', 'date')
   divTask.appendChild(pDate);

    let dateDue=document.getElementById('dateDue');
    dateDue=dateDue.value;
    dateDue=new Date(dateDue);
    console.log(dateDue); 
   
   pDate.innerHTML='<b>date added: </b>'+date+'  '+'<b>date due: </b>'+ dateDue.toLocaleDateString()+', 11:59:59 μ.μ';

   
   console.log(order);

   orderByDateAdded.push({id:divTask, dateAdded:date});
   orderByDateAdded.sort((a,b)=>a.dateAdded-b.dateAdded);
   console.log(orderByDateAdded);

   orderByDateDue.push({id:divTask, dateDueTo:dateDue});
   /* orderByDateDue.sort((a,b)=>a.dateDueTo-b.dateDueTo); */
   orderByDateDue = orderByDateDue.sort(function (a, b) {
    var dateA = new Date(a.dateDueTo).getTime();
    var dateB = new Date(b.dateDueTo).getTime();
    return dateA > dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
   });
   console.log(orderByDateDue);

   orderByChecked.push({id:divTask, isChecked:checkbox});
   for(i in orderByChecked){
       if(orderByChecked[i].isChecked.checked==true){
          let current=orderByChecked[i];
          orderByChecked.splice(i,1);
          orderByChecked.unshift(current);
       }
   } 
   console.log(orderByChecked[0].isChecked.checked);
   
   checkDue();
   
}

function deleteTask(element){
    let div =document.getElementById('container');
    console.log(element);
    var x = element.parentElement;
    console.log(x);
    
    div.removeChild(x);

    //delete the element from the arrays
    for(i in orderByDateAdded){
        if(orderByDateAdded[i].id==x){
            orderByDateAdded.splice(i,1);
        }    
    }
    for(i in orderByDateDue){
        if(orderByDateDue[i].id==x){
            orderByDateDue.splice(i,1);
        }    
    }
    for(i in orderByChecked){
        if(orderByChecked[i].id==x){
            orderByChecked.splice(i,1);
        }    
    }
    console.log(orderByDateAdded);
    console.log(orderByDateDue);
    console.log(orderByChecked); 
    checkDue();
    
} 

function orderby(value){
    console.log(value);
    let div=document.getElementById('container');
    //console.log(orderByDateDue[1]>orderByDateDue[0]);
    for(i in orderByChecked){
       if(orderByChecked[i].isChecked.checked==true){
          let current=orderByChecked[i];
          orderByChecked.splice(i,1);
          orderByChecked.unshift(current);
       }
   } 
    for(i in orderByChecked){
        div.removeChild(orderByChecked[i].id);
    }
    if(value==1){
        for(i in orderByDateAdded){
            div.appendChild(orderByDateAdded[i].id);
        }
    }
    if(value==2){
        for(i=orderByDateAdded.length-1; i>-1; i--){
            div.appendChild(orderByDateAdded[i].id);
        }
    }
    if(value==3){
        for(i in orderByDateDue){
            div.appendChild(orderByDateDue[i].id);
        }
    }
    if(value==4){
        for(i = orderByDateDue.length-1; i>-1; i--){
            div.appendChild(orderByDateDue[i].id);
        }
    }
    if(value==5){
        for(i in orderByChecked){
            div.appendChild(orderByChecked[i].id);
        }
    }
    if(value==6){
        for(i=orderByChecked.length-1;i>-1;i--){
            div.appendChild(orderByChecked[i].id);
        }
    }
}


function checkDue(){
    let p=document.querySelector('div#warningArea p');
    p.setAttribute('class', 'warning');
    let divWarning=document.getElementById('warningArea');
    console.log(divWarning);
    let today=new Date();
    console.log(today);
    console.log(orderByDateDue[0].dateDueTo.getDate()===today.getDate());
    //console.log(orderByDateDue[0]);
    let message='';
    let cnt=0;
    for(i in orderByDateDue){
       if(orderByDateDue[i].dateDueTo.getDate()===today.getDate()){
           cnt++;
           let task=orderByDateDue[i].id.querySelector('p');
           console.log(task)
           if(cnt==1){message+=`${task.textContent}`;}
           else{message+=`, ${task.textContent}`;}
           
        }
    }
    if(cnt>0){
        if(cnt===1) p.innerHTML=`Your task <i>${message}</i> is due today!!!`;
        if(cnt>1)p.innerHTML=`Your tasks <i>${message}</i> are due today!!!`;
    }else{p.innerHTML=''}
   
}

localStorage.setItem("lastname", "Smith");
// Retrieve
console.log(localStorage.getItem("lastname"));