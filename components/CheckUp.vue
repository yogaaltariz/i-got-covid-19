<template>
  <b-card id="checkUp" class="shadow border-0">
    <div class="mb-4">
      <b-progress :value="value" :max="100" show-progress animated></b-progress>
    </div>
    <b-card-text>
      <strong>{{ question.text }}</strong>
    </b-card-text>

    <b-button class="mx-1" variant="dark" @click="no">No</b-button>
    <b-button class="mx-1" variant="primary" @click="yes">Yes</b-button>
  </b-card>
</template>

<script>
export default {
  props: {
    question: Object,
    yes: Function,
    no: Function,
    value: Number
  }
}
</script>
