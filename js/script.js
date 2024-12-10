// IMPORT MODULES

import { fetchEmployees } from "./modules/init.js"

// GET DOM ELEMENTS
let empTable = document.querySelector('#employees')
let empCount = document.querySelector('#empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

(async function buildEmployeeGrid() {
    try {
        const employees = await fetchEmployees()
        if (employees) {
            buildGrid(employees)
        }
    } catch (error) {
        console.error(error);
    }
})()

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR
            let rowIndex = e.target.closest('tr').rowIndex
            // REMOVE EMPLOYEE FROM TABLE
            empTable.deleteRow(rowIndex)
        }
    }
})

// BUILD THE EMPLOYEES GRID
function buildGrid(employees) {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()


    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')

    // LOOP THROUGH THE ARRAY OF EMPLOYEES AND REBUILD THE ROW STRUCTURE
    for (let employee of employees) {
        tbody.innerHTML +=
            `  
  <tr>
        <td>${employee.ID}</td>
        <td>${employee.Name}</td>
        <td>${employee.Ext}</td>
        <td><a href="mailto:${employee.Email}">${employee.Email}</a></td>
        <td>${employee.Department}</td>
        <td><button class="btn btn-sm btn-danger delete">X</button></td>
    </tr>
    
    `
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)

    //UPDATE EMPLOYEE COUNT

    empCount.textContent = `(${employees.length})`

}