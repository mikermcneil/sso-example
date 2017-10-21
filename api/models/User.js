/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200
      // e.g. "carol.reyna@microsoft.com"
    },

    password: {
      type: 'string',
      protect: true
      // e.g. "2$28a8eabna301089103-13948134nad"
      //
      // Note:
      // The default of empty string ("") will never be satisfied by
      // any login attempt because it is not a bcrypt hash.
      // (This is useful for representing new users who have not yet
      // accepted their invite and set a proper password.)
    },

    fullName: {
      type: 'string',
      description: 'Full representation of the user\'s name.',
      example: 'Microwave Jenny',
      maxLength: 120
    },

    tosAcceptedByIp: {
      type: 'string',
      // The IP (ipv4) address of the request that accepted the terms of service.
    },

    lastSeenAt: {
      type: 'number',
      description: 'The moment at which this user most recently interacted with our app.',
      example: 1502844074211
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


  },

};
