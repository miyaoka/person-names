'use strict';

var mongoose = require('mongoose'),
    Name = mongoose.model('Name'),
    _ = require('lodash');

var conv_query = function(q){
  var p = {};
  if(q.nametype){
    if(Array.isArray(q.nametype)){
      p.nametype = { $in: q.nametype };
    }else{
      p.nametype = q.nametype;
    }
  }
  if(q.lang){
    if(Array.isArray(q.lang)){
      p.lang= { $in: q.lang };
    }else{
      p.lang = q.lang;
    }
  }
  if(q.name){
    p.name = new RegExp(q.name, 'i');
  }
  if(q.kana){
    p.kana = new RegExp(q.kana);
  }
  return p;
}
exports.name = function(req, res, next, id) {
  Name.findOne({
    _id: id
  }, function(err, name) {
    if (err) return next(err);
    if (!name) return next(new Error('Failed to load: ' + id));
    req._name = name;
    next();
  });
};
exports.find = function(req, res) {
  return Name.find(conv_query(req.query), function (err, names) {
    if (!err) {
      return res.json(names);
    } else {
      return res.send(err);
    }
  });
};
exports.removeAll = function(req, res) {
  return Name.find(conv_query(req.query)).remove(function (err, count) {
    if (!err) {
      return res.json({count: count});
    } else {
      return res.send(err);
    }
  });
};
exports.findRandom = function(req, res) {
  var q = conv_query(req.query);
  var rand = Math.random();
  var names = Name.find(q).sort({random: 1});

  names.findOne({random: {$gte : rand}}, function (err, name) {
    if (err) {
      return res.send(err);
    }
    if(name != null) {
      return res.json(name);
    }

    names.findOne({random: {$lte : rand}}, function (err, name) {
      if (err) {
        return res.send(err);
      }
      return res.json(name);
    });
  });
};
exports.updateRandom = function(req, res) {
  return Name.find(function (err, names) {
    if (!err) {
      names.forEach(function(name){
        name.random = Math.random();
        name.save(function(err){
          if(!err) {
            console.log('saved', name.random);
          } else {
            console.log('err', err);
          }
        });
      });
      return res.json({count: names.length});
    } else {
      return res.send(err);
    }
  });
};
exports.findOne = function(req, res) {
  res.json(req._name);
};
exports.create = function(req, res) {
  //配列なら複数作成
  if(Array.isArray(req.body)){
    Name.create(req.body, function(err, name){
      if (!err) {
        return res.json(name);
      } else {
        return res.send(err);
      }
    });
    return;
  }
  //一件作成
  var name = new Name(req.body);
  return name.save(function (err, name) {
    if (!err) {
      return res.json(name);
    } else {
      return res.send(err);
    }
  });
};
exports.update = function(req, res) {
  var name = _.extend(req._name, req.body);
  return name.save(function (err, name) {
    if (!err) {
      return res.json(name);
    } else {
      return res.send(err);
    }
  });
};
exports.remove = function(req, res) {
  return req._name.remove(function (err, name) {
    if (!err) {
      return res.json(name);
    } else {
      return res.send(err);
    }
  });
};

var create = function(list, cb) {
  Name.create(list, function(err, name){
    if (!err) {
      console.log('created', list.length);
    } else {
      console.log('err', err);
    }
  });
  return cb();
};

var toKatakanaCase = function(str)
{
  var c, i = str.length, a = [];

  while(i--)
  {
    c = str.charCodeAt(i);
    a[i] = (0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c;
  };

  return String.fromCharCode.apply(null, a);
};
/*
exports.jpinit = function(req, res) {
  var data = require('./names.json');

  var i, l;
  var list = [];

  l = data.familyName.writing.length;
  for(i = 0; i < l; i++){
    list.push({
      name: data.familyName.writing[i],
      kana: data.familyName.reading[i],
      lang: 'ja',
      nametype: 'family'
    });
  }
  create(list,function(){
    list = [];
    l = data.firstName.male.writing.length;
    for(i = 0; i < l; i++){
      list.push({
        name: data.firstName.male.writing[i],
        kana: toKatakanaCase(data.firstName.male.reading[i]),
        lang: 'ja',
        nametype: 'male'
      });
    }
    create(list,function(){
      list = [];
      l = data.firstName.female.writing.length;
      for(i = 0; i < l; i++){
        list.push({
          name: data.firstName.female.writing[i],
          kana: toKatakanaCase(data.firstName.female.reading[i]),
          lang: 'ja',
          nametype: 'female'
        });
      }
      create(list,function(){
        console.log('finished init names');
      });
    });
  });
}
*/