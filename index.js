let mensagem = "";
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded());

const listaPokemons = [{
    id: 1,
    nome: "Bulbasaur",
    tipo: "venenoso",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    habilidade: "Crescer Demais",
},
{
  id: 2,
  nome: "Charizard",
  tipo: "Fogo",
  imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
  habilidade: "Chama",
},

{
  id: 3,
  nome: "Metapod",
  tipo: "Inseto",
  imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png",
  habilidade: "Escudo",
},

];

let pokemon = undefined;



app.get("/", (req, res) => {
  res.render("index", { listaPokemons, pokemon, mensagem });
});

app.post("/create", (req,res) => {
  const pokemon = req.body;
  pokemon.id = listaPokemons.length + 1;
  listaPokemons.push(pokemon);
  mensagem = 'Pokemon criado com sucesso!';
  res.redirect("/#cards");
})

app.get("/detalhes/:id", (req, res) =>{
  const id = req.params.id;
  pokemon = listaPokemons.find((pokemon) => pokemon.id ==id);
  res.redirect("/#cadastro");
})

app.post("/update/:id", (req, res) =>{
  mensagem = " ";
  const id = +req.params.id -1;
  const novoPokemon = req.body;
  novoPokemon.id = id + 1;
  listaPokemons[id] = novoPokemon;
  pokemon = undefined;
  res.redirect("/#cards");

});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id - 1;
  delete listaPokemons[id];
  res.redirect("/#cards");
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
    });