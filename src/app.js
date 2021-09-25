document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let Identificacion = document.getElementById('Identificacion').value;
  let Nombre = document.getElementById('Nombre').value;
  let Corte1 = document.getElementById('Corte1').value;
  let Corte2 = document.getElementById('Corte2').value;
  let Corte3 = document.getElementById('Corte3').value;
  let Promedio=(parseFloat(Corte1)+parseFloat(Corte2)+parseFloat(Corte3))/3;
  
 
  console.log(Identificacion,Nombre,Corte1,Corte2,Corte3,Promedio)

  let task = {
    Identificacion,
    Nombre,
    Corte1,
    Corte2,
    Corte3,
    Promedio
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(Identificacion) {
  console.log(Identificacion)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].Identificacion == Identificacion) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function editTask(Identificacion) {
  
  console.log(Identificacion)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].Identificacion == Identificacion) {
    let Identificacion = tasks[i].Identificacion;
    let Nombre = tasks[i].Nombre;
    let Corte1 = tasks[i].Corte1;
    let Corte2 = tasks[i].Corte2;
    let Corte3 = tasks[i].Corte3;   
    

    document.getElementById('Identificacion').value = Identificacion;
    document.getElementById('Nombre').value = Nombre;
    document.getElementById('Corte1').value = Corte1;
    document.getElementById('Corte2').value = Corte2;
    document.getElementById('Corte3').value = Corte3;
    tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let Identificacion = tasks[i].Identificacion;
    let Nombre = tasks[i].Nombre;
    let Corte1 = tasks[i].Corte1;
    let Corte2 = tasks[i].Corte2;
    let Corte3 = tasks[i].Corte3;
    let Promedio = tasks[i].Promedio;

    tasksView.innerHTML += 
    `
    <div class="col-md-8">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Identificacion</th>
          <th>Nombre</th>
          <th>Corte_1</th>
          <th>Corte_2</th>
          <th>Corte_3</th>
          <th>Promedio</th>
        </tr>
      </thead>
      <tbody>
   
        <tr>
          <td><p>${Identificacion}</td>
          <td><p>${Nombre}</td>
          <td><p>${Corte1}</td>
          <td><p>${Corte2}</td>
          <td><p>${Corte3}</td>
          <td><p>${Promedio}</td>
          <td>
            <a href="#" onclick="editTask('${Identificacion}')" class="btn btn-secondary">
              <i class="fas fa-marker"></i>
            </a>
            
            <a href="#" onclick="deleteTask('${Identificacion}')" class="btn btn-danger">
              <i class="far fa-trash-alt"></i>
            </a>
           
          </td>
        </tr>            
      </tbody>
    </table>
  </div>`;
  }
}

getTasks();
