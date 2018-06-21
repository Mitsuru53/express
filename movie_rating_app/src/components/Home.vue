<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat :to="`/movies/${movie._id}`">
                {{ movie.name }}
              </v-btn>
            </div>
            <span class="grey--text">{{ movie.release_year }} ・ {{ movie.genre }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="purple">Rate this movie</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Movies',
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    }
  },
  mounted() {
    this.$store.dispatch('fetchMovies');
  },
};
</script>

<style lang="css">
</style>
