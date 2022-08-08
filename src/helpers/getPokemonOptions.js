import pokemonApi from "@/api/pokemonApi"

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650))
  return pokemonsArr.map((_, index) => index + 1)
}

export const getPokemonNames = async ([a, b, c, d] = []) => {
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]

  const [pA, pB, pC, pD] = await Promise.all(promiseArr)
  return [
    { id: pA.data.id, name: pA.data.name },
    { id: pB.data.id, name: pB.data.name },
    { id: pC.data.id, name: pC.data.name },
    { id: pD.data.id, name: pD.data.name },
  ]
}

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
  let pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
  pokemons = pokemons.map(pokemon => ({
    id: pokemon.id,
    name: capitalizeFirstLetter(pokemon.name),
  }))

  return pokemons
}

export default getPokemonOptions

