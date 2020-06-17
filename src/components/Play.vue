<template>
  <div class="main" v-if="answers">

    <h1>Score: {{getScore}}</h1><br>
    <div>
      <img :src="'/img/items/' + question.img" width="200px" height="200px" />
    </div>
    <div class="flexcontainer answers">
      <div v-for="({name}, key) in answers" :key="name" class="item">
        <Button 
          @answer="verifyAnswer(question.id, name)"
          :text="name"
          :k="++key" 
        />
      </div>
    </div>
  </div>

  <div v-else>
    <h1> You won 🎉 </h1>
    <p>Well done</p>
  </div>

</template>

<script>
import PlayService from '../services/PlayService';
import Button from './shared/Button';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Play',
  components: {
    Button
  },
  data: function() {
    return {
      answers: [],
      question: {},
    }
  },
  mounted() {
    this.generate();
  },
  computed: {
    ...mapGetters(['getScore']),
  },
  methods: {
    ...mapActions(['incrementScore']),
    async verifyAnswer(id, name) {
      if(await PlayService.verifyAnswer(id, name)) {
        this.incrementScore();
        this.generate();
      }
    },

    async generate() {
      const result = await PlayService.generate();
      this.answers = result.answers;
      this.question = result.question;
    },
  }
}
</script>


<style scoped>
.main {
  max-width: 600px;
  margin: 0 auto;
}
.answers {
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 0;
}

.flexcontainer > div {
  margin: 10px;
}

.flexcontainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
}
</style>
