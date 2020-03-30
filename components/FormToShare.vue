/* eslint-disable prettier/prettier */
<template>
  <b-card class="shadow border-0 mt-2">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        label="What your name ?"
        description="you can use pseudonym"
      >
        <b-form-input v-model="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="How old you ?">
        <b-form-input
          v-model="form.age"
          type="number"
          min="0"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Where do you from ?">
        <v-select
          v-model="form.country"
          :options="countries"
          requiredplaceholder="Select country"
        ></v-select>
      </b-form-group>
      <b-form-group
        id="locationInput"
        label="Where do you live now ? "
        description="If you won't tell it, is ok. it will be useful for people around you to being aware"
      >
        <b-button variant="outline-info" @click="getLocationUser"
          >Get location</b-button
        >
      </b-form-group>
      <b-form-group label="Are you have a message to everyone ? ">
        <b-form-textarea
          id="textarea"
          v-model="form.message"
          placeholder="Enter something..."
          rows="3"
          maxlength="100"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" :disabled="sendingTweet" variant="primary"
        >Submit</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-card>
</template>
<script>
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    vSelect
  },
  props: {
    checkUpScore: Number,
    backToHome: Function
  },
  data() {
    return {
      form: {
        name: '',
        age: null,
        message: '',
        twitter: '',
        condition: '',
        country: '',
        location: null
      },
      countries: [],
      data() {
        return {
          sendingTweet: false
        }
      }
    }
  },
  mounted() {
    if (this.checkUpScore === -1) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.form.condition = 'Positive covid-19'
    } else {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.form.condition = 'may be affected by covid-19'
    }
  },
  beforeMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      response.data.map((country) => this.countries.push(country.name))
    })
  },
  methods: {
    getLocationUser() {
      if (navigator.userAgent.includes('Firefox')) {
        axios
          .get('https://location.services.mozilla.com/v1/geolocate?key=test')
          .then((response) => {
            this.form.location = `https://www.google.com/maps/@${response.data.location.lat},${response.data.location.lng}`
          })
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.location = `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude}`
          },
          (error) => {
            alert(error.message)
          }
        )
      }
      document
        .querySelector('#locationInput')
        .querySelector('.text-muted').innerHTML = 'Your location recorded 👍'
    },
    onSubmit(e) {
      e.preventDefault()
      this.sendingTweet = true
      axios
        .post('/api/postTweet', { tweet: this.generateTweet() })
        .then((response) => {
          this.$swal({
            title: 'Success',
            text: `Your information has been post via twitter, check it out : ${response.data.tweet_link}`,
            confirmButtonText: 'Go to tweet',
            showCancelButton: true,
            cancelButtonText: 'Back to home page'
          }).then((result) => {
            if (result) {
              window.open(response.data.tweet_link)
              this.backToHome()
            } else {
              this.backToHome()
            }
            this.sendingTweet = false
          })
        })
    },
    onReset(e) {
      e.preventDefault()
      this.form.id_country = null
      this.form.name = ''
      this.form.age = null
      this.form.message = ''
      this.form.twitter = ''
      this.form.condition = null
      this.form.country = ''
      this.form.address = ''
      this.form.location = null
    },
    generateTweet() {
      let message = `Hello this is from ${this.form.name}, I'am from ${this.form.country} and ${this.form.age}. Currently my condition is ${this.form.condition}.`
      if (this.form.location) {
        message += ` My point is ${this.form.location}, please who are around that be careful. `
      }
      message += ` My message is ${this.form.message}`
      return message
    }
  }
}
</script>
