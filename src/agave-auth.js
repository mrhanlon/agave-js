// (function() {
// 'use strict';
//
// var log = function() {
//   if (console) {
//     console.log(Array.prototype.slice.call(arguments)[0]);
//   }
// };
//
// var root = this;
//
// var hasRequire = typeof require !== 'undefined';
//
// var Promise = root.Promise;
// if (typeof Promise === 'undefined') {
//   if (hasRequire) {
//     Promise = require('es6-promise').Promise;
//   } else {
//     throw new Error('Agave.js requires Promise');
//   }
// }
//
// var Agave = root.Agave;
// if (typeof Agave === 'undefined') {
//   if (hasRequire) {
//     Agave = require('./agave');
//   } else {
//     throw new Error('Agave.js must be declared before Agave.auth.js');
//   }
// }
//
// Agave.prototype.loadToken = function() {
//   var self = this;
//   return new Promise(function(resolve, reject) {
//     var agaveToken = window.localStorage.getItem('Agave.token');
//
//     if (agaveToken) {
//       try {
//         agaveToken = JSON.parse(agaveToken);
//         if (Date.now() - agaveToken.created < (1000 * agaveToken.expiresIn)) {
//           self.token = agaveToken;
//           resolve(agaveToken);
//         } else {
//           /* attempt refreshToken */
//           Agave.refreshToken(agaveToken.refreshToken)
//           .then(function(token) {
//             self.token = token;
//             resolve(token);
//           })
//           .then(null, function(err) {
//             reject(err);
//           });
//         }
//       } catch (err) {
//         reject(err);
//       }
//     } else {
//       reject('Agave.token does not exist!');
//     }
//   });
// };
//
// Agave.auth.post = function(data) {
//   var deferred = $.Deferred();
//   if (Agave.client) {
//     $.ajax({
//       url: Agave.baseUrl + '/token',
//       type: 'post',
//       data: data,
//       headers: {
//         Authorization: 'Basic ' + btoa(Agave.client.consumerKey + ':' + Agave.client.consumerSecret)
//       }
//     }).done(function(resp) {
//       Agave.token = {};
//
//       /* Agave token property names are underscored. Convert to camelCase */
//       $.each(resp, function(key, value) {
//         if (/[a-z]+_[a-z]/.test(key)) {
//           // replace _[a-z] with toUpperCase([a-z])
//           key = key.replace(/_([a-z])/g, function(g) { return g[1].toUpperCase(); });
//         }
//         Agave.token[key] = value;
//       });
//
//       Agave.token.created = Date.now(); /* current time to detect token expiration */
//       window.localStorage.setItem( 'Agave.token', JSON.stringify( Agave.token ) ); /* store token */
//       deferred.resolve( Agave.token ); /* resolve deferred */
//     }).fail(function( err ) {
//       deferred.reject( err.message );
//     });
//   } else {
//     deferred.reject( 'Agave.client is not initialized.' );
//   }
//   return deferred.promise();
// };
//
//
// }).call(this);
