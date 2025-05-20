const data = [
    { name: "Aarav", email: "aarav@gmail.com", age: 25, country: "USA" },
    { name: "Priya", email: "priya@gmail.com", age: 30, country: "UK" },
    { name: "Rahul", email: "rahul@gmail.com", age: 28, country: "India" },
    { name: "Sneha", email: "sneha@gmail.com", age: 22, country: "Germany" },
    { name: "Vikram", email: "vikram@gmail.com", age: 35, country: "USA" },
    { name: "Anjali", email: "anjali@gmail.com", age: 32, country: "Canada" },
    { name: "Rohan", email: "rohan@gmail.com", age: 29, country: "France" },
    { name: "Neha", email: "neha@gmail.com", age: 31, country: "India" },
    { name: "Amit", email: "amit@gmail.com", age: 27, country: "Russia" },
    { name: "Kavya", email: "kavya@gmail.com", age: 26, country: "China" }
];

let currentPage = 1;
let pageSize = 5;
let sortColumn = null;
let sortAsc = true;
let searchTerm = "";

const table = document.getElementById("data-table");
const thead = table.querySelector("thead");
const tbody = table.querySelector("tbody");
const searchInput = document.getElementById("search");
const pageSizeSelect = document.getElementById("page-size");
const pagination = document.getElementById("pagination");

function renderTable() {
    let filteredData = data.filter(item =>
        Object.values(item).some(val =>
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (sortColumn) {
        filteredData.sort((a, b) => {
            const valA = a[sortColumn];
            const valB = b[sortColumn];
            if (valA < valB) return sortAsc ? -1 : 1;
            if (valA > valB) return sortAsc ? 1 : -1;
            return 0;
        });
    }

    const start = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    renderHeader();
    renderBody(paginatedData);
    renderPagination(filteredData.length);
}

function renderHeader() {
    thead.innerHTML = "";
    const headerRow = document.createElement("tr");
    Object.keys(data[0]).forEach(col => {
        const th = document.createElement("th");
        th.textContent = col.charAt(0).toUpperCase() + col.slice(1);
        th.classList.toggle("sort-asc", sortColumn === col && sortAsc);
        th.classList.toggle("sort-desc", sortColumn === col && !sortAsc);
        th.onclick = () => {
            if (sortColumn === col) {
                sortAsc = !sortAsc;
            } else {
                sortColumn = col;
                sortAsc = true;
            }
            renderTable();
        };
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
}

function renderBody(rows) {
    tbody.innerHTML = "";
    if (rows.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = Object.keys(data[0]).length;
        td.textContent = "No results found";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    rows.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function renderPagination(totalItems) {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(totalItems / pageSize);

    const createBtn = (label, pageNum) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        if (pageNum === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = pageNum;
            renderTable();
        };
        return btn;
    };

    if (currentPage > 1) pagination.appendChild(createBtn("Previous", currentPage - 1));
    for (let i = 1; i <= pageCount; i++) {
        pagination.appendChild(createBtn(i, i));
    }
    if (currentPage < pageCount) pagination.appendChild(createBtn("Next", currentPage + 1));
}

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value;
    currentPage = 1;
    renderTable();
});

pageSizeSelect.addEventListener("change", () => {
    pageSize = +pageSizeSelect.value;
    currentPage = 1;
    renderTable();
});

renderTable();