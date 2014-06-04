angular-wordpress-pods
======================

a sample client for the [`pods-json-api`](https://github.com/pods-framework/pods-json-api) using Angular.js

## Introduction

### main ingredients

you take

* [Wordpress](http://wordpress.org/) as a backend
* [Pods](http://pods.io/) for storing custom data types and their relations
* [AngularJS](https://angularjs.org/) for creating a completely independent UI that looks nothing like a CMS
 
and glue them together using various pieces 

* [WP-API](https://github.com/WP-API/WP-API) for enabling a JSON-based API for Wordpress
* [pods-json-api](https://github.com/pods-framework/pods-json-api) for accessing your Pods
* **wp-pods-api.js** from *this* project, so you can use it in your own Angular.js app

to make things easier, this repo also contains a small Angular.js app that can list, add, edit and delete pods from your existing wordpress installation.

## Installation

This assumes that you want your Angular App and the Wordpress Backend to live in 2 separate locations, which can even be different domains [if you enable CORS](https://github.com/WP-API/WP-API/issues/144).

### *server* in location 1
1. install Wordpress
2. install Pods as a plugin
3. install WP-API as a plugin (until it's merged with WP Core)
4. install pods-json-api as a plugin
5. create a new Pod
6. install the [base-auth-plugin](https://github.com/WP-API/Basic-Auth)
7. create a new user that will be user for http basic auth combination (or use your admin account from first install ;-) )

### *client* in location 2 // localhost
1. clone this repository into a folder of your choice
2. edit the settings in XYZ.js
    - APIend
    - podType
    - edit the Auth header
3. run `grunt:serve`
4. check out the list of Pods in your browser at `http:// localhost:3000`
5. add, edit and delete them
6. use Chrome DevTools or Firebug for seeing all the details
7. use [Postman](www.getpostman.com/) for trying things out when you are stuck with the Wordpress or Pods API

## Usage

a few words about how things fit together

## Contributing

feel free to send pull requests, add issues and use this code to your heart's delight

## License

[MIT](/LICENSE)
