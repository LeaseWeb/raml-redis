var redis = require("redis"),
        redisclient = redis.createClient();
const LOCAL_KEY = "RAML.";

exports.redisAll = function(req, res) {
    var filelist = new Object();
    redisclient.keys(LOCAL_KEY+'*', function(err, replies) {
	var i = 1;
	if(replies.length>0) {
	 replies.forEach(function(reply, err) {
          redisclient.get(reply, function (err, value) {
                filelist[reply] = value;
                delete filelist[reply].reply;
		if (i == replies.length) {
			res.header("Access-Control-Allow-Origin", "*");
			res.send(JSON.stringify(filelist));
		}
		i++;
	   });
	 });
 	} else {
		res.header("Access-Control-Allow-Origin","*");
		res.send('');
	}
  });
};

exports.redisAdd = function(req, res) {
	var body  = req.body;
	console.log('Update file: '+body.path);
	
	redisclient.set(LOCAL_KEY + body.path, body.content, function(err, reply) {
		if(err) {
			console.log("Error updating file");
			res.send({'error':'An error has occurred'});
		} else {
	                res.header("Access-Control-Allow-Origin", "*");
                	res.send('{"status":"success","id":"'+body.path+'","message":"The file was successfully updated."}');
		}
	});
}	

exports.redisKey = function(req,res) {
	var path = req.body.path;
	console.log('Getting key: '+path);

	redisclient.get(LOCAL_KEY+path, function(err, value) {
		if(err) {
			console.log("Error getting key: "+path);
			res.send({'error':'An error has occurred'});
		} else {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.send(value);
		}
	});
}

exports.redisDelete = function(req,res) {
	var path= req.body.path;
	console.log('Removing key: '+path);
	redisclient.del(LOCAL_KEY+path, function(err, value) {
		if(err) {
			console.log("Error deleting key: "+path);
			res.send({'error':'An error has occurred'});
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send('{"status":"success","message":"Removed successfully"}');
		}
	});
}

