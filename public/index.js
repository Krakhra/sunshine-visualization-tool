$(document).ready(function(){
  var type = 'none';
  var province = "none";
  var data_selected= 'none';
  var counter =0;

  var bar_button = $('#bar_button').click(function(){
    type = 'bar'
    bar_button.css({"background-color":"#659df7"})
    line_button.css({"background-color":"black"})
    pie_button.css({"background-color":"black"})
    console.log(type)
  })
  var line_button = $('#line_button').click(function(){
    type = 'line';
    line_button.css({"background-color":"#659df7"})
    bar_button.css({"background-color":"black"})
    pie_button.css({"background-color":"black"})
    console.log(type)
  })
  var pie_button = $('#pie_button').click(function(){
    type = 'pie';
    pie_button.css({"background-color":"#659df7"})
    line_button.css({"background-color":"black"})
    bar_button.css({"background-color":"black"})
    console.log(type)
  })

  var alb_radio = $('#option1').click(function(){
    alb_radio.css({"color":"#659df7"})
    on_radio.css({"color":"white"})
    bc_radio.css({"color":"white"})
    province = 'Alberta';
  })
  var on_radio = $('#option2').click(function(){
    on_radio.css({"color":"#659df7"})
    alb_radio.css({"color":"white"})
    bc_radio.css({"color":"white"})
    province = 'Ontario';
  })
  var bc_radio = $('#option3').click(function(){
    bc_radio.css({"color":"#659df7"})
    on_radio.css({"color":"white"})
    alb_radio.css({"color":"white"})
    province='BritishColumbia';
  })

  $('#submit_form').click(function(){
    var url = "/" + province 
    $.ajax({
      url: url,
      type:"GET",
      dataType:"json",
      success: function(data) {
        console.log(data);
        var ctx = $('#myChart');
        if(ctx == null){
          console.log('null');
        }
        var myChart = new Chart(ctx, {
          type: type,
          data: {
              labels: data.key,
              datasets: [{
                  label: 'Average Salaries',
                  data: data.value,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                      
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            title:{
              display:true,
              text: "Progression of Average Salaries in " + province
            }
          }
      });

      }
    });
  })

 
  $('#clear').click(function(){
    window.location.replace("/")
  })

  $('#clear2').click(function(){
    window.location.replace("/data")
  })

  $('#data_alb').click(function(){
    if(data_selected != "none" ){
      alert("Please Clear Table");
    }
    else{
      data_selected = "alberta"
      $('#data_alb').css({"color":"blue"});
      $('#data_on').css({"color":"white"});
      $('#data_bc').css({"color":"white"});
      
      $.ajax({
        url: "/data_alb",
        type:"GET",
        dataType:"json",
        success: function(data) {
          console.log(data);
          var i;
          for(i=0; i < 10;i++){
            var str;
            str = "<tr><td> " + (i+1) + "</td><td>"+ data.yr[i] + "</td><td>" + data.sec[i] + "</td><td>" + data.sal[i] + "</td></tr>"
            $('#myTable').find('tbody').append(str);
            //console.log(data.sal[i])
          }
          counter = i;
        }
      });
    }
  })

  $('#data_on').click(function(){
    if(data_selected != 'none'){
      alert("please click the clear button to reset table");
    }
    else{
      data_selected = 'ontario';
      $('#data_alb').css({"color":"white"});
      $('#data_on').css({"color":"blue"});
      $('#data_bc').css({"color":"white"});

      $.ajax({
        url: "/data_on",
        type:"GET",
        dataType:"json",
        success: function(data) {
          console.log(data);
          var i;
          for(i=0; i < 10;i++){
            var str;
            str = "<tr><td> " + (i+1) + "</td><td>"+ data.yr[i] + "</td><td>" + data.sec[i] + "</td><td>" + data.sal[i] + "</td></tr>"
            $('#myTable').find('tbody').append(str);
            //console.log(data.sal[i])
          }
          counter = i;
        }
      });
    }
  })

  $('#data_bc').click(function(){
    if(data_selected != 'none'){
      alert("please click the clear button to reset table");
    }
    else{
      data_selected = 'bc';
      $('#data_alb').css({"color":"white"});
      $('#data_on').css({"color":"white"});
      $('#data_bc').css({"color":"blue"});

      $.ajax({
        url: "/data_bc",
        type:"GET",
        dataType:"json",
        success: function(data) {
          console.log(data);
          var i;
          for(i=0; i < 10;i++){
            var str;
            str = "<tr><td> " + (i+1) + "</td><td>"+ data.yr[i] + "</td><td>" + data.sec[i] + "</td><td>" + data.sal[i] + "</td></tr>"
            $('#myTable').find('tbody').append(str);
            //console.log(data.sal[i])
          }
          counter = i;
        }
      });
    }
  })

  $('#download').click(function(){
    if(data_selected == 'none'){
      alert('Please Select Region');
    }
    else{
      if(data_selected == 'alberta'){
        alert("downloading alberta csv")
        
      }
      else if(data_selected == 'ontario'){
        alert("downloading Ontario csv")
      }
      else{
        alert("downloading BC csv")
      }
    }
    
  })
})