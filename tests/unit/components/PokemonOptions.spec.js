import { shallowMount } from "@vue/test-utils"
import PokemonOptions from "@/components/PokemonOptions.vue"
import { pokemons } from "../mocks/pokemons.mock"

describe("PokemonOptions component", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
        correctPokemon: pokemons[0]
      },
    })
  })

  test("should match with snapshot", () => {
    // console.log(wrapper.html())

    expect(wrapper.html()).toMatchSnapshot()

    // the value of toMatchInlineSnapshot was autogenerated when test was run
    // expect(wrapper.html()).toMatchInlineSnapshot(`
    //   <div class="options-container">
    //     <ul>
    //       <li>bulbasaur</li>
    //       <li>ivysaur</li>
    //       <li>venusaur</li>
    //       <li>charmander</li>
    //     </ul>
    //   </div>
    // `)
  })

  test('should show 4 pokemon names correctly', () => {
    const liTags = wrapper.findAll('li')

    expect(liTags.length).toBe(4)
    expect(liTags[0].text()).toBe('bulbasaur')
    expect(liTags[1].text()).toBe('ivysaur')
    expect(liTags[2].text()).toBe('venusaur')
    expect(liTags[3].text()).toBe('charmander')
  })

  test('should emit "chosenPokemon" with its respective params', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li')

    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')

    console.log(wrapper.emitted('chosenPokemon'))

    expect(wrapper.emitted('chosenPokemon').length).toBe(4)
    expect(wrapper.emitted('chosenPokemon')[0]).toEqual([1])
    expect(wrapper.emitted('chosenPokemon')[1]).toEqual([2])
    expect(wrapper.emitted('chosenPokemon')[2]).toEqual([3])
    expect(wrapper.emitted('chosenPokemon')[3]).toEqual([4])
  })
})
