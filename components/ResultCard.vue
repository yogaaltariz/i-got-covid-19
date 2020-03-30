/* eslint-disable vue/require-default-prop */
<template>
  <b-card class="shadow border-0">
    <!-- positif covid -->
    <b-card-text>
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="light"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <b>
          Keep in mind, the result of this test is not a substitute for a
          doctor's medical diagnosis. Please consult your complaints with
          doctors for further examination
        </b>

        <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>
    </b-card-text>

    <div v-show="showResult">
      <div v-if="score == -1" class="text-center">
        <div>
          <img
            :src="require('~/assets/svg/010-coronavirus.svg')"
            width="100px"
          />
        </div>

        <div class="mt-3">
          <h3>Seems like you got covid-19, don't panic</h3>
          <strong>
            Are you want to tell the comunity ? if yes, i will help to share the
            social media, and you can get so much love and support
          </strong>

          <div class="text-center">
            <b-button variant="dark" @click="backToHome">No</b-button>
            <b-button variant="primary" @click="openFormToShare"
              >Yes of course</b-button
            >
          </div>
        </div>
      </div>

      <!-- good -->
      <div v-else-if="score <= 3">
        <div class="text-center">
          <img :src="require('~/assets/svg/029-stayhome.svg')" width="100px" />
        </div>

        <div class="mt-3">
          <h3>You are healthy. you aren't showing any symptoms of Covid-19.</h3>
          <p>
            Don't forget to : Stay at home, Avoid close contact to other people,
            Wear a mask Follow the correct ethics when coughing / sneezing Wash
            your hands with soap and water Take 500 mg of paracetamol if you
            have a fever
          </p>
          <div class="text-center">
            <b-button variant="primary" @click="backToHome"
              >Back to home page</b-button
            >
          </div>
        </div>
      </div>

      <!-- at risk -->
      <div v-else-if="score <= 5">
        <div class="text-center">
          <img :src="require('~/assets/svg/047-house.svg')" width="100px" />
        </div>

        <div class="mt-3">
          <h3>You're in risk to got covid-19, please do self quarantine</h3>
          <p>
            You are advised not to go out into public places, just stay at home
            and may not have guests. Your disease is likely to heal itself by
            eating enough and resting
          </p>
          <div class="text-center">
            <b-button variant="primary" @click="backToHome"
              >Back to home</b-button
            >
          </div>
        </div>
      </div>

      <!-- high risk got covid -->
      <div v-else>
        <div class="text-center">
          <img :src="require('~/assets/svg/001-doctor.svg')" width="100px" />
        </div>
        <div class="mt-3">
          <h3>You are at high risk of Covid-19 infection. But do not panic.</h3>
          <div>
            Patients with symptoms such as yours usually require a direct
            examination by a doctor. Self-isolate at home and use online
            consulting services for further advice and treatment, or call 119.
            Don't forget to :
            <ul>
              <li>Stay at home</li>
              <li>Avoid close contact to other people</li>
              <li>Wear a mask</li>
              <li>Follow the correct ethics when coughing / sneezing</li>
              <li>Wash your hands with soap and water</li>
              <li>Take 500 mg of paracetamol if you have a fever</li>
            </ul>

            <strong>
              Are you want to tell the comunity ? if yes, i will help to share
              the social media, and you can get so much love and support
            </strong>

            <div class="text-center">
              <b-button variant="dark" @click="backToHome">No</b-button>
              <b-button variant="primary" @click="openFormToShare"
                >Yes of course</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    score: Number,
    openFormToShare: Function,
    backToHome: Function
  },
  data() {
    return {
      showResult: false,
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  mounted() {
    this.showAlert()
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
      if (this.dismissCountDown === 0) {
        this.showResult = true
      }
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>
