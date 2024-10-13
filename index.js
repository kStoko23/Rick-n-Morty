document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://rickandmortyapi.com/api/character";
  let currentPage = 1;
  let statusFilter = "all";

  function fetchCharacters(page, status) {
    let url = `${apiUrl}?page=${page}`;
    if (status !== "all") {
      url += `&status=${status}`;
    }

    console.log("Request URL:", url);

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched:", data);
        displayCharacters(data.results);
        updatePagination(data.info);

        const tableContainer = document.querySelector(".table-container");
        tableContainer.scrollTop = 0;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function displayCharacters(characters) {
    console.log(characters);
    const tableBody = document.getElementById("character-table-body");
    tableBody.innerHTML = "";

    characters.forEach((character) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td><img src="${character.image}" alt="${character.name}" width="50"></td>
      <td>${character.name}</td>
      <td>${character.status}</td>
    `;
      tableBody.appendChild(row);
    });
  }

  function updatePagination(info) {
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");

    prevPageBtn.parentElement.classList.toggle("disabled", !info.prev);
    nextPageBtn.parentElement.classList.toggle("disabled", !info.next);
  }

  document.getElementById("prev-page").addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters(currentPage, statusFilter);
    }
  });

  document.getElementById("next-page").addEventListener("click", (event) => {
    event.preventDefault();
    currentPage++;
    fetchCharacters(currentPage, statusFilter);
  });

  document
    .getElementById("status-filter")
    .addEventListener("change", (event) => {
      statusFilter = event.target.value;
      currentPage = 1;
      fetchCharacters(currentPage, statusFilter);
    });

  fetchCharacters(currentPage, statusFilter);
});
