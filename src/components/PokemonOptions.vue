<template>
  <div class="options-container">
    <ul>
      <li 
        v-for="pokemon in pokemons" 
        :key="pokemon.id"
        :class="{ 
          'disable': disableBtn, 
          'correct-answer': correctAnswer(pokemon.id),
          'incorrect-answer': incorrectAnswer(pokemon.id)
        }"
        @click="$emit('chosenPokemon', pokemon.id); chosenPokemon(pokemon);"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disableBtn: false,
      pokemonSelected: null
    }
  },
  props: {
    pokemons: {
      type: Array,
      required: true
    },
    correctPokemon: {
      type: Object,
      required: true
    }
  },
  methods: {
    chosenPokemon(pokemon) {
      this.disableBtn = true
      this.pokemonSelected = pokemon
    },
    correctAnswer(pokemonId) {
      return this.disableBtn && pokemonId === this.pokemonSelected.id && pokemonId === this.correctPokemon.id
    },
    incorrectAnswer(pokemonId) {
      return this.disableBtn && pokemonId === this.pokemonSelected.id && pokemonId !== this.correctPokemon.id
    }
  }
}
</script>

<style scoped>
.options-container {
  display: flex;
  justify-content: center;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  background-color: #0d6efd;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px 0;
  width: 250px;
}
li:hover {
  background-color: #084298;
}
.disable {
  pointer-events: none;
}
.correct-answer {
  background-color: #198754;
}
.incorrect-answer {
  background-color: #dc3545;
}
</style>