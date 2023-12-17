let toastCtr = 0;
/**
 * changeModalHeaderColor
 * -changes modal header color based on row status
 *
 * @param {string} status
 */
function changeModalHeaderColor(status){
  let modalHeader = document.getElementById('modal-header');
  modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-primary','bg-danger');

  let fstatus       = document.getElementById('field-status');
  fstatus.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger')

  switch (status) {
    case 'add':
      modalHeader.classList.add('bg-primary');
      break;
    case 'ongoing':
      modalHeader.classList.add('bg-warning');
      fstatus.classList.add('text-bg-warning');
      break;
    case 'on queue':
      modalHeader.classList.add('bg-secondary');
      fstatus.classList.add('text-bg-secondary');
      break;
    case 'completed':
      modalHeader.classList.add('bg-success');
      fstatus.classList.add('text-bg-success');
      break;
    default:
      modalHeader.classList.add('bg-danger');
      fstatus.classList.add('text-bg-danger');
      break;
  }
}

/**
 * breakByHTMLChars
 * -separate string of text by html tags and convert to array
 * @param {string} statusHtml the column of status in selected row
 *
 * @return {array} the array version of string
 */
function breakByHTMLChars(statusHtml = ""){
  const tagRegex = /<[^>]*>/g;
  const resultArray = statusHtml.split(tagRegex);

  return resultArray.filter(item => item.trim() !== '');
}

/**
 * showHideTableButtons
 * -show or hide the table buttons depending on row status
 * @param {object} row
 */
function showHideTableButtons(row){
  const columns = row.getElementsByTagName('td');
  const status = breakByHTMLChars(columns[6].innerHTML);

  if(status.includes("completed")){
    removeBtns = columns[7].querySelectorAll(".edit-ticket,.delete-ticket");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });
  }
}

/**
 * showHideModalButtons
 * -show or hide the buttons inside the of the modal based on row status
 *
 * @param {object} row
 * @param {string} state name of originating function call, ex. from "edit"
 */
function showHideModalButtons(row, state =''){
  const columns = row.getElementsByTagName('td');
  const status = breakByHTMLChars(columns[6].innerHTML);
  const modalMain = document.querySelector('#viewTicketModal');

  removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save,#modal-btn-create");
  removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });

  if(status.includes("completed")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });


  } else if(status.includes("On Queue")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

    if(state == ""){
      showBtns = modalMain.querySelectorAll("#modal-btn-process");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    } else {
      showBtns = modalMain.querySelectorAll("#modal-btn-process");
      showBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
      });

      showBtns = modalMain.querySelectorAll("#modal-btn-save");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    }

  } else if(status.includes("ongoing")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

    if(state == ""){
      showBtns = modalMain.querySelectorAll("#modal-btn-complete");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    } else {
      showBtns = modalMain.querySelectorAll("#modal-btn-complete");
      showBtns.forEach(btnCol => {
        btnCol.classList.add('d-none');
      });

      showBtns = modalMain.querySelectorAll("#modal-btn-save");
      showBtns.forEach(btnCol => {
        btnCol.classList.remove('d-none');
      });
    }
  }


}

/**
 * removeRowHightlight
 * -removes row highlight
 */
function removeRowHightlight(){
  document.querySelectorAll('tr').forEach(row => {
    row.classList.remove('table-active');

  });
}

/**
 * addGlobalEventListener
 * -js event delegation wrapper
 */
function addGlobalEventListener(type, selector, callback){
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e);
  });
}

/**
 * generateToast
 * -generate dynamic toast message
 *
 * @param {string} [bgColor=""]     bootstrap bg color class
 * @param {string} [textMessage=""] text string to prompt
 */
function generateToast(bgColor = "", textMessage =""){
  toastCtr++;
  let toastHtml = `<div class="toast align-items-center ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true"  id="liveToast${toastCtr}">
                    <div class="d-flex">
                      <div class="toast-body">
                        ${textMessage}
                      </div>
                      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                   </div>
                  </div>`;
  const toastWrapper = document.querySelector('.toast-container');
  toastWrapper.innerHTML += toastHtml;

  const toastMain = document.querySelector('#liveToast'+toastCtr);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMain);
  toastBootstrap.show();
}

/**
 * assignRowFieldValues
 * - assign the selected row data to modal fields
 * @param {object} row
 */
function assignRowFieldValues(row) {
    const ticketNo  = row.getElementsByTagName('th');
    const columns   = row.getElementsByTagName('td');
    let modalLabel  = document.getElementById('view-ticket-label');
    let modalTitle  = document.getElementById('modal-ticket-no');
    let Equipment    = document.getElementById('category');
    let Brand      = document.getElementById('requested-to');
    let Model       = document.getElementById('model-title');
    let ModelNumber = document.getElementById('request-title');
    let DateOrdered = document.getElementById('date-created');
    let DateShipment  = document.getElementById('target-date');
    let Status = document.getElementById('field-status');
    const statusArray = ['Pending','Ongoing','Received'];

    row.classList.add('table-active');


    textContentArray = breakByHTMLChars(columns[6].innerHTML);

    console.log (columns[6].textContent);

    modalTitle.innerHTML =`${ticketNo[0].textContent} [${textContentArray.join("/")}]`;
    changeModalHeaderColor(columns[6].textContent.toLowerCase());
    Equipment.value    = columns[0].textContent;
    Brand.value    = columns[1].textContent;
    Model.value      = columns[2].textContent;
    ModelNumber.value       = columns[3].textContent;
    DateOrdered.value =columns[4].textContent;
    DateShipment.value = columns[5].textContent;
    Status.value  = columns[6].textContent;


}


/**
 * clearFieldValues
 * - empty text field value for add modal
 *
 */
function clearFieldValues() {
    let modalLabel  = document.getElementById('view-ticket-label');
    let modalTitle  = document.getElementById('modal-ticket-no');
    let Equipment    = document.getElementById('category');
    let Brand      = document.getElementById('requested-to');
    let Model       = document.getElementById('model-title');
    let ModelNumber = document.getElementById('request-title');
    let DateOrdered = document.getElementById('date-created');
    let DateShipment  = document.getElementById('target-date');
    let Status = document.getElementById('field-status');
    const statusArray = ['Pending','Ongoing','Received'];

  let date = new Date();
  date.setDate(date.getDate() + 7);
  newDateTarget = date.toISOString().split('T')[0];

  modalTitle.innerHTML =`Open Ticket Details for <span class="fw-bold" id="modal-ticket-no"></span>`;
  changeModalHeaderColor("add");
  Equipment.value    = '';
  Status.value      = 'On Queue';
  Brand.value       = '';
  Model.value = '';
  dateCreated.value = new Date().toISOString().split('T')[0];
  DateOrdered.value = newDateTarget;
  ModelNumber.value = '';


  // disable some dates
  Status.setAttribute("disabled","");
  dateCreated.setAttribute("disabled","");
  assignedTo.setAttribute("disabled","");

  //show create ticket button
  removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete,#modal-btn-save");
  removeBtns.forEach(btnCol => {
    btnCol.classList.add('d-none');
  });
  showBtns = modalMain.querySelectorAll("#modal-btn-create");
  showBtns.forEach(btnCol => {
    btnCol.classList.remove('d-none');
  });
}


function addTicketRecord() {
  let newTicketNo = `TIX-${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}`
    let modalLabel  = document.getElementById('view-ticket-label');
    let modalTitle  = document.getElementById('modal-ticket-no');
    let Equipment    = document.getElementById('category');
    let Brand      = document.getElementById('requested-to');
    let Model       = document.getElementById('model-title');
    let ModelNumber = document.getElementById('request-title');
    let DateOrdered = document.getElementById('date-created');
    let DateShipment  = document.getElementById('target-date');
    let Status = document.getElementById('field-status');
    const statusArray = ['Pending','Ongoing','Received'];

  const tblRow   = document.querySelector("#table-onqueue");
  const tblBody  = tblRow.querySelector('tbody');

  let newRow     = tblBody.insertRow();

  let col1 = newRow.insertCell(0);
  let col2 = newRow.insertCell(1);
  let col3 = newRow.insertCell(2);
  let col4 = newRow.insertCell(3);
  let col5 = newRow.insertCell(4);
  let col6 = newRow.insertCell(5);
  let col7 = newRow.insertCell(6);
  let col8 = newRow.insertCell(6);
  let col9 = newRow.insertCell(6);


  col0.outerHTML = `<th class="align-middle fs-6">${newTicketNo}</th>`;
  col1.outerHTML = `<td class="align-middle fs-6">${Equipment.value}</td>`;
  col2.outerHTML = `<td class="align-middle fs-6">${Brand.value}</td>`;
  col3.outerHTML = `<td class="align-middle fs-6">${Model.value}</td>`;
  col4.outerHTML = `<td class="align-middle fs-6">${ModelNumber.value}</td>`;
  col5.outerHTML = `<td class="align-middle fs-6">${DateOrdered.value}</td>`;
  col6.outerHTML = `<td class="align-middle fs-6">${DateShipment.value}</td>`;
  col7.outerHTML = `<td class="align-middle fs-6">${Status.value}</td>`;
  col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-secondary">On Queue</span></td>`;
  col9.outerHTML = `<td class="align-middle text-center">
                      <button class="btn btn-info view-ticket" >view</button>
                      <button class="btn btn-warning edit-ticket" >Edit</button>
                      <button class="btn btn-danger delete-ticket" >Delete</button>
                    </td>`;

  generateToast("text-bg-warning",`Ticket ${newTicketNo} added`);
}



document.addEventListener('DOMContentLoaded', function() {
  //Ticket Button
  addButton = document.querySelector('#add-ticket');
  editButton = document.querySelectorAll('.edit-ticket');
  deleteButton = document.querySelectorAll('.delete-ticket');
  modalMain = document.querySelector('#viewTicketModal');
  activeRow = null;



  // ON RECORD ClICK
  document.querySelectorAll('.table tbody tr').forEach(row => {
    showHideTableButtons(row);
    row.addEventListener('dblclick', () => {
      // Get the data from the clicked row
      const columns = row.getElementsByTagName('td');
      const firstName = columns[1].textContent;
      const lastName = columns[2].textContent;

      const status = document.getElementById("status");
      console.log(columns[0].textContent);
      const animalArray = [];
      for (var i = 0; i < status.length; i++) {
        animalArray.push(status[i].textContent);
      }

    });



  });

  // ALL VIEW BUTTONS
  addGlobalEventListener("click",'.view-ticket', e => {
    removeRowHightlight();

    let modalView = document.querySelector("#viewTicketModal")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;

    // assign values to fields base on selected row
    assignRowFieldValues(row);

    //show modal buttons
    showHideModalButtons(row);
  });

  // ALL EDIT BUTTONS
  addGlobalEventListener("click",'.edit-ticket', e => {
    // Remove table row highlight
    removeRowHightlight();


    let modalView = document.querySelector("#viewTicketModal")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;

    // assign values to fields base on selected row
    assignRowFieldValues(row);

    // remove disable attribute in fields
    const inputFields = document.querySelectorAll(".form-control");
    inputFields.forEach(input => {
      if(input.id != "date-completed") input.removeAttribute("disabled");
    });

    // show modal buttons
    showHideModalButtons(row,"edit");

  });


  // ADD BUTTON
  addButton.addEventListener('click', function(){
    let modalView = document.querySelector("#viewTicketModal");
    const createButton = modalView.querySelector("#modal-btn-create");
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();



    const inputFields = document.querySelectorAll(".form-control");
    inputFields.forEach(input => {
      if(input.id != "date-completed") input.removeAttribute("disabled");
    });

    // make text field empty
    clearFieldValues();

    // CREATE TICKET BUTTON
    createButton.addEventListener('click', function(event){
      const forms = document.querySelectorAll('.requires-validation');
      Array.from(forms).forEach(function (form)

       {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

        } else {
          addTicketRecord();
          myModal.hide();
        }
        form.classList.add('was-validated');
      })
    });


  });


 // Delete Button
    deleteButton = document.querySelectorAll('.delete-ticket');
    deleteButton.forEach(function(button)
    {
        button.addEventListener('click', function()
        {
            let row = this.parentElement.parentElement;
            const modalDelete = document.querySelector("#deleteModal");
            const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
            confirmDelBtn.addEventListener("click", function()
            {
                row.remove();
            });


  // ON MODAL CLOSE
  modalMain.addEventListener("hidden.bs.modal", function(){
    if(activeRow != null) activeRow.classList.remove('table-active');

     // add disable attribute in fields
     const inputFields = document.querySelectorAll(".form-control");
     inputFields.forEach(input => {
       if(input.id != "date-completed") input.setAttribute("disabled","");
     });

     const forms = document.querySelectorAll(".requires-validation");
     forms.forEach(form => {
      form.classList.remove('was-validated');
     });
  });



  // MODAL BUTTONS


// SAVE TICKET BUTTON
addGlobalEventListener("click", '#modal-btn-save', e => {
    const tblRow = document.querySelector("#table-ongoing");
    const tblBody = tblRow.querySelector('tbody');
    const ticketNo = activeRow.querySelectorAll('th');
    const columns = activeRow.querySelectorAll('td');

    let modalLabel = document.getElementById('view-ticket-label');
    let modalTitle = document.getElementById('modal-ticket-no');
    let Equipment = document.getElementById('category');
    let Brand = document.getElementById('requested-to');
    let Model = document.getElementById('model-title');
    let ModelNumber = document.getElementById('request-title');
    let DateOrdered = document.getElementById('date-created');
    let DateShipment = document.getElementById('target-date');
    let Status = document.getElementById('field-status');

    columns[0].textContent = Equipment.value;
    columns[1].textContent = Brand.value;
    columns[2].textContent = Model.value;
    columns[3].textContent = ModelNumber.value;
    columns[4].textContent = DateOrdered.value;
    columns[5].textContent = DateShipment.value;
    columns[6].textContent = Status.value;

    generateToast("text-bg-success", `Ticket ${ticketNo[0].textContent} updated`);
});

});
});
});


