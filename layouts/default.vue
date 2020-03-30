<template>
  <div>
    <b-navbar
      variant="light"
      class="shadow-sm justify-content-center"
      type="dark"
    >
      <b-navbar-brand href="#">
        <img :src="require('~/assets/png/logo.png')" alt="logo" width="120" />
      </b-navbar-brand>
    </b-navbar>
    <div class="mt-2">
      <nuxt />
    </div>
    <footer class="text-white">
      <b-container>
        <div>
          Icons made by
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
            >Freepik</a
          >
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>
        <div>© 2020 IGotCovid-19</div>
      </b-container>
    </footer>
  </div>
</template>

<style>
body {
  font-family: 'Sen', sans-serif;
}
footer {
  background: url('~assets/wave.svg');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
}
</style>
