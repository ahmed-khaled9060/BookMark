let site_name = document.getElementById("bookmark_name");
let site_link = document.getElementById("bookmark_url");
let button_submit = document.getElementById("btn-submit");
let box_data = [];
let listLocalStorage = "list"

if(JSON.parse(localStorage.getItem(listLocalStorage))){
  box_data = JSON.parse(localStorage.getItem(listLocalStorage));
  display_row(box_data);

}

  button_submit.addEventListener("click",function() {
    if(
      validate_form(site_name) &&
      validate_form(site_link)
      ){
        // remove valid class when click submit buuton
        site_name.classList.remove("is-valid")
        site_link.classList.remove("is-valid")
        let site = {
        name: site_name.value,
        link: site_link.value
      };
      box_data.push(site);
      display_row(box_data);
      localStorage.setItem(listLocalStorage , JSON.stringify( box_data))
      clearform();
    }
    else{
      this.setAttribute("data-bs-toggle","modal")
      this.setAttribute("data-bs-target","#exampleModal")
    }
});


function display_row(list) {
  let table_row = "";
  for (i = 0; i < list.length ; i++) {
    table_row += ` 
        <tr>
            <th class="fw-bold">${i + 1}</th>
            <th class="fw-bold">${list[i].name}</th>
            <th class="fw-bold ">
              <a href= "http://${list[i].link}" target="_blank" class="btn btn-success">
                <i class="fa-solid fa-eye"></i>
                visit
              </a>
            </th>
            <th class="fw-bold">
              <button class="btn btn-danger" id="btn-delete" onclick= delete_row(${i})>
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </th>
        </tr>
  `;
  }
  document.querySelector("tbody").innerHTML = table_row;
}


function clearform() {
  site_name.value = "";
  site_link.value = "";
}


function delete_row(index){
  box_data.splice(index , 1)
  localStorage.setItem(listLocalStorage , JSON.stringify( box_data))
  display_row(box_data);
}



function validate_form(element){
  let regex ={
    bookmark_name:/^\w{3,20}$/,
    bookmark_url:/^\w{1,}\.\w{2,20}$/
  }
  let valid = regex[element.id].test(element.value)
  if(valid){
    element.classList.remove("is-invalid")
    element.classList.add("is-valid")
    button_submit.removeAttribute("data-bs-toggle")
    button_submit.removeAttribute("data-bs-target")
  }else{
    element.classList.remove("is-valid")
    element.classList.add("is-invalid")
  }
  return valid
}


