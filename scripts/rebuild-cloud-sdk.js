module.exports = {

  friendlyName: 'Rebuild Cloud SDK',


  description: 'Regenerate the configuration for the "Cloud SDK" -- the JavaScript module used for AJAX and WebSockets.',


  fn: async function(inputs, exits){

    var path = require('path');

    var endpointsByMethodName = {};
    var extraEndpointsOnlyForTestsByMethodName = {};

    _.each(sails.config.routes, function(target){

      // If the route target is an array, then only consider
      // the very last sub-target in the array.
      if (_.isArray(target)) {
        target = _.last(target);
      }//ﬁ

      // Skip redirects
      // (Note that, by doing this, we also skip traditional shorthand
      // -- that's ok though.)
      if (_.isString(target)) {
        return;
      }

      // Skip routes whose target doesn't contain `action` for any
      // other miscellaneous reason.
      if (!target.action) {
        return;
      }

      // Everything else gets a Cloud SDK method.

      // We determine its name using the bare action name.
      var bareActionName = _.last(target.action.split(/\//));
      var methodName = _.camelCase(bareActionName);
      var expandedAddress = sails.getRouteFor(target);

      // Skip routes that just serve views (except for tests).
      if (target.view || (target.action&&target.action.match(/^view-/))) {
        extraEndpointsOnlyForTestsByMethodName[methodName] = {
          verb: (expandedAddress.method||'get').toUpperCase(),
          url: expandedAddress.url
        };
        return;
      }

      endpointsByMethodName[methodName] = {
        verb: (expandedAddress.method||'get').toUpperCase(),
        url: expandedAddress.url
      };

      // And we determine whether it needs to communicate over WebSockets
      // by checking for an additional property in the route target.
      if (target.isSocket) {
        endpointsByMethodName[methodName].protocol = 'io.socket';
      }

    });//∞

    var jsCode = _.template(``+
    `/**
     * cloud.setup.js
     *
     * Configuration for the global SDK ("Cloud").
     *
     * Above all, the purpose of this file is to provide endpoint definitions,
     * each of which corresponds with one particular route+action on the server.
     *
     `+//* > This file was automatically generated. `+new Date()+`
     `* > This file was automatically generated.
     * > (To regenerate, run \`sails run rebuild-cloud-sdk\`)
     */

    Cloud.setup({

      /* eslint-disable */
      methods: `+JSON.stringify(endpointsByMethodName)+`
      /* eslint-enable */

    });\n`)(endpointsByMethodName);


    // Dial back the indentation a touch
    jsCode = jsCode.replace(/\n    /g, '\n');

    sails.stdlib('fs').writeSync({
      destination: path.resolve(sails.config.appPath, 'assets/js/cloud.setup.js'),
      string: jsCode,
      force: true
    }).execSync();


    // Now also set up a barebones bounce of this data as a JSON file:
    // (for testing purposes)
    sails.stdlib('fs').writeSync({
      destination: path.resolve(sails.config.appPath, 'test/private/CLOUD_SDK_METHODS.json'),
      string: JSON.stringify(_.extend(endpointsByMethodName, extraEndpointsOnlyForTestsByMethodName)),
      force: true
    }).execSync();

    sails.log.info('--');
    sails.log.info('Successfully rebuilt Cloud SDK for use in the browser.');
    sails.log.info('(and CLOUD_SDK_METHODS.json for use in automated tests)');

    return exits.success();
  }

};
