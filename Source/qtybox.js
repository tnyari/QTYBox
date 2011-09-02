/*
---
description: Easy input box modification, to increase or decrease a number value with mouse 

license: MIT-style

authors:
- Tamas Nyari

requires:
- MooTools 1.3.2

provides: [QTYBox]

...
*/


var QTYBox = new Class({
	
	Implements: [Options],

	//options
	options: {
		place: 'after', //buttons place: before/after
		initValue: 1,
		minValue:1,
		maxValue:20,
		incValue:1,
		showError:true,
		hlColor:'#FFBBBB',
		cboxClass:'QTYBox',
		disableEdit:false,
		
		onChange:$empty,
		onIncrase:$empty,
		onDecrase:$empty
		
	},
	
	
	 initialize: function(name,options) {
		 this.name = name; 
		 this.setOptions(options);
		 if ($(this.name)){
			 this.qtyfield = $(this.name);
			 this.cbox = false;
			 this.initController();
			 this.init();
			 this.qtyvalue = this.qtyfield.get('value');
			 
		 } else {
			 this.qtyfield = this.createInput();
			 this.qtyvalue = this.options.initValue;
			 this.cbox = new Element('div',{class:this.options.cboxClass});
			 this.cbox.appendChild(this.qtyfield);
			 this.initController();
			 return this.cbox;
		 }
		 
	},
	initController: function() {
		var _this = this;
		this.maindiv = new Element('div', { 'class': 'arrowcontainer', id: this.name+'_arrowcontainer' });
		this.updiv = new Element('div', { 'class': 'up', id: this.name+'_up' });
		this.downdiv = new Element('div', { 'class': 'down', id: this.name+'_down' });
		
		this.updiv.inject(this.maindiv);
		this.downdiv.inject(this.maindiv);
		if (this.cbox){
			this.cbox.appendChild(this.maindiv);
		} 
		this.maindiv.inject(this.qtyfield,this.options.place);
		
		//bind events
		this.updiv.addEvent('click', this.incrase.bind(this));
		this.downdiv.addEvent('click', this.decrase.bind(this));			

		//bind events for interactivity
		this.updiv.addEvent('mouseover', function(){_this.updiv.set('class','up_h');});
		this.updiv.addEvent('mouseout', function(){_this.updiv.set('class','up');});
		
		this.updiv.addEvent('mousedown', function(){_this.updiv.set('class','up_c');});
		this.updiv.addEvent('mouseup', function(){_this.updiv.set('class','up');});
		
		this.downdiv.addEvent('mouseover', function(){_this.downdiv.set('class','down_h');});
		this.downdiv.addEvent('mouseout', function(){_this.downdiv.set('class','down');});
		
		this.downdiv.addEvent('mousedown', function(){_this.downdiv.set('class','down_c');});
		this.downdiv.addEvent('mouseup', function(){_this.downdiv.set('class','down');});
		
		
		//bind key events
		this.qtyfield.addEvent('keypress', function(event) { 
			_this.options.onChange(this);
			
			if (event.key == 'up' || event.key == 'right'){
				_this.incrase();
				_this.options.onIncrase(this);
			} else if (event.key == 'down' || event.key == 'left'){
				_this.decrase();
				_this.options.onDecrase(this);
			} else {
				_this.checkValue(event);			
			}
			
		});
		
	},
	
	
	checkValue: function (event){
		var regex = RegExp(/^[-+]?[0-9]+$/);
    	this.qtyvalue = this.getValue();
		if ((!regex.test(event.key) && event.key != 'backspace' && event.key != 'delete' && event.key != '-'  ) || this.options.disableEdit  ){
			event.preventDefault();
			this.error();}
		else {
			
			if (event.key != 'backspace' && event.key != 'delete'){
				event.preventDefault();
				if (event.key == '-' && this.qtyvalue > 0 && !this.qtyvalue.test('-')) { 
					var newValue = event.key + this.qtyvalue;
				} else if (event.key != '-'){
					var newValue = this.qtyvalue + event.key;
				} else if (this.qtyvalue == '') {
					var newValue = event.key;
				} else {
					var newValue = this.qtyvalue;
				}
				
				if (newValue.toFloat() > this.options.maxValue.toFloat() || (newValue.toFloat() < this.options.minValue.toFloat() && newValue.length >=  this.options.minValue.length)   ){
					this.error();
				} else {
					if (newValue == '-' || newValue == ''){
						this.setValue(newValue);
					} else {
						this.setValue(newValue.toFloat());
					}
				}
			}
			
		}
	},	

	incrase: function (){
		this.qtyvalue = this.getValue();
		var newValue = this.qtyvalue.toFloat() + this.options.incValue.toFloat();
		if (this.options.maxValue >= newValue ){
			this.setValue(newValue);
			this.options.onChange(this);
			this.options.onIncrase(this);
		} else {
			this.error();
		}
	},
	decrase: function (){
		this.qtyvalue = this.getValue();
		var newValue = this.qtyvalue.toFloat() - this.options.incValue.toFloat();
		if (this.options.minValue <= newValue ){
			this.setValue(newValue);
			this.options.onChange(this);
			this.options.onDecrase(this);
		} else {
			this.error();
		}
	},
	error:function(){
		var bg_color=this.qtyfield.getStyle('backgroundColor');
		if (this.options.showError){this.qtyfield.highlight(this.options.hlColor,bg_color)}
	},
	getValue: function(){
		return this.qtyfield.get('value');
	},
	setValue: function(value){
		this.qtyfield.set('value',value);
	},
	//Init value
	init: function(){
		this.qtyfield.set('value',this.options.initValue);
		this.oldValue = this.options.initValue;
	},
	createInput: function(){
		var qtybox =  new Element('input');
		qtybox.set('id',this.name);	
		qtybox.set('name',this.name);
		qtybox.set('value',this.options.initValue);
		return qtybox;	
					
	},
	getBox: function(){
		return this.cbox;
	}
	
});

