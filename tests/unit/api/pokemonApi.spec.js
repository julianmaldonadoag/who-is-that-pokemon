import pokemonAPI from '@/api/pokemonApi'

describe('pokemonAPI', () => {
  test('axios should be configured with the pokemon API', () => {
    expect(pokemonAPI.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
  })
})