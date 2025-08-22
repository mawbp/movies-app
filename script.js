function lihat() {
  const container = document.querySelector('#filmContainer');
  container.innerHTML = `<div class="text-center w-100"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>`;

  const judul = document.querySelector('#txtcari').value;

  fetch(`https://www.omdbapi.com/?apikey=(INSERT YOUR API KEY HERE)&s=${judul}`)
    .then(res => {
      if (!res.ok) throw new Error('Jaringan Bermasalah');
      return res.json();
    })
    .then(data => {
      container.innerHTML = '';
      if (!data.Search) {
        container.innerHTML = `<p class="text-danger text-center">Film tidak ditemukan.</p>`;
        return;
      }

      data.Search.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';

        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm';
        card.style.cursor = 'pointer';
        card.setAttribute('data-id', item.imdbID);

        const img = document.createElement('img');
        img.src = item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/300x445?text=No+Image';
        img.className = 'card-img-top';

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = item.Title;

        body.appendChild(title);
        card.appendChild(img);
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
      });

      // Tambah event listener ke semua card
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          fetch(`https://www.omdbapi.com/?apikey=(INSERT YOUR API KEY HERE)&i=${id}`)
            .then(res => res.json())
            .then(data => {
              const poster = document.getElementById('modalPoster');
              const info = document.getElementById('modalInfo');

              poster.src = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x445?text=No+Image';
              info.innerHTML = `
                <h4>${data.Title}</h4>
                <p><strong>Tahun:</strong> ${data.Year}</p>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
              `;

              // Tampilkan modal
              const myModal = new bootstrap.Modal(document.getElementById('myModal'));
              myModal.show();
            });
        });
      });
    })
    .catch(err => {
      container.innerHTML = `<p class="text-danger text-center">Terjadi kesalahan: ${err.message}</p>`;
    });
}

// Tekan Enter = cari
document.querySelector('#txtcari').addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    lihat();
  }
});
