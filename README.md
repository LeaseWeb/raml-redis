## Deprecated

This repository is no longer being actively maintained. We encourage you to not use this code.
If you rely on this code you might want to fork the repository to keep your systems from breaking, if we remove this repository in the future.



# RAML API Designer Redis Store



## Overview

raml-redis provides a simple storage API which enable you to run [RAML API Designer](https://github.com/mulesoft/api-designer) locally and use Redis as storage of the RAML files/folders.

## Requirements
The service is built with node.js, using express and redis. 

## Optional
To run the server as a daemon you can use foreman (see below).

### Installing Node.js
Go to [nodejs.org](http://nodejs.org), and click the Install button.

### Installing Redis
To install Redis please check the [Redis Website](http://redis.io).
On Ubuntu you can simply run the following command:

`apt-get install redis-server`

### Installing RAML-Redis
From the top-level directory (e.g. raml-redis):

`npm install`

This will install express and redis client for node.js (https://github.com/mranney/node_redis)
    
## Running the Service
From the top-level directory (e.g. raml-redis):

`node server.js`

If you prefer to run the server in the background [forever](http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever) is awesome. 

`npm install forever`

`forever start server.js`


## Integration with API-Designer
Follow instructions at [api-designer](https://github.com/mulesoft/api-designer) to install and run API-Designer.  
Currently this is test with version 0.0.1

Copy the file `local-storage-file-system.jsÂ` to your API-DESIGNER subfolder:

`cp local-storage-file-system.js API_DESIGNER_HOME/app/scripts/services`

Change the API_URL in the file to point to the raml-redis URL


## TO DO
- With an empty Redis DB, the give an error on first visit of the API Designer. After that the error will disappear.


## Acknowledgements
Thanks to Brian McManus, this API is based on his RAML Store (@ https://github.com/brianmc/raml-store)


