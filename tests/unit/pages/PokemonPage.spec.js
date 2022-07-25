import { shallowMount, mount } from "@vue/test-utils"
import PokemonPage from "@/pages/PokemonPage.vue"
import { pokemons } from "../mocks/pokemons.mock"

describe('PokemonPage component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  test('should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should call mixPokemonArray when component is mounted', () => {
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
    const wrapper = shallowMount(PokemonPage)
    expect(mixPokemonArraySpy).toHaveBeenCalled()
  })

  test('should match with snapshot when pokemons are loaded', () => {
    const wrapper = mount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should show PokemonPicture and PokemonOptions components', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    const picture = wrapper.find('pokemon-picture-stub')
    const options = wrapper.find('pokemon-options-stub')

    expect(picture.exists()).toBeTruthy()
    expect(options.exists()).toBeTruthy()

    expect(picture.attributes('pokemonid')).toBe('1')
    expect(options.attributes('pokemons')).toBeTruthy()
  })

  test('checkAnswer tests', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    await wrapper.vm.checkAnswer(1) // Correct pokemon

    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.vm.showPokemon).toBeTruthy()
    expect(wrapper.vm.message).toBe(`Correcto, ${pokemons[0].name}`)

    await wrapper.vm.checkAnswer(4) // Incorrect pokemon

    expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)

  })
})