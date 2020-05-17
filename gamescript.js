 window.onload=setCBoxes;
      var colorArray = ["blueviolet","springgreen","gold","pink","darkturquoise","darkred","lime","lightgray","orangered"];
      var randomColors, loop, myTimer;
      var output = document.getElementById('output');
      var colorBoxes = document.getElementsByClassName('colorBox'); 
      var button = document.getElementById('button');
      var userInput=[];
      var gameplay = false;
      var initialColors = 3;
      var initialColorBoxes = 3;

      

      function setCBoxes(){
        var colorOutput = document.getElementById('colorOutput');
        var html="";
        var boxWidth = Math.ceil(100/colorArray.length);

   
        for(var x=0; x<initialColorBoxes;x++){
          html += "<div class='colorBox' onclick='checkAnswer()' style='width:"+boxWidth+"%; background-color:"+colorArray[x]+"'></div>";
          //console.log(html);
          colorOutput.innerHTML = html;
        }
        
      }

      function startGame(){
        randomColors = [];
        message2.innerHTML= "";
        message.innerHTML = "";
        output.innerText = "";
        userInput = [];
        loop = 0;
        gameplay = true;
        myTimer;

        button.setAttribute('value','Restart');
        button.setAttribute('onclick','restart()');
        
        clearTimeout(myTimer);
        for(var x=0; x<initialColors; x++){
          var color = Math.floor(Math.random()*initialColorBoxes);
          randomColors.push(colorArray[color]);
        }
        
        myTimer = setTimeout(showWhite, 500);
        
      }

      function showWhite(){
        output.style.backgroundColor = "white";
        myTimer = setTimeout(showColors,200);
      }

      function showColors(){
          output.style.backgroundColor = randomColors[loop];
          loop++;
          if(loop >= randomColors.length){
            clearTimeout(myTimer);
            //checkAnswer();
          }
          myTimer = setTimeout(showWhite,900);
      }

      function checkAnswer() {
        var guess, g;
        var html="";
        var d = document.createElement('div');
        var message = document.getElementById('message');
        var message2 = document.getElementById('message2');

        if (gameplay){

              guess = event.target.style.backgroundColor;
              d.style.backgroundColor = guess;
              d.innerText = guess;
              d.style.color = "white";
              
              message.appendChild(d);
              userInput.push(guess);
        }

        if(userInput.length == randomColors.length) {
            gameplay = false;
        
            if(userInput.toString()==randomColors.toString()) {
              output.innerHTML = "<b>You go gurl</b>";
              button.setAttribute('value','Next Level');
              button.setAttribute('onclick','nextLevel()');
              button.classList.add('next');
            }
            else {
              var html2="";
              button.setAttribute('value','Restart');
              button.classList.remove('next');
              button.setAttribute('onclick','restart()');
              for(x=0;x<randomColors.length; x++){
                html2 += "<div style='color:#fff;background-color:"+randomColors[x]+";'>"+randomColors[x]+"</div>";
              }
             output.innerHTML = "<b>Nops u suck</b>"; 
             message2.innerHTML = "<br><b>Answer was:</b> "+html2
            }
          }
      }

      function nextLevel() {
        button.classList.remove('next');
        if (initialColors == colorArray.length){
          gameplay = false;
          output.innerHTML = "<span>You won, u basterd</span>";
          button.setAttribute('value','Restart');
          button.setAttribute('onclick','restart()');
          button.classList.remove('next');
        }
        else {
          initialColors++;
          initialColorBoxes++;
          setCBoxes();
          startGame(); 
        }

      }

    function restart() {
  
      initialColors = 3;
      initialColorBoxes = 3;

      setCBoxes();
      startGame();
    }       
      



      