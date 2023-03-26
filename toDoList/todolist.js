//get tasks from localstorage
let tasks=JSON.parse(localStorage.getItem("myTasks"));
if(tasks==null) tasks=[];
for(i in tasks)
console.log('loading tasks '+tasks[i].checked);
let orderByDateAdded=[];
let orderByDateDue=[];
let orderByChecked=[];

window.addEventListener('load',()=>{
   checkDue();

   //date today 
   let d=document.getElementById('dateDue');
   d.value=new Date().toISOString().split('T')[0] ;
   //console.log(d.value)
  
   //appear tasks to div#container
   let div=document.getElementById('container');
   for(i in tasks){
       console.log(tasks[i].name)
       //add task name
       let divTask=document.createElement('div');
       divTask.setAttribute('class', 'task')
       let pTask=document.createElement('p')
       pTask.textContent=tasks[i].name;
       divTask.appendChild(pTask);
       div.appendChild(divTask);
       console.log('divTask: '+divTask)
       //add checkbox
       let checkbox=document.createElement('input');
       checkbox.setAttribute('type', 'checkbox');
       checkbox.setAttribute('class', 'checkbox');
       divTask.appendChild(checkbox);
       console.log('check'+checkbox.checked);
       console.log(tasks[i].checked)
       if(tasks[i].checked===true){
           checkbox.checked=true;
       }
       //add del
       let del=document.createElement('div');
       del.setAttribute('class', 'del');
       del.textContent='🗑';
       divTask.appendChild(del);
       del.setAttribute('onclick', 'deleteTask(this)');
       //add dateAdd
       let date=tasks[i].dateAdd;
       let pDate=document.createElement('p');
       pDate.setAttribute('class', 'date')
       divTask.appendChild(pDate);

       dateDue=tasks[i].dateDue;
       dateDue=new Date(dateDue);
       //console.log(dateDue); 
  
      pDate.innerHTML='<b>date added: </b>'+date+'  '+'<b>date due: </b>'+ dateDue.toLocaleDateString()+', 11:59:59 μ.μ';
      

      orderByChecked.push({name:divTask, isChecked:checkbox});
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
      
   } 
   console.log(orderByChecked)
})


let divWarning=document.getElementById('warningArea');
   console.log(divWarning);
   divWarning.addEventListener('mouseclick', checkDue())

function add(){

  let newTask=document.getElementById("task").value;
  if(newTask!=''){
  let divTask=document.createElement('div');
  let pTask=document.createElement('p')
  pTask.textContent=newTask;
  divTask.appendChild(pTask);
  let div=document.getElementById("container");
  div.appendChild(divTask);
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
  console.log('divTask: '+divTask)

  let date=new Date().toLocaleString();

  let pDate=document.createElement('p');
  pDate.setAttribute('class', 'date')
  divTask.appendChild(pDate);

   let dateDue=document.getElementById('dateDue');
   dateDue=dateDue.value;
   dateDue=new Date(dateDue);
   console.log(dateDue); 
  
  pDate.innerHTML='<b>date added: </b>'+date+'  '+'<b>date due: </b>'+ dateDue.toLocaleDateString()+', 11:59:59 μ.μ';

  tasks.push({name:newTask, dateAdd:date, dateDue:dateDue, checked:checkbox.checked})
  console.log('tasks after add: '+tasks);

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

  orderByChecked.push({name:divTask, isChecked:checkbox.checked});
  for(i in orderByChecked){
      if(orderByChecked[i].isChecked===true){
         let current=orderByChecked[i];
         orderByChecked.splice(i,1);
         orderByChecked.unshift(current);
      }
  } 
  console.log(orderByChecked)

  checkDue(); 
}
}

function deleteTask(element){
   
   let div =document.getElementById('container');
   console.log(element);
   var x = element.parentElement;
   console.log(x.querySelector('p').textContent);
   
   div.removeChild(x);

   //delete the element from the arrays
    for(i in tasks){
       if(tasks[i].name==x.querySelector('p').textContent){
           tasks.splice(i,1);
       }    
   }
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

   console.log('tasks after deletion: '+tasks)
   checkDue();
} 

function orderby(value,orderByChecked, orderByDateAdded, orderByDateDue){
   let div=document.getElementById('container');
   
   console.log('tasks'+tasks)
   let divTasks=div.querySelectorAll('div.task');
   for(i=0;i<divTasks.length;i++){
       div.removeChild(divTasks[i])
       console.log(div)
   }
   for(i in orderByChecked){
      if(orderByChecked[i].isChecked===true){
         let current=orderByChecked[i];
         orderByChecked.splice(i,1);
         orderByChecked.unshift(current);
      }
  } 
   console.log(orderByChecked)
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
           div.appendChild(orderByChecked[i].name);
       }
       return;
   } 
   if(value==6){
       for(i=orderByChecked.length-1;i>-1;i--){
           console.log(orderByChecked[i].id)
           div.appendChild(orderByChecked[i].name);
       }
       return;
   }
   
  
}


function checkDue(){
   let p=document.querySelector('div#warningArea p');
   p.setAttribute('class', 'warning');
   let divWarning=document.getElementById('warningArea');
   console.log(divWarning);
   let today=new Date();
   console.log(today);
   //console.log(orderByDateDue[0]);
   let message='';
   let cnt=0;
   for(i in tasks){
       let d=new Date(tasks[i].dateDue);
       console.log(d.getDate())
       if(d.getDate()===today.getDate()&&d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear()){
           cnt++;
           if(cnt==1){message+=`${tasks[i].name}`;}
           else{message+=`, ${tasks[i].name}`;}
       }
   }
   
   if(cnt>0){
       if(cnt===1) p.innerHTML=`Your task <i>${message}</i> is due today!!!`;
       if(cnt>1)p.innerHTML=`Your tasks <i>${message}</i> are due today!!!`;
   }else{p.innerHTML=''}
  
}

function save(){
   tasks = tasks.sort(function (a, b) {
       var dateA = a.dateAdd;
       console.log(dateA);
       var dateB = b.dateAdd;
         return dateA > dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
       });
       console.log('mytasks befpre saving: '+tasks)
       let divTasks=document.querySelectorAll('div.task')
       for(i in orderByChecked){
           console.log(orderByChecked[i].isChecked)
       }
       for(i in tasks){
           tasks[i].checked=orderByChecked[i].isChecked.checked;
           console.log(tasks[i].checked)
           //console.log(JSON.stringify(tasks[i].checked))
       }
       console.log(tasks)
   localStorage.setItem("myTasks", JSON.stringify(tasks));
   console.log('mytasks after saving: '+localStorage.getItem("myTasks"));
   document.querySelector('div#warningArea p').innerHTML="<b style='color:green'>The changes have been saved!!!";
}