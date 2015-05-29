/*
 * Web driver manager
*/
'use strict';

var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();

module.exports = driver;
