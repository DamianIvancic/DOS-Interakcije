			var canvasWidth = document.getElementById("myCanvas").width;
			var canvasHeight = document.getElementById("myCanvas").height;
			var canvas = null;
			var bounds = null;
			var ctx = null;
			var hasLoaded = false;
			
			//first button
			var startX = 0;
			//second button
			var startY = 0;

            var existingLines = [];
            var allButtons = [];
			
            var clickedfirst = false;
            var firstButton = null;
            var secondButton = null;
            var firstID = null;
            var secondID = null;
            var tempPosFirst = null;
            var tempPosSecond = null;
            
			function reply_click(pairnum ,clicked_id)
			{
                console.log(pairnum);
                if(!clickedfirst)
                {
                    clickedfirst = true;
                    firstButton = pairnum;
                    firstID = clicked_id;
                    tempPosFirst = document.getElementById(firstID);
                    startX = findPos(tempPosFirst);
                    if(tempPosFirst <= 7)
                    {
						/*tempi = document.getElementById(firstID).width/2;
                        startX.X += startX.width;
						startX.Y -= startX.height/2;*/
					}
                    draw();
                    document.getElementById(firstID).style.borderColor = "green";
                }
                else
                {
                    secondButton = pairnum;
                    secondID = clicked_id;
                    document.getElementById(secondID).style.borderColor = "green";
                    if((firstButton != null && secondButton != null) && (firstButton == secondButton) && (firstID != secondID))
                    {
                        tempPosSecond = document.getElementById(secondID);
                        startY = findPos(tempPosSecond);
                        if(tempPosSecond <= 7)
                        {
                           /* startY.X += startY.width;
							startY.Y -= startY.height/2; */
                        }
                        console.log(secondButton);
                        drawLine(startX, startY);
                        document.getElementById(firstID).style.backgroundColor = "greenyellow";
                        document.getElementById(firstID).style.borderColor = null;
                      //  document.getElementById(firstID).disabled = true;
                        document.getElementById(secondID).style.backgroundColor = "greenyellow";
                        document.getElementById(secondID).style.borderColor = null;
                       // document.getElementById(secondID).disabled = true;
                        firstButton = null;
                        secondButton = null;
                        firstID = null;
                        secondID = null;
                        clickedfirst = false;
                    }
                    else{
                        document.getElementById(firstID).style.borderColor = null;
                        document.getElementById(secondID).style.borderColor = null;
                        firstButton = null;
                        secondButton = null;
                        firstID = null;
                        secondID = null;
						clickedfirst = false;
                    }

                }
			}
            
            function drawLine(startX, startY)
            {
					ctx.beginPath();
					existingLines.push({
							startX: startX.X,
							startY: startX.Y,
							endX: startY.X,
							endY: startY.Y
					})
                    ctx.moveTo(startX.X, startX.Y);
                    ctx.lineTo(startY.X, startY.Y);
                    ctx.stroke(); 
            }

			function findPos(obj){
				var curleft = 0;
				var curtop = 0;
			 
				if (obj.offsetParent) {
				   do {
					  curleft += obj.offsetLeft;
					  curtop += obj.offsetTop;
				   } while (obj = obj.offsetParent);
             
				   return {X:curleft,Y:curtop};
				}
			 }

			function draw() {
				ctx.fillStyle = "#d8d8d8";
				ctx.fillRect(0,0,canvasWidth,canvasHeight);
				
				ctx.strokeStyle = "black";
				ctx.lineWidth = 2;
				ctx.beginPath();
				
				for (var i = 0; i < existingLines.length; ++i) {
					var line = existingLines[i];
					ctx.moveTo(line.startX,line.startY);
					ctx.lineTo(line.endX,line.endY);
				}
				
				ctx.stroke();
			}

			function erase() {
                    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                    existingLines = [];

                    for(let button of allButtons){
                        button.disabled = false;
                        button.style.backgroundColor = 'aqua';
                    }

					draw();
			}

			function init() {
				canvas = document.getElementById("myCanvas");
				canvas.width = canvasWidth;
                canvas.height = canvasHeight;
				bounds = canvas.getBoundingClientRect();
				ctx = canvas.getContext("2d");
				hasLoaded = true;
                
                for(i=1; i<= 14; i++){

                    allButtons.push(document.getElementById(i));
                }

                draw();
            }
            
            function checkKeycode(event){
                let keycode;
                if(event){
                    keycode = event.which;
                    if(keycode == 123){
                        updateDraw();
                    }
                }        
            }


            setInterval(updateDraw, 10);

            function updateDraw(){
            
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                let buttons = [];

                for(i=1; i<= 14; i++){
                    buttons.push(document.getElementById(i));    
                }
                
      
                for(i=0; i<7; i++){    
                  
                   // if(buttons[i].disabled == true){
                   
                        let pos1 = findPos(buttons[i]);
                        let pos2 = findPos(buttons[i+7]);

                        drawLine(pos1, pos2);
                    
                        
                   // }
                }
            }
            