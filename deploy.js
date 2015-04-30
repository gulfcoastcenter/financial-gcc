var util = require('mis-util');
var config = require('./config.ignore');

var mis = util({
   sysname: '/c1/FRSH',
   connect: {
      host: 'gccmhc',
      user: 'tim',
      password: config.user,
   },
   cron: {
      user: 'datamgr',
      pass: config.cron
   },
   parm_path: {
      local: './build/'
   }
});

//build the parmfile
console.log('parm task');
mis.parm.fromjsonfile('./parm/FINSPOVR.json')
.then(function(parm) { 
   return mis.parm.tofile('./build/FINSPOVR.parm', parm);
});

mis.deploy.parm();

mis.deploy.usc()
.then(function(files) {
   mis.script.compile(files);
});
