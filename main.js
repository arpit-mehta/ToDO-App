const submit = document.getElementById('submit')
const itemList = document.getElementById('todoRemaining');

submit.addEventListener("click", addToCrudCrud);

function addToCrudCrud(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    let myObj = {
        name: name,
        desc: description,
    };
    axios.post("https://crudcrud.com/api/873ef07ee4524f2a87fde815778d0a6a/todo",myObj)
    .then(res => {
        showUserOnScreen(myObj);
    })
    .catch(err =>{
        console.log(err)
    })
}

function showUserOnScreen(todo){
    const name = todo.name;
    const description = todo.desc;

     //create li
     let li = document.createElement('li');
     let check  = document.createElement("INPUT");
     check.type = 'checkbox';
     let del = document.createElement('button');
     check.id='check';

     //inserting text
     const newliText = document.createTextNode(name+'-'+description)
    let delText = document.createTextNode('X');
    li.appendChild(newliText);
    del.appendChild(delText);
    
    let container = document.querySelector('#todoRemaining');
    container.appendChild(li);
    li.appendChild(check);
    li.appendChild(del);
    document.getElementById('check').checked=false;
    del.onclick = () => {
        let idUser=todo._id;
        axios.delete("https://crudcrud.com/api/873ef07ee4524f2a87fde815778d0a6a/todo/"+idUser)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        itemList.removeChild(li);
    }
    check.checked = () =>{
        console.log('checked');
    }
}  
 

window.addEventListener("DOMContentLoaded", () =>{
    axios.get("https://crudcrud.com/api/873ef07ee4524f2a87fde815778d0a6a/todo")
    .then((res)=>{
        console.log(res);
        for(var i=0 ;i< res.data.length;i++){
            showUserOnScreen(res.data[i]);
        }
    })
    .catch((err)=>{
      console.log(err);
    })
  })
