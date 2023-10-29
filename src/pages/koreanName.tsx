const koreanName = [];
const urls = [];

for (let i = 0; i < 150; i++) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
  urls.push(url);
}

let req = urls.map((url) => fetch(url));

Promise.all(req)
  .then((res) => Promise.all(res.map((res) => res.json())))
  .then((results) => {
    for (let result of results) {
      koreanName.push(result.names[2].name);
    }
  });
