function lihat() {
  document.querySelector('.container').innerHTML = "<p id='loadingText'>Tunggu Sebentar...</p>";
  const judul = document.querySelector('#txtcari').value;
  const load = document.querySelector('#loadingText');
  const con = document.querySelector('.container');
  fetch(`http://www.omdbapi.com?apikey=[YOUR API KEY]&s=${judul}`)
    .then(res =>  {
      if(!res.ok) {
        throw new Error('Jaringan Bermasalah');
      }
      return res.json();
    })
    .then(data => {
      const ele = data.Search;
      ele.forEach(item => {        
        const url = item.Poster;
        const id = item.imdbID;
        const poster = document.createElement('div');
        const image = document.createElement('img');
        poster.setAttribute('class', 'poster');
        poster.setAttribute('data-id', `${id}`);
        image.setAttribute('src', `${url}`);
        poster.appendChild(image);
        con.appendChild(poster);
      });
      con.removeChild(load);
      const img = document.querySelectorAll('.poster');
      img.forEach(i => {
        i.addEventListener('click', () => {
          const id = i.getAttribute('data-id');
          fetch(`http://www.omdbapi.com?apikey=[YOUR API KEY]&i=${id}`)
            .then(res => {
              if(!res.ok) {
                throw new Error();
              }
              return res.json();
            })
            .then(data => {
              console.log(data);
              const modal = document.querySelector('#myModal');
              modal.style.display = 'block';
              const poster = document.querySelector('#modalPoster');
              poster.setAttribute('src', `${data.Poster}`);
              
              const modalInfo = document.querySelector('#modalInfo');
              modalInfo.innerHTML = `
                <h2>${data.Title}</h2>
                <p>Tahun: ${data.Year}</p>
                <p>Genre: ${data.Genre}</p>
                <p>Plot: ${data.Plot}</p>
              `;

              const close = document.querySelector('.close');
              close.addEventListener('click', () => {
                const modal = document.querySelector('#myModal');
                modal.style.display = 'none';
              })
            })
        });
      });
    })
}

function checkKey(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    lihat();
  }
}


document.querySelector('#txtcari').addEventListener('keypress', checkKey);