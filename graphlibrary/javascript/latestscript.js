;(function(){
	'use strict';

	function TopicDiv(){
		var that = this;

		var topicDivProps = {
			width:1300,
			height:100
		};

		this.topicElement = document.createElement('div');
		this.topicElement.style.width = topicDivProps.width + 'px';
		this.topicElement.style.height = topicDivProps.height + 'px';
		
		this.topicElement.innerHTML = 'Graph Library';
		this.topicElement.style.fontSize = '48px';
		this.topicElement.style.fontFamily = 'Open sans';
		this.topicElement.style.textAlign = 'Center';
		this.topicElement.style.lineHeight = '100px';
		this.topicElement.style.marginBottom = '20px';
	};

	function MainContainer (){
		var that = this;

		var mainContainerProps = {
			width:1300
		};

		this.element = document.createElement('div');
		this.element.style.width = mainContainerProps + 'px';
	};


	function InformationDiv () {
		var that = this;

		var informationDivProps = {
			width:450
		};

		this.informationDiv = document.createElement('div');
		this.informationDiv.style.width = informationDivProps.width + 'px';
		//this.informationDiv.style.border = '2px solid black';
		this.informationDiv.style.float = 'left';
	};

	function CanvasDiv () {
		var that = this;

		var canvasDivProps = {
			width: 790
		};

		this.canvasDiv = document.createElement('div');
		this.canvasDiv.style.width = canvasDivProps.width + 'px';
		this.canvasDiv.style.float = 'right';
		this.canvasDiv.style.border = '2px solid black';

		
	};


	function Canvas(){
		var that = this;

		var canvasProps = {
			width:600,
			height:200
		};
		this.canvas = document.getElementById('can');
		this.can = document.getElementById('canvas');
		this.canvas1 = document.getElementById('lineCanvas');
		this.canvas2 = document.getElementById('lineGraph');



		/*-------------------------------------------function to draw line graph begins-------------------------------------------------------------------------*/

		this.createLineGraph = function(dataStack){




			console.log('lineGraph');
			var maxVal = 0;
			var minVal;
			var xCoord =[];
			var sections;
			var xScale;
			var yScale;
			var columnSize = 50;
			var rowSize = 50;
			var margin = 10;
			var stepSize = 10;

			var xAxis = [];
			var yAxis = [];
			var canvas = document.getElementById('lineGraph');
			var context = canvas.getContext('2d');
			
			var drawLineGraph = function(){
				context.clearRect(0,0,canvas.width,canvas.height);
				for(var i=0;i<dataStack.length;i++){



					xAxis.push(dataStack[i].subject);
					yAxis.push(dataStack[i].score);
				};

				for(var i=0;i<yAxis.length;i++){
					if(yAxis[i]>maxVal){
						maxVal = yAxis[i];
					}
				};

				minVal = maxVal;
				

				for(var i=0;i<yAxis.length;i++){
					if(yAxis[i]<minVal){
						minVal = yAxis[i];
					}
				};
				

				sections = dataStack.length;
				console.log(sections);
				var finalY = dataStack[sections-1].score;
				console.log(finalY);
				displayLineGraph(context,columnSize,rowSize,maxVal,minVal,sections,finalY);				
			};

			function plotData(dataSet,sections,finalY) {
				context.beginPath();
				context.moveTo(0, dataSet[0]+2);
				for(var i=1;i<sections;i++){
					xCoord.push(i*xScale.toFixed(2));
				};
				var counter = 0;
				var timeInterval = setInterval(function(){
					var point = xCoord[counter++];
					context.lineTo(point, dataSet[counter]+2);
					context.stroke();
					if(counter>=sections){
						clearInterval(timeInterval);
					}
					console.log(counter);
				},500);
				context.stroke();	
				context.closePath();
			};

			
				
			drawLineGraph();

			function displayLineGraph(context,columnSize,rowSize,maxVal,minVal,sections,finalY){
				context.fillStyle = '#0099ff';
				context.font = '12px Open sans';

				yScale = (canvas.height - columnSize - margin)/(maxVal - minVal);
				//console.log(yScale);
				xScale = (canvas.width - rowSize)/sections;
				console.log(xScale);
				context.beginPath();
				for(var i=1;i<=sections;i++){
					var x = i * xScale;
					context.fillText(xAxis[i-1], x,columnSize - margin);
					context.moveTo(x+6, columnSize);
					context.lineTo(x+6, canvas.height - margin);
				};

				var count = 0;

				for(var scale = maxVal; scale >=minVal; scale = scale - stepSize){
					var y = columnSize + (yScale * count * stepSize); 
					context.fillText(scale, margin,y + margin);
					context.moveTo(rowSize,y)
					context.lineTo(canvas.width,y)
					count++;
				};

				context.stroke();
		
				context.translate(rowSize,canvas.height + minVal * yScale);
				context.scale(1,-1 * yScale);
				
					// Color of each dataplot items
					
				context.strokeStyle="#FF0066";
				context.closePath();
				plotData(yAxis,sections,finalY);

			};

		};


		/*-------------------------------------------------------------------------function to draw line graph ends-----------------------------------------*/


		/*-------------------------------------------------------------------------function to draw pieChart begins-----------------------------------------*/

		this.createPiChart = function(dataStack){
        	var canvas = document.getElementById('can');
        	console.log(canvas);
        	
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,600,400);

            var dataValue = [];
            var dataName = [];
            var degree = [];
            var percentage = [];
            var opacityValue = 0;
 			var sum = 0;
            for (var i=0; i<dataStack.length; i++){
                dataValue.push(dataStack[i].score);
                dataName.push(dataStack[i].subject);
                console.log(dataStack[i]);
            }

            console.log(dataValue);


            var colors = ["#990099","#109618","#ff9900","#dc3912","#3366cc","#004411","#7E3817", "#2c3e50", "#7f8c8d", "#2980b9", "#1abc9c","#307D7E", "#f39c12", "#5136f6","#f39c12", "#e2f5b4","#fc081f", "#E0FFFF", "#9edd08","#fb1ef8","#fdfbb4", "#faf406","#fbd4b7", "#f2700f","#f8bdb4", "#ea2507","#e2bcbd", "#9e2126","#bbddb3", "#1d8e04"];
            var center = [canvas.width / 2, canvas.height / 2];
            var radius = Math.min(canvas.width, canvas.height) / 2;
            var lastPosition = 0, total = 0;
             
            var draw = function(opacityValue){
            for(var i in dataValue) { 
            	total += dataValue[i]; 
                console.log(i, dataValue[i]);
            }
                for (var i = 0; i < dataValue.length; i++) {
                    degree.push((dataValue[i]/total) *360);
                    var percent = (dataValue[i]/total) *360;
                    percentage.push(percent * (100/360));
                    var outerRadius = lastPosition+(Math.PI*2*(dataValue[i]/total));

                    displayGraphSlowly(ctx,center[0],center[1],radius,lastPosition,outerRadius,opacityValue, colors[i],dataValue[i]);

                    lastPosition += Math.PI*2*(dataValue[i]/total);  
                }
                
               
            	var j=0;
            	var k=0;
                for(var i=0;i<dataValue.length;i++){
                     ctx.fillStyle = colors[i];
                    if(j<7){ 
	                    ctx.font = "9pt Open sans"
	                    ctx.fillRect(550,(i+1)*50,15,15);
	                    ctx.fillText(dataName[i],505,45+(i*50));
	                    ctx.fillText(degree[i].toFixed(2) + '\xB0',505,58+(i*50));
	                    ctx.fillText(percentage[i].toFixed(2) + '%',505,70+(i*50));
	                }

	                else if(j>=7){
	                	ctx.font = '9pt Open sans';
	                	ctx.fillRect(70,(k+1)*50,15,15);
	                	ctx.fillText(dataName[i],30,45+(k*50));
	                	ctx.fillText(degree[i].toFixed(2) + '\xB0',30,58+(k*50));
	                    ctx.fillText(percentage[i].toFixed(2) + '%',30,70+(k*50));
	                	k++;
	                }
	                j++;
                };
                
            };
            draw(opacityValue);

            function displayGraphSlowly(ctx,centerX,centerY,radius,lastPosition,outerRadius,opacityValue, colors, datavalue)
            {
            		console.log('index');
            		var timeInterval;
           			//ctx.setTransform(0.5,0.5,-0.5,1,30,10);
                    timeInterval = setInterval(function(){
						opacityValue +=0.000015;
	                    opacityValue = opacityValue + 0.005;
	                    //console.log(opacityValue + 'sum');
						ctx.fillStyle = colors;
	                    ctx.beginPath();
	                    ctx.moveTo(centerX,centerY);
	                    ctx.arc(centerX,centerY,radius,lastPosition,outerRadius,false);
	                    //ctx.clip();
	                    ctx.lineTo(centerX,centerY);
	                    ctx.globalAlpha = opacityValue;
	                    ctx.fill();
	                    //ctx.rotate(.00009);
	                    //lastPosition += Math.PI*2*(datavalue/total);
	                    ctx.strokeStyle = 'white';
	                    ctx.shadowColor   = '#666';  
	                    ctx.stroke();
	                    ctx.closePath();
						if (opacityValue >= 1) {
							clearInterval(timeInterval);
						} 
					},100);
            };
		};


		/*--------------------------------------------------------------------function to draw pieChart ends---------------------------------------------*/


		/*----------------------------------------------------------------------function to draw histogram begins-----------------------------------------*/

		this.createHistogram = function(dataStack){
			var canvas = document.getElementById('lineCanvas');
			console.log('histogram button clicked');

			//var canvas = can;
			var dataName = [];
			var dataValue = [];
			var width;
			var currX = 50;
			var base = 350;
			var maxVal =0;
			var stepSize;

			if(dataStack.length>7){
				width = 25;
			}
			else{
				width = 50;
			}

			var colors = ["#990099","#109618","#ff9900","#dc3912","#3366cc","#004411","#7E3817", "#2c3e50", "#7f8c8d", "#2980b9", "#1abc9c","#307D7E", "#f39c12", "#5136f6","#f39c12", "#e2f5b4","#fc081f", "#E0FFFF", "#9edd08","#fb1ef8","#fdfbb4", "#faf406","#fbd4b7", "#f2700f","#f8bdb4", "#ea2507","#e2bcbd", "#9e2126","#bbddb3", "#1d8e04"];

			for (var i=0;i<dataStack.length;i++){
				dataValue.push(dataStack[i].score);
				console.log(dataStack[i]);
				dataName.push(dataStack[i].subject);
				if(dataStack[i].score > maxVal){
					maxVal = dataStack[i].score;
					console.log(maxVal);
				}
			};

			stepSize = maxVal/dataStack.length;
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0,0,600,400);
			ctx.fillStyle = "black";
			ctx.font = "12px Open sans"
			for(var i=maxVal;i>=0;i-=1){
				if(Math.ceil(stepSize*i<=maxVal)){
					ctx.beginPath();
					ctx.moveTo(currX-20, canvas.height-i*stepSize*3);
					//console.log(currX-20, canvas.height-i*stepSize*3);
					ctx.lineTo(currX + (width*dataStack.length)+ 20,canvas.height-i*stepSize*3);
					//console.log(currX + (width*dataStack.length)+ 20,canvas.height-i*stepSize*3);
					ctx.fillText(Math.ceil(stepSize*i),currX-50,canvas.height-i*stepSize*3);
					ctx.stroke();
				}
			};
			var height = canvas.height - maxVal;
			ctx.beginPath();

			if(maxVal>60 && maxVal<=80){
				ctx.moveTo(currX-20 , maxVal+40);
			}

			if(maxVal<=100 && maxVal>80){
				ctx.moveTo(currX-20, maxVal-20);
			}
			else if(maxVal>100 && maxVal<110){
				ctx.moveTo(currX-20, maxVal-60);
			}

			else if(maxVal>=110 && maxVal<=120){
				ctx.moveTo(currX-20,maxVal-100);
			}

			else if(maxVal>120){
				ctx.moveTo(currX-20, 20);
			}

			ctx.lineTo(currX-20, canvas.height);
			ctx.stroke();

			for(var i=0;i<dataValue.length;i++){
				var h = dataValue[i] * 3 + 10;
				var heightData = canvas.height - h;
				ctx.fillStyle = colors[i];
				
				displayGraphSlowly(ctx, currX, heightData, width, h, colors[i]);

				currX += width + 0;
			};
			var j=0;
			for(var i=0;i<dataValue.length;i++){
				
				ctx.fillStyle = colors[i];
				ctx.font = "9pt Arial";
				if(i<10){
					ctx.fillRect(currX + 50,35*(i+1),15,15);
					ctx.fillText(dataName[i],currX + 75 , 35*(i+1)+5);
					ctx.fillText(dataValue[i],currX + 75, 35*(i+1)+20);
				}
				else if(i>=10){
					ctx.fillRect(currX + 110,35*(j+1),15,15);
					ctx.fillText(dataName[i],currX+140 , 35*(j+1)+5);
					ctx.fillText(dataValue[i],currX+140, 35*(j+1)+20);
					j++;
				}
			}


			//time interal operation for line graph
			function displayGraphSlowly(ctx, currX, currY, width, height, color){
				var timeInterval;

				var smallHeight = 10;
				var yPos = canvas.height - smallHeight;

				timeInterval = setInterval(function(){
					ctx.fillStyle = color;
					ctx.fillRect(currX, yPos, width, smallHeight);
					yPos -= smallHeight;
					if (yPos <= currY) {
						clearInterval(timeInterval);
					} 
				},50);
			};
		};



		/*------------------------------------------------------------------function to draw histogram ends---------------------------------------------------*/




		/*-------------------------------------------------------------------function to draw bar diagram begins---------------------------------------------*/

		this.createBarDiagram = function(dataStack){
			console.log(dataStack);
			var ctx,
            minVal, maxVal = 0 ,
            xScalar, yScalar,
            numSamples, y;
            var can = document.getElementById('canvas');
        	
        	ctx = can.getContext('2d');
        	ctx.clearRect(0,0,600,400);
        	console.log(ctx);
        	var dataName = [];
        	var dataValue = [];
        	var colors = ["#990099","#109618","#ff9900","#dc3912","#3366cc","#004411","#7E3817", "#2c3e50", "#7f8c8d", "#2980b9", "#1abc9c","#307D7E", "#f39c12", "#5136f6","#f39c12", "#e2f5b4","#fc081f", "#E0FFFF", "#9edd08","#fb1ef8","#fdfbb4", "#faf406","#fbd4b7", "#f2700f","#f8bdb4", "#ea2507","#e2bcbd", "#9e2126","#bbddb3", "#1d8e04"];
        	function init() {
            // set these values for your data
            
            	numSamples = dataStack.length;
            	var colHead = 50;
            	var rowHead = 60;
            	var margin = 10;
            	var header = "Units";
             	for (var i=0; i<dataStack.length; i++){
                	dataValue.push(dataStack[i].score);
                	console.log(dataStack[i]);
                	dataName.push(dataStack[i].subject);
            	}
            	for(var i=0;i<dataValue.length;i++){
                	if(dataValue[i]>maxVal){
                    	maxVal = dataValue[i];
                	}
            	}
            	var stepSize = maxVal/dataValue.length;

            	ctx.beginPath();
            	ctx.fillStyle = "black"
           	 	yScalar = (can.height - colHead - margin) / (maxVal);
            	xScalar = (can.width - rowHead) / (numSamples + 1);
            	ctx.font = "11pt Open sans"
            	ctx.font = "12pt Open sans"
            	ctx.strokeStyle = "rgba(128,128,255, 0.5)"; // light blue line
            	
            	// print  column header
            	
            	var count =  0;
            	for (var scale = maxVal; scale >= 0; scale -= stepSize) {
               	 	y = colHead + (yScalar * count * stepSize);
                	ctx.fillText(Math.floor(scale), margin,y + margin);
                	ctx.moveTo(rowHead, y)
                	ctx.lineTo(can.width, y)
                	count++;
            	}
            	ctx.stroke();
            	// label samples
            	ctx.font = "12pt Open sans";
            	ctx.textBaseline = "bottom";
            	for (i = 0; i < dataValue.length; i++) {
                	calcY(dataValue[i]);
                	ctx.fillText(dataName[i], xScalar * (i + 1), y - margin);
                	ctx.fillStyle = colors[i];
            	}
            	// set a color and a shadow
            	
            	ctx.shadowColor = 'rgba(128,128,128, 0.5)';
            	ctx.shadowOffsetX = 10;
            	ctx.shadowOffsetY = 1;
            	// translate to bottom of graph and scale x,y to match data
            	ctx.translate(0, can.height - margin);
            	ctx.scale(xScalar, -1 * yScalar);
            	// draw bars
            	for (i = 0; i < dataValue.length; i++) {
               	 	displayGraphSlowly(ctx, i+1, 0, 0.5, dataValue[i], colors[i]);
            	}

        	}; 

        	function calcY(value) {

           		 y = can.height - value * yScalar;

        	};	

			//time interal operation for line graph
			function displayGraphSlowly(ctx, currX, currY, width, height, color){
				var timeInterval;

				var smallHeight = 2;
				var yPos = currY;

				timeInterval = setInterval(function(){
					//ctx.beginPath();
					ctx.fillStyle = color;
					ctx.fillRect(currX, yPos, width, smallHeight);
					yPos += smallHeight;
					if (yPos >= height) {
						clearInterval(timeInterval);
					} 
					ctx.closePath();
				},50);
			};

        	init();
		};
	};


	/*---------------------------------------------------------------function to draw bar diagram ends----------------------------------------------------*/



	function Table() {
		var that = this;
		var tableProps = {
			width:450
		};
		this.table = document.getElementById('table1');
		this.table.style.width = tableProps.width + 'px';	
	};





	/*---------------------------------------------------------------create datadiv and form to enter data--------------------------------------------------*/

	function DataDiv () {
		var that = this;
		var optionProps = {
			width:400
		};

		this.element = document.createElement('div');
		this.element.style.width = optionProps.width + 'px';
		
		this.element.style.float = 'left';

		this.createForm = function(){
			var that = this;

			this.label1 = document.createElement('label');
			this.label1.setAttribute('for','name');
			this.label1.innerHTML = 'Name' ;
			this.label1.style.fontFamily = 'Open sans';
			this.label1.style.margin = '10px 10px 10px 0px';

			this.inputElement1 = document.createElement('input');
			this.inputElement1.setAttribute('id','data1');
			this.inputElement1.setAttribute('placeholder', 'Name');
			this.inputElement1.setAttribute('type','text');
			this.inputElement1.style.background = 'url(images/inputtype.png)';
			this.inputElement1.style.height = '26px';
			this.inputElement1.style.width = '229px';
			this.inputElement1.style.border = '0px';
			this.inputElement1.style.borderCollapse = 'collapse';
			this.inputElement1.style.paddingLeft = '10px';
			this.inputElement1.style.marginBottom = '10px';
			this.inputElement1.style.marginTop = '10px';


			this.label2 = document.createElement('label');
			this.label2.setAttribute('for','data');
			this.label2.innerHTML = '<br>Data';
			this.label2.style.fontFamily = 'Open sans';
			this.label2.style.margin = '10px 20px 10px 10px';

			this.inputElement2 = document.createElement('input');
			this.inputElement2.setAttribute('id','data2');
			this.inputElement2.setAttribute('placeholder','Value');
			this.inputElement2.setAttribute('type','text');
			this.inputElement2.style.background = 'url(images/inputtype.png)';
			this.inputElement2.style.height = '26px';
			this.inputElement2.style.width = '229px';
			this.inputElement2.style.border = '0px';
			this.inputElement2.style.borderCollapse = 'collapse';
			this.inputElement2.style.paddingLeft = '10px';
			this.inputElement2.style.marginRight = '100px';
			this.inputElement2.style.marginBottom = '10px';

			this.btnSave = document.createElement('input');
			this.btnSave.setAttribute('type','button');
			this.btnSave.setAttribute('value', 'Add Data');
			this.btnSave.setAttribute('id','btnSave');
			this.btnSave.style.color = 'white';
			this.btnSave.style.borderCollapse = 'collapse';
			this.btnSave.style.border = '0px';
			this.btnSave.style.background = 'url(images/bbtn.png)';
			this.btnSave.style.width = '79px';
			this.btnSave.style.height = '20px';
			this.btnSave.style.margin = '10px 10px 10px 60px';
			this.btnSave.style.cursor = 'pointer';
			

			this.btnCancel = document.createElement('input');
			this.btnCancel.setAttribute('type','button')
			this.btnCancel.setAttribute('value','Cancel');
			this.btnCancel.setAttribute('id','btnCancel');
			this.btnCancel.style.color = 'white';
			this.btnCancel.style.borderCollapse = 'collapse';
			this.btnCancel.style.border = '0px';
			this.btnCancel.style.background = 'url(images/bbtn.png)';
			this.btnCancel.style.width = '69px';
			this.btnCancel.style.height = '20px';
			this.btnCancel.style.marginLeft = '10px';
			this.btnCancel.style.cursor = 'pointer';


			this.element.appendChild(this.label1);
			this.element.appendChild(this.inputElement1);
			this.element.appendChild(this.label2);
			this.element.appendChild(this.inputElement2);
			this.element.appendChild(this.btnSave);
			this.element.appendChild(this.btnCancel);	
		};		
	};




	/* -------------------------------------------------------------------end of datadiv and form to enter data-----------------------------------------------*/






	/*----------------------------------------------------------------------create piechart button--------------------------------------------------------*/

	function PiChart(){
		var that = this;
		var piChartProps = {
			height:60,
			width:150
		};

		this.piChart = document.createElement('div');
		this.piChart.style.height = piChartProps.height + 'px';
		this.piChart.style.width = piChartProps.width + 'px';
		this.piChart.style.background = 'url(images/piechar.png)';
		this.piChart.style.marginBottom = '20px';
		this.piChart.style.cursor = 'pointer';
		this.piChart.style.float = 'left';
		this.piChart.style.margin = '20px 0px 20px 10px';
		
		this.piChart.onmouseover = function(){
			that.piChart.style.opacity = '0.5';
		};
		this.piChart.onmouseout = function(){
			that.piChart.innerHTML = '';
			that.piChart.style.opacity = '1';
		}
	};




	/*----------------------------------------------------------------------create bardiagram button-------------------------------------------------------*/

	function BarDiagram(){
		var that = this;
		var barDiagramProps = {
			height:60,
			width:150
		};

		this.barDiagram = document.createElement('div');
		this.barDiagram.style.height = barDiagramProps.height + 'px';
		this.barDiagram.style.width = barDiagramProps.width + 'px';
		this.barDiagram.style.background = 'url(images/barchart.png)';
		
		this.barDiagram.style.margin = '20px 10px 20px 0px';
		this.barDiagram.style.cursor = 'pointer';
		this.barDiagram.style.float = 'right';
		this.barDiagram.onmouseover = function(){
			that.barDiagram.style.opacity = '0.5';
		};
		this.barDiagram.onmouseout = function(){
			that.barDiagram.innerHTML = '';
			that.barDiagram.style.opacity = '1';
		}
	};



	/*--------------------------------------------------------------------create histogram button------------------------------------------------------------*/




	function Histogram(){
		var that = this;
		var histogramProps = {
			height:60,
			width:150
		};
		this.histogram = document.createElement('div');
		this.histogram.style.height = histogramProps.height + 'px';
		this.histogram.style.width = histogramProps.width + 'px';
		this.histogram.style.background = 'url(images/histogram.png)';
		this.histogram.style.cursor = 'pointer';
		this.histogram.style.float = 'left';
		this.histogram.style.margin = '10px 0px 20px 10px';
		this.histogram.onmouseover = function(){
			that.histogram.style.opacity = '0.5';
		};
		this.histogram.onmouseout = function(){
			that.histogram.innerHTML = '';
			that.histogram.style.opacity = '1';
		}
	};




	/*------------------------------------------------------------------------create linegraph button-----------------------------------------------------------*/




	function LineGraph(){
		var that = this;
		var lineGraphProps = {
			height:60,
			width:150
		};
		this.lineGraph = document.createElement('div');
		this.lineGraph.style.width = lineGraphProps.width + 'px';
		this.lineGraph.style.height = lineGraphProps.height + 'px';
		this.lineGraph.style.background = 'url(images/linegra.png)';
		this.lineGraph.style.margin = '10px 10px 20px 0px';
		this.lineGraph.style.cursor = 'pointer';
		this.lineGraph.style.float = 'right';

		this.lineGraph.onmouseover = function(){
			that.lineGraph.style.opacity = '0.5';
		};
		this.lineGraph.onmouseout = function(){
			that.lineGraph.innerHTML = '';
			that.lineGraph.style.opacity = '1';
		}
	};




	/*---------------------------------------------------------------------create choose file button-----------------------------------------------------------*/




	function Choose(){
		var that = this;
		var fileUploadProps = {
			height:70,
			width:165
		};

		this.fileUpload = document.createElement('input');
		this.fileUpload.innerHTML = 'choose file';
		this.fileUpload.setAttribute('type','file');
		this.fileUpload.setAttribute('id','fileUpload');
		this.fileUpload.style.float = 'left';
		this.fileUpload.style.marginLeft = '60px';
		
	};

	

	/*-------------------------------------------------------creates upload file button---------------------------------------------------------------------*/

	function Upload(){
		var that = this;
		this.upload = document.createElement('input');
		this.upload.setAttribute('type','button');
		this.upload.setAttribute('id','upload');
		this.upload.setAttribute('value','Upload');
		this.upload.style.float = 'right';
		this.upload.style.paddingLeft = '20px';
		this.upload.style.background = 'url(images/upload.png)';
		this.upload.style.marginLeft = '30px';
		this.upload.style.height = '25px';
		this.upload.style.width = '79px';
		this.upload.style.cursor = 'pointer';
		this.upload.style.color = 'white';
		this.upload.style.borderCollapse = 'collapse';
		this.upload.style.border = '0px';

		this.upload.onmouseover = function(){
			that.upload.style.opacity = '0.5';
		};

		this.upload.onmouseout = function(){
			that.upload.style.opacity = '1';
		};
		
	};


	/*----------------------------------------------------Datahandler handles and manipulates all datas-------------------------------------------------------------*/

	function DataHandler(){
		var that = this;

		var table = document.getElementById('table1');

		var counter = 0;
		var toEditContact;

		/*this.dataStack = [
			{id: 1, subject: 'Maths', score: 60},
			{id: 2, subject: 'Phy', score: 50},
			{id: 3, subject: 'Nep', score: 100},
			{id: 4, subject: 'EPH', score:88},
			{id: 5, subject: 'Sci', score:88},
			{id: 6, subject: 'Chem', score:78},
			{id: 7, subject: 'Eng', score:87}
		];*/

		this.dataStack1 = [
			{id:1,subject:'Jan',score:15},
			{id:2,subject:"Feb", score:10},
			{id:3,subject:"Mar", score:30},
			{id:4,subject:"Apr", score:70},
			{id:5,subject:"May", score:70},
			{id:6,subject:"Jun", score:60},
			{id:7,subject:"July",score:40},
			{id:8,subject:"Aug", score:85},
			{id:9,subject:"Sept", score:90},
			{id:10,subject:"Oct", score:50},
			{id:11,subject:"Nov", score:75},
			{id:12,subject:"Dec", score:100}
		];


		this.dataStack = [

			{id:1,subject:'Jan',score:85},
			{id:2,subject:"Feb", score:100},
			{id:3,subject:"Mar", score:80},
			{id:4,subject:"Apr", score:70},
			{id:5,subject:"May", score:60},
			{id:6,subject:"Jun", score:50},
			{id:7,subject:"July",score:70},
			{id:8,subject:"Aug", score:55},
			{id:9,subject:"Sept", score:10},
			{id:10,subject:"Oct", score:55},
			{id:11,subject:"Nov", score:75},
			{id:12,subject:"Dec", score:60}
		];

		var findContactById = function(id) {
			for (var i=0; i<that.dataStack.length; i++) {
				if (that.dataStack[i].id === id)
					return that.dataStack[i];
			};
		};

		var editAction = function(toEdit){
			document.getElementById('data1').value = toEdit.subject;
			document.getElementById('data2').value = toEdit.score;
			document.getElementById('btnSave').value = 'Edit';
		};

		var updateEditRow = function(){
			var td1 = document.getElementById('td-' +toEditContact.id +'-1');
			var td2 = document.getElementById('td-' + toEditContact.id + '-2');
			td1.innerHTML = toEditContact.subject;
			td2.innerHTML = toEditContact.score;
		};

		var updateSerialNumber = function(){
			for(var i=0; i<that.dataStack.length;i++){
				var td = document.getElementById('td-' + that.dataStack[i].id + '-0');
				td.innerHTML = i+1;
			};

		};

		var deleteContact = function(deleteId){
			for(var i=0;i<that.dataStack.length;i++){
				if(that.dataStack[i].id === deleteId){
					that.dataStack.splice(i,1);
					table.removeChild(document.getElementById('row-'+ deleteId));
					counter--;
				}
			};

			updateSerialNumber();
		};

		var deleteAction = function(toDelete){
			console.log('deleteAction');
			var deleteId = toDelete.id;
			deleteContact(deleteId);
		};

	    this.updateCancel = function(){
	    	document.getElementById('btnSave').value = 'Add Data';
	    	document.getElementById('data1').value ='';
	    	document.getElementById('data2').value = '';
	    }

		this.updateEdit = function(){
			console.log('updateEdit');
			var data1 = document.getElementById('data1').value;
			var data2 = document.getElementById('data2').value;
			document.getElementById('btnSave').value = 'Add Data';
			for(var i=0; i<that.dataStack.length;i++){
				if(that.dataStack[i].id === toEditContact.id){
					that.dataStack[i].subject = data1;
					that.dataStack[i].score = parseInt(data2);
				}
			};
			document.getElementById('data1').value = '';
			document.getElementById('data2').value = '';
			updateEditRow();
		};

		var displayInTable = function(data){
			
			var tr = document.createElement('tr');
			tr.setAttribute('id', 'row-' + data.id);

			var td0 = document.createElement('td');
			td0.setAttribute('id','td-' +data.id+'-0');
			
			var td1 = document.createElement('td');
			td1.setAttribute('id','td-' +data.id + '-1');
			
			var td2 = document.createElement('td');
			td2.setAttribute('id','td-' +data.id + '-2');
			
			var td3 = document.createElement('td');
			
			var td4 = document.createElement('td');
			tr.style.height = '40px';

			td0.style.paddingLeft = '10px';
			td1.style.paddingLeft = '10px';
			td2.style.paddingLeft = '10px';
			td0.style.background = '#bdc3c7';
			td1.style.background = '#bdc3c7';
			td2.style.background = '#bdc3c7';
			td3.style.background = '#bdc3c7';
			td4.style.background = '#bdc3c7';

			//if(data.id%2 ===0){
			if(counter%2 === 0){
				td0.style.background= "#EAF2D3";
				td1.style.background = "#EAF2D3";
				td2.style.background = '#EAF2D3';
				td3.style.background = '#EAF2D3';
				td4.style.background = '#EAF2D3';
				//tr.style.border = '1px solid #98bf21';

			}

			var btnEdit = document.createElement('input');
			btnEdit.setAttribute('value','Edit');
			btnEdit.setAttribute('type','button');
			btnEdit.style.height = '25px';
			btnEdit.style.width = '79px';
			btnEdit.style.color = 'white';
			//btnEdit.style.opacity = '0';
			btnEdit.style.background = 'url(images/edit.png)';
			btnEdit.style.cursor = 'pointer';
			btnEdit.style.borderCollapse = 'collapse';
			btnEdit.style.border = '0px';
			btnEdit.style.marginLeft = '25px';
			btnEdit.style.paddingLeft = '15px';

			btnEdit.onmouseover = function(){
				btnEdit.style.opacity = '0.5';
			};
			btnEdit.onmouseout = function(){
				btnEdit.style.opacity = '1';
			};

			btnEdit.onclick = function(){
				return function(){
				var id = data.id;
				var toEdit = findContactById(id);
				toEditContact = toEdit;
				editAction(toEdit);
				};
			}();

			var btnDelete = document.createElement('input');
			btnDelete.setAttribute('value','Delete');
			btnDelete.setAttribute('type','button');
			btnDelete.style.height = '25px';
			btnDelete.style.width = '79px';
			btnDelete.style.color = 'white';
			btnDelete.style.background = 'url(images/btndelete.png)';
			btnDelete.style.cursor = 'pointer';
			btnDelete.style.borderCollapse = 'collapse';
			btnDelete.style.border = '0px';
			btnDelete.style.marginLeft = '25px';
			btnDelete.style.paddingLeft = '25px';

			btnDelete.onmouseover = function(){
				btnDelete.style.opacity = '0.5';
			};
			btnDelete.onmouseout = function(){
				btnDelete.style.opacity = '1';
			};

			btnDelete.onclick = (function(){
				return function(){
					var id = data.id;
						if(confirm('Are you sure you want to delete the record ?') === true){
						console.log(id);
						var toDelete = findContactById(id);
						console.log(toDelete);
						deleteAction(toDelete);	
					};																	
				};
			})();

			td0.style.fontFamily = 'Open sans';
			td0.innerHTML = counter + 1;
			td1.style.fontFamily = 'Open sans';
			td1.innerHTML = data.subject;
			td2.style.fontFamily = 'Open sans';
			td2.innerHTML = data.score;

			td3.appendChild(btnEdit);
			td4.appendChild(btnDelete);

			tr.appendChild(td0);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);

			table.appendChild(tr);
			counter++;
		};

		this.getNewId = function() {
			console.log('getNewId');
			var max = 0;
			for (var i=0; i<that.dataStack.length; i++) {
				if (that.dataStack[i].id > max)
				max = that.dataStack[i].id;
			};
			return max + 1;
		};

		this.loadData = function(){

			table.innerHTML = '';
			counter = 0;
			
			for(var i=0;i<that.dataStack.length;i++){
				var data = that.dataStack[i];
				displayInTable(data);
			};
		};


		this.addAction = function(){
			console.log('here');
			var data1 = document.getElementById('data1').value;
			var data2 = document.getElementById('data2').value;

			//data2 = parseInt(data2);
			console.log(data1, data2);
			var id = that.getNewId();
			var data = {id: id, subject:data1, score:parseInt(data2)};
			that.dataStack.push(data);
			
			displayInTable(data);
		};
	};


	/*------------------------------------------------------end of DataHandler---------------------------------------------------------------------------*/


	/*----------------------------------------------------------Main function begins--------------------------------------------------------------------*/

	function Chart (mainDiv_) {
		var mainDiv = mainDiv_;
		var topicDiv = new TopicDiv();
		var mainContainer = new MainContainer();
		var informationDiv = new InformationDiv();
		var canvasDiv = new CanvasDiv();
		var canvas = new Canvas();
		var dataDiv = new DataDiv();
		var table = new Table();
		var dataHandler = new DataHandler();
		var btnPiChart = new PiChart();
		var btnBarDiagram = new BarDiagram();
		var btnHistogram = new Histogram();
		var btnLineGraph = new LineGraph();
		var choose = new Choose();
		var upload = new Upload();

		var mainDivProps = {
			width:1300
		};

		var chartSetup = function (){
			mainDiv.style.width = mainDivProps.width + 'px';
			//mainDiv.style.border = '1px solid black';
			mainDiv.style.margin = '0px auto';
			mainDiv.style.overflow = 'auto';
			mainDiv.style.position = 'relative';

			mainDiv.appendChild(topicDiv.topicElement);
			mainDiv.appendChild(mainContainer.element);
			mainContainer.element.appendChild(informationDiv.informationDiv);
			mainContainer.element.appendChild(canvasDiv.canvasDiv);
			informationDiv.informationDiv.appendChild(dataDiv.element);
			dataDiv.createForm();

			canvasDiv.canvasDiv.appendChild(canvas.canvas);
			canvasDiv.canvasDiv.appendChild(canvas.can);
			canvasDiv.canvasDiv.appendChild(canvas.canvas1);
			canvasDiv.canvasDiv.appendChild(canvas.canvas2);
			informationDiv.informationDiv.appendChild(table.table);
			informationDiv.informationDiv.appendChild(btnPiChart.piChart);
			informationDiv.informationDiv.appendChild(btnBarDiagram.barDiagram);
			informationDiv.informationDiv.appendChild(btnHistogram.histogram);
			informationDiv.informationDiv.appendChild(btnLineGraph.lineGraph);
			informationDiv.informationDiv.appendChild(choose.fileUpload);
			informationDiv.informationDiv.appendChild(upload.upload);
			
		};

		chartSetup();
		dataHandler.loadData();
		btnSave.onclick = function(){
			if(btnSave.value === 'Add Data'){
				dataHandler.addAction();
			}
			else if(btnSave.value === 'Edit'){
				console.log(btnSave.value);
				dataHandler.updateEdit();
			}
		};

		btnCancel.onclick = function(){
				console.log(btnCancel.value);
				dataHandler.updateCancel();
		};

		btnPiChart.piChart.onclick = function(){
			console.log('piChart');
			canvas.createPiChart(dataHandler.dataStack);
		};

		btnBarDiagram.barDiagram.onclick = function(){
			console.log('barDiagram');
			canvas.createBarDiagram(dataHandler.dataStack);
		};

		btnHistogram.histogram.onclick = function(){
			canvas.createHistogram(dataHandler.dataStack);
		};

		btnLineGraph.lineGraph.onclick = function(){
			canvas.createLineGraph(dataHandler.dataStack);
			//canvas.createLineGraph(dataHandler.dataStack1);
		};

		/*--------------------------------------------------------csv file upload function begins--------------------------------------------------------*/

		upload.upload.onclick = function(){
			console.log('button clicked');
			var fileUpload = document.getElementById('fileUpload');
			console.log(upload);
			var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
			if (typeof (FileReader) != "undefined") {
				var reader = new FileReader();
				reader.onload = function (e) {
					var rows = e.target.result.split("\n");
                	for (var i = 0; i < rows.length; i++) {
                    	var cells = rows[i].split(",");
                    	console.log(cells);
                    	var id =  dataHandler.getNewId();
                    	dataHandler.dataStack.push({id: id, subject:cells[0],score:parseInt(cells[1])});
                    	console.log(cells[0]);
                    	console.log(cells[1]);
                    	console.log(dataHandler.dataStack);
                	};
					dataHandler.loadData();
				}
				reader.readAsText(fileUpload.files[0]);
            	console.log(fileUpload.files[0]);
				}
			else {
            	alert("This browser does not support HTML5.");
        	}
		};

		/*---------------------------------------------------------------end of csv file upload function----------------------------------------------*/
	};

	/*------------------------------------------------------------------main function ends--------------------------------------------------------------------*/

	window.Chart = Chart;
})();