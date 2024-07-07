let movieList = [];
let totalPage = 0;

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const page = params.get("page");

let currentPage = page ? parseInt(page) : 1;
const baseUrl = "https://phimapi.com";

async function getMovieList() {
  try {
    const response = await axios.get(
      `${baseUrl}/danh-sach/phim-moi-cap-nhat?page=${currentPage}`
    );
    if (response.status === 200) {
      console.log(response.data);
      totalPage = response.data.pagination.totalPages;
      response.data.items.forEach((item) => movieList.push(item));
      createPagination(totalPage, currentPage);
    }
  } catch (error) {
    console.error(error);
  }
}

async function renderCard() {
  await getMovieList();
  const container = document.querySelector(".card-container");
  if (movieList.length > 0) {
    movieList.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <a href="/phim-nha-lam/watch.html?slug=${item.slug}">
          <img src="${item.poster_url}" alt="${item.origin_name}" />
          <div class="card-content">
            <h4>${item.name}</h2>
            <p>${item.origin_name}</p>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  }
}
renderCard();

function createPagination(totalPages, currentPage) {
  let pages = [];
  const maxPagesToShow = 5;
  const half = Math.floor(maxPagesToShow / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, currentPage + half);

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("...");
    }
    pages.push(totalPages);
  }
  return renderPagination(pages);
}

const renderPagination = (pages) => {
  const container = document.querySelector(".pagination");

  pages.forEach((page) => {
    const item = document.createElement("a");

    if (page === "...") {
      item.classList.add("disabled");
      item.innerHTML = `<i class="fa-solid fa-ellipsis" style="color: #fbfbfb"></i>`;
    } else {
      item.href = `?page=${page}`;
      item.innerHTML = page;
    }

    if (page === currentPage) {
      item.classList.add("active");
    }

    container.appendChild(item);
  });
};
