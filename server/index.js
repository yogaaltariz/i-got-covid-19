const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const Twitter = require('twitter')
const { Nuxt, Builder } = require('nuxt')
const app = express()
require('dotenv/config')

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))
// form-urlencoded

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // API KEY
  const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  })
  consola.log(client)
  app.get('/api/questions', (req, res) => {
    // from db
    const questions = [
      {
        text: 'Did you have ever tested for covid-19 ?',
        yesNext: 1, // questions index 1 if yes,
        noNext: 2,
        score: 0
      },
      {
        text: 'what result you got from the test ?',
        yesNext: 0,
        noNext: 2,
        score: -1
      },
      {
        text:
          'Did you still go out of the house to crowded places (with more than 10 people), such as markets, coffee shops, wedding parties, festivals, churches/mosques/places of worships, tourist attractions, etc ?',
        score: 1,
        yesNext: 3,
        noNext: 3
      },
      {
        text:
          'Do you have a contact history such as talking, shaking hands, being in a room with someone who has been tested positive or is suspected of being infected with the corona virus in the last 14 days?',
        score: 4,
        yesNext: 4,
        noNext: 4
      },
      {
        text:
          'Do you feel unwell now? Symptoms include (but are not limited to) fever, cough, sore throat, fatigue and shortness of breath.',
        score: 4,
        yesNext: 5,
        noNext: 5
      },
      {
        text:
          'Do you have a history of traveling to countries with Corona outbreaks such as China, Italy, Japan, South Korea, Malaysia, Thailand, Spain, and Iran in the last 14 days?',
        score: 4,
        yesNext: 6,
        noNext: 6
      },
      {
        text:
          'Do you have a history of chronic diseases such as cardiovascular problems, kidney failure, or cancer?',
        score: 1,
        yesNext: 7,
        noNext: 7
      },
      {
        text: 'do you work at the port / airport / health service ?',
        score: 2,
        yesNext: 8,
        noNext: 8
      },
      {
        text:
          ' do you have member of your family works at a port / airport / health service ?',
        socre: 2,
        yesNext: 0,
        noNext: 0
      }
    ]

    res.json(questions)
  })

  app.post('/api/postTweet', (req, res) => {
    client
      .post('statuses/update', { status: req.body.tweet })
      .then(function(tweet) {
        consola.log(tweet)
        const link = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
        res.json({ tweet_link: link })
      })
      .catch(function(error) {
        // throw error
        consola.log(error)
      })
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
