QTYBox
===========

QTYBox is an input field modifier, to incrase and decrase the contained number in the input field. It's useful for webshop's product pages, where the customer easier set up the quantity of the products, without using keyboard. The script insert an up and down control buttons after/before the inputbox, and if it was clicked they incrase or decrase the number in the inputbox.

![Screenshot](http://img827.imageshack.us/img827/8080/screenshotmootools.jpg)

How to use
----------

Set up the html first. Link to Mootools and QTYBox js files:

	<script type="text/javascript" src="js/mootools-core-1.3.2.js"></script>
	<script type="text/javascript" src="js/mootools-more-1.3.2.1.js"></script>
	<script type="text/javascript" src="js/qtybox.js"></script>

and link the CSS Style sheet:

	<link rel="stylesheet" type="text/css" href="style.css" />

The script working in 2 modes (Insert or Create), what depend on the given 'name' parameter: if the element is available in DOM what has same id with 'name', the script will inject buttons after or before to the element, else if not available they will create and give back the element with the buttons.

Insert 
----------

If you have an inputbox on your html page already, you can use this feature on your html page.

Your input field on your html page:

	<input type="text" name="quantity_1" id="quantity_1" />

if you dont have an id on your input tag, please add it with your own id, example: quantity_1


Javascript:

	window.addEvent("domready", function(){ 
		new QTYBox('quantity_1');
	});


Create 
----------

Create a full quantitybox object element, and use with your own script. If you use this mode, don't forget to insert an element somewhere in your html.

Javascript:
	
	window.addEvent("domready", function(){ 
		for (i=1;i<6;i=i+1){
			$('container').appendChild(new QTYBox('qty_'+i,{initValue:i,incValue:i,minValue:i,maxValue:i*10} )); 

		}
	});

Options 
----------

*place: where inject the buttons, default:'after', 'before';

*initValue: init value of the inputbox, default:1;

*minValue: minimum value of the inputbox, default: 1;

*maxValue: maximum value of the inputbox, default: 20;

*incValue: increment value of the inputbox, default: 1;

*showError: highlight the inputbox when user want to incrase or decrase more then minValue and maxValue, default: true;

*hlColor: highlight color on inputbox, default: #FFBBBB;

*cboxClass: QTYBox container div class default: 'QTYBox';

*onChange: Execute a given function when the value changed in the input field, default: null;

*onIncrase: Execute a given function when the value increased in the input field, default: null;

*onDecrase: Execute a given function when the value decrased in the input field, default: null;



Examples
----------

Events
----------

This example show you how to use change events on the QTYBox. 

onChange: Execute a given function when the value changed in the input field

onIncrase: Execute a given function when the value increased in the input field

onDecrase: Execute a given function when the value decrased in the input field



HTML:

	<div class="QTYBox">
		<label for="quantity_2">Quantity:</label>
		<input type="text" name="quantity_2" id="quantity_2" />
	</div>

Javascript:

	window.addEvent("domready", function(){ 
		new QTYBox('quantity_2',{
			onChange: function(qtybox){
				alert('You changed!');
			},
			onIncrase:function(qtybox){
				alert('You clicked Incrase');
			},
			onDecrase:function(qtybox){
				alert('You clicked Decrase');
			} 

		});

	});


Styling
----------

You can style QTYBox to you website easyier by CSS Styles.

I'm using a single PNG file to animate buttons, and assign a background file and position to predefined class names in your css file, like this:

	.QTYBox2 .up,.QTYBox2 .down,.QTYBox2 .up_h,.QTYBox2 .down_h,.QTYBox2 .up_c,.QTYBox2 .down_c{background-image: url(img/qtybox_buttons.png);}
	.QTYBox2 .up { background-position:0px 0px;}
	.QTYBox2 .down {	background-position:0px 20px;}
	.QTYBox2 .up_h { background-position:40px 0px;}
	.QTYBox2 .down_h {	background-position:40px 20px;}
	.QTYBox2 .up_c { background-position:20px 0px;}
	.QTYBox2 .down_c {	background-position:20px 20px;}


Create date selector
----------

HTML:

	<div id="date-container"></div>

Javascript:

	var date = new Date();
	$('date-container').appendChild(new QTYBox('date-select-year',{initValue:date.get('year'),incValue:1,minValue:date.get('year')-90,maxValue:date.get('year')} ));
	$('date-container').appendChild(new QTYBox('date-select-month',{initValue:date.get('month'),incValue:1,minValue:1,maxValue:12} ));
	$('date-container').appendChild(new QTYBox('date-select-day',{initValue:date.get('day'),incValue:1,minValue:1,maxValue:31} ));


