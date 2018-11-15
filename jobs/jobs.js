var CronJob = require('cron').CronJob;
var Telnet = require('telnet-client');
var config = require('config');

var db = require('../database');

//
// ジョブクラス
var Job = function(site, cronTime, params) {
  
  // ジョブ生成
  return new CronJob(cronTime, function() {

    //
    // telnetクライアント生成
    var connection = new Telnet();
    // 接続成功時
    connection.on('connect', function() {
      console.log('['+ site +'] is Connected.');
      db.update({name: site}, {$set: {status: true}}, {multi: true, upsert: true});
      connection.end();
    });
    // 接続タイムアウト時
    connection.on('timeout', function() {
      console.log('['+ site +'] is Connect Timeout!');
      db.update({name: site}, {$set: {status: false}}, {multi: true, upsert: true});
      connection.end();
    });
    // 接続エラー時
    connection.on('error', function() {
      console.log('['+ site +'] is Connect Error!');
      db.update({name: site}, {$set: {status: false}}, {multi: true, upsert: true});
      connection.end();
    });

    //
    // 接続試行
    console.log('Connecting ['+ site +'].....');
    connection.connect(params);
  });
};


//
// サービスごとに接続をチェックする
for(var key in config.services) {
  // ジョブ作成
  var job = Job(
    key,
    config.services[key].cron,
    {
      host: config.services[key].host,
      port: config.services[key].port
    }
  );

  //　ジョブ開始
  job.start();
}
