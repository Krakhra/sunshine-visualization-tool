var express = require('express');
var app = express();
const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const results_on = [];
const results_bc = [];
const path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function parse_average(results){
  var i =0;
  var length = results.length;
  var map = new Map();
  var c = parseFloat(results[0].Salary);
  map.set(results[0].Year,c);
  var temp = 0;

  for(i=1; i < length-1;i++){
    if(map.has(results[i].Year) == true){
      temp = map.get(results[i].Year);
      temp = parseFloat(temp);
      var a = parseFloat(results[i].Salary);
      temp = temp +a;
      temp = temp/2;

      if(isNaN(temp)){
        continue;
      }
      

      map.set(results[i].Year,temp);
    }
    else{
      var b = parseFloat(results[i].Salary);
      map.set(results[i].Year,b);
    }
  }
  return map;
}

function parse_on(results){
  var i=0;
  var length = results.length-1;
  var map = new Map();

  for(i=0; i < length; i++){
    var s = results[i].Salary;
    s = s.replace('$','');
    s = s.replace(',','');
    s = parseFloat(s);

    if(map.has(results[i].Year)){
      var temp = map.get(results[i].Year);
      temp = temp + s;
      temp = temp / 2;

      if(isNaN(temp)){
        continue;
      }
      map.set(results[i].Year,temp);
    }
    else{
      if(isNaN(s)){
        continue;
      }
      map.set(results[i].Year,s);
    }
  }
  return map;
}

function mean(results){
  var i =0;
  var length = results.length;
  var sum=0;

  for(i=0; i < length-1; i++){
    var temp = parseFloat(results[i].Salary);
    if(isNaN(temp)){
      continue;
    }
    sum = sum + temp;
  }
  sum = sum / length;
  return sum;
}

function median(results){
  var length = results.length;
  var mid = length / 2;
  mid = Math.floor(mid);
  var val = results[mid].Salary;
  val = parseFloat(val);
  return val;
}

function raw_alb(results){
  var ret_sec = [];
  var ret_yr = [];
  var ret_sal = [];
  var i;

  for(i=0; i < 10;i++){
    //console.log(results[i].Year + " " + results[i].Sector + " " + results[i].Salary);
    ret_sec.push(results[i].Sector);
    ret_yr.push(results[i].Year);
    ret_sal.push(results[i].Salary);
  }

  var obj = {
    sec:ret_sec,
    yr:ret_yr,
    sal:ret_sal
  }
  return obj
}

app.use(express.static(__dirname + '/public'));
//app.use(express.static('images'));

app.get('/',function(req,res){
  res.sendFile('index');
});

app.get('/contact',function(req,res){
  res.sendFile(__dirname + "/public/contact.html");
});

app.get('/start',function(req,res){
  res.sendFile(__dirname + "/public/start.html");
});

app.get('/data',function(req,res){
  res.sendFile(__dirname + "/public/data.html");
});

app.get('/about',function(req,res){
  res.sendFile(__dirname + "/public/about.html");
});

fs.createReadStream('./uploads/Alberta/alberta.csv')
  .pipe(csv())
  .on('data',(data)=>results.push(data))
  .on('end', ()=>{
    //console.log(results);
  });

app.get("/Alberta",function(req,res){
  var my_map = parse_average(results);
  var keys =[];
  var values =[];
  var r_mean = mean(results);
  r_mean = r_mean.toFixed(2);  
  var r_median = median(results);


  my_map.forEach(function(key,value){
    keys.push(value);
    values.push(key);
  });

  keys.reverse();
  values.reverse();
  res.send({
    key:keys,
    value:values,
    mean:r_mean,
    median:r_median
  });
});

app.get('/data_alb',function(req,res){
  var obj = raw_alb(results);
  res.send(obj);
});

app.get('/data_on',function(req,res){
  var obj = raw_alb(results_on);
  res.send(obj);
});

app.get('/data_bc',function(req,res){
  var obj = raw_alb(results_bc);
  res.send(obj);
});

fs.createReadStream('./uploads/Ontario/Ontario.csv')
  .pipe(csv())
  .on('data',(data)=>results_on.push(data))
  .on('end', ()=>{
    //console.log(results_on);
  });

app.get("/Ontario",function(req,res){
  var my_map = parse_on(results_on);
  var keys =[];
  var values =[];
  var i=0;
  my_map.forEach(function(key,value){
    keys.push(value);
    values.push(key);
  });
  var r_mean = mean(results_on);
  r_mean = r_mean.toFixed(2);  
  var r_median = median(results_on);

  var temp_key=[];
  var temp_val=[];

  for(i=0; i < 23; i++){
    temp_key.push(keys[i]);
    temp_val.push(values[i]);
  }

  // keys.reverse();
  // values.reverse();
  res.send({
    key:temp_key,
    value:temp_val,
    mean:r_mean,
    median:r_median
  });
});

fs.createReadStream('./uploads/BC/BritishColumbia.csv')
  .pipe(csv())
  .on('data',(data)=>results_bc.push(data))
  .on('end', ()=>{
    //console.log(results_bc);
  });

app.get("/BritishColumbia",function(req,res){
  var my_map = parse_on(results_bc);
  var keys =[];
  var values =[];
  var i=0;
  my_map.forEach(function(key,value){
    keys.push(value);
    values.push(key);
  });

  var temp_key=[];
  var temp_val=[];

  for(i=0; i < 9; i++){
    temp_key.push(keys[i]);
    temp_val.push(values[i]);
  }

  // keys.reverse();
  // values.reverse();
  res.send({
    key:temp_key,
    value:temp_val
  });
});

app.listen(3000, function(){
  console.log("Server Started");
})