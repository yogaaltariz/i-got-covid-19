/* eslint-disable no-console */
<template>
  <b-container id="main-area">
    <div v-show="!isStart" id="hero" class="text-center">
      <img :src="require('~/assets/png/logo.png')" alt="logo" width="200" />
      <h1>Tell the world, because you love the others.</h1>
      <p>
        Our project is an early detection for Coronavirus and share the positive
        message from Corona's patient to the Twitter. We believe, a positive
        message will give one positive energy to others
      </p>

      <!-- <b-button variant="info">About us 🔍</b-button> -->
      <b-button variant="outline-primary" @click="beginCheckUp">First, you need to do self check 🚀</b-button>
    </div>
    <CheckUp
      v-if="checkUp"
      :question="currentQuestion"
      :yes="choiceIsYes"
      :no="choiceIsNo"
      :value="progressValue"
    />

    <ResultCard
      v-else-if="checkResult"
      :score="checkUpScore"
      :back-to-home="backToHome"
      :open-form-to-share="openFormToShare"
    />

    <FormToShare v-else-if="formToShare" :check-up-score="checkUpScore" :back-to-home="backToHome" />
  </b-container>
</template>

<script>
import axios from 'axios'
import CheckUp from '../components/CheckUp'
import ResultCard from '../components/ResultCard'
import FormToShare from '../components/FormToShare'
export default {
  components: {
    CheckUp,
    ResultCard,
    FormToShare
  },
  data() {
    return {
      isStart: false,
      checkUp: false,
      checkResult: false,
      formToShare: false,
      questions: [],
      currentQuestion: false,
      checkUpScore: 0,
      progressValue: 0
    }
  },

  beforeMount() {
    axios.get('/api/questions').then((response) => {
      this.questions = response.data
      this.currentQuestion = this.questions[0]
      this.progressValue = (0 / this.questions.length) * 100
    })
  },
  methods: {
    beginCheckUp() {
      this.isStart = true
      this.checkUp = true
    },
    choiceIsNo() {
      if (this.currentQuestion.noNext) {
        this.changeProgress(this.currentQuestion.noNext)
        this.currentQuestion = this.questions[this.currentQuestion.noNext]
      } else {
        this.showResult()
      }
    },
    choiceIsYes() {
      this.checkUpScore += this.currentQuestion.score

      if (this.currentQuestion.yesNext) {
        this.changeProgress(this.currentQuestion.yesNext)
        this.currentQuestion = this.questions[this.currentQuestion.yesNext]
        // eslint-disable-next-line no-console
        console.log(this.checkUpScore)
      } else {
        this.showResult(this.questions[this.currentQuestion.yesNext])
      }
    },
    showResult() {
      this.checkUp = false
      this.checkResult = true
    },
    changeProgress(val) {
      this.progressValue = (val / this.questions.length) * 100
    },
    backToHome() {
      this.isStart = false
      this.checkUp = false
      this.checkResult = false
      this.formToShare = false
    },
    openFormToShare() {
      this.checkResult = false
      this.formToShare = true
    }
  }
}
</script>

<style>
#main-area {
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
