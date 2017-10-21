/**
 * Staging environment settings
 * (sails.config.*)
 *
 * This is mostly a carbon copy of the production environment settings
 * in config/env/production.js, with the overrides listed below.
 * For more detailed information and links about what these settings do,
 * see the production config file.
 *
 * > This file takes effect when `sails.config.environment` is "staging".
 * > (Note that NODE_ENV should still be "production" when lifting in staging.)
 */

var PRODUCTION_CONFIG = require('./production');

module.exports = Object.assign({}, PRODUCTION_CONFIG, {

  datastores: Object.assign({}, PRODUCTION_CONFIG.datastores, {
    default: Object.assign({}, PRODUCTION_CONFIG.datastores.default, {
      // << Provide staging db `url` or other settings here >>
      //    (or alternatively you can use env vars)
      // url: 'postgresql://admin:myc00lpAssw2D@db.example.com:3306/my_staging_db',
    })
  }),


  sockets: Object.assign({}, PRODUCTION_CONFIG.sockets, {

    // << Staging domains go here >>
    // (or alternatively, replace this entire array with an env var)
    onlyAllowOrigins: [
      'https://staging.example.com',
      'https://example-staging.herokuapp.com',
      'http://localhost:1337'
    ],

    // << Provide staging redis `url` here >>
    // (or alternatively you can use env vars)
    // url: 'redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/',
  }),

  session: Object.assign({}, PRODUCTION_CONFIG.session, {
    // << Provide staging redis `url` here >>
    // (or alternatively you can use env vars)
    // url: 'redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/staging-sessions',
  }),

  custom: Object.assign({}, PRODUCTION_CONFIG.custom, {

    baseUrl: 'https://staging.example.com',
    internalEmailAddress: 'support@example.com'

    // << Provide staging credentials for other APIs, etc. here >>
    // (or alternatively you can use env vars)
    // mailgunApiKey: 'key-staging_fake_bd32301385130a0bafe030c',
    // stripeSecret: 'sk_staging__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    // stripePublishableKey: 'pk_staging__fake_fKd3mZJs1mlYrzWt7JQtkcRb',
    // etc.
  })

});
