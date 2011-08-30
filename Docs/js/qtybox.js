/*
---
description: Easy input box modification, to increase or decrease a number value with mouse 

license: MIT-style

authors:
- Tamas Nyari

requires:
- MooTools 1.3.2

provides: QTYBox

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
		onChange:null,
		onIncrase:null,
		onDecrase:null
		
	},
	
	
	 initialize: function(name,options) {
		 this.name = name; 
		 this.setOptions(options);
		 if ($(this.name)){
			 this.qtyfield = $(this.name);
			 this.qtyvalue = this.qtyfield.get('value');
			 this.cbox = false;
			 this.initController();
			 this.init();
			 
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
		this.qtyfield.addEvent('keydown', function(event) { 
			if (_this.options.onChange != null){_this.options.onChange(this);}
			if (event.key == 'up' || event.key == 'right'){
				_this.incrase();
				if (_this.options.onIncrase != null){_this.options.onIncrase(this);}
			} else if (event.key == 'down' || event.key == 'left'){
				_this.decrase();
				if (_this.options.onDecrase != null){_this.options.onDecrase(this);}
			}
		});
	
		
	},

	incrase: function (){
		if (this.options.maxValue > Number(this.qtyfield.get('value')) ){
			this.qtyfield.set('value',Number(this.qtyfield.get('value')) + this.options.incValue);
			//alert(JSON.encode(this.options.onChange));
			if (this.options.onChange != null){this.options.onChange(this);}
			if (this.options.onIncrase != null){this.options.onIncrase(this);}
		} else {
			var bg_color=this.qtyfield.getStyle('backgroundColor');
			if (this.options.showError){this.qtyfield.highlight(this.options.hlColor,bg_color)}
		}
		
		
	},
	decrase: function (){
		if (this.options.minValue < Number(this.qtyfield.get('value')) ){
			this.qtyfield.set('value',Number(this.qtyfield.get('value')) - this.options.incValue);
			if (this.options.onChange != null){this.options.onChange(this);}
			if (this.options.onDecrase != null){this.options.onDecrase(this);}
		} else {
			var bg_color=this.qtyfield.getStyle('backgroundColor');
			if (this.options.showError){this.qtyfield.highlight(this.options.hlColor,bg_color)}
		}
		
	},
	getValue: function(){
		this.qtyfield.get('value');
	},
	setValue: function(value){
		this.qtyfield.set('value',value);
	},
	//Init value
	init: function(){
		this.qtyfield.set('value',this.options.initValue);
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













/*







var QTYBox = new Class({
	
	Implements: [Options],
	options: {
		place: 'after',
		initValue: 1,
		minValue:1,
		maxValue:20,
		incValue:1
		
	},
	
	
	 initialize: function(name,options) {
		 this.name = name; // A vezérlő neve
		 this.setOptions(options);
		 if ($(this.name)){
			 this.qtyfield = $(this.name);
			 this.qtyvalue = this.qtyfield.get('value');
			 this.cbox = false;
			 this.initController();
			 this.init();
		 } else {
			 this.qtyfield = this.createInput();
			 this.qtyvalue = this.options.initValue;
			 this.cbox = new Element('div',{class:'QTYBox'});
			 this.cbox.appendChild(this.qtyfield);
			 this.initController();
			 return this.cbox;
		 }
		 
	},
	initController: function() {
		//Create controller
		var _this = this;
		this.maindiv = new Element('div', { 'class': 'arrowcontainer', id: this.name+'_arrowcontainer' });
		this.updiv = new Element('div', { 'class': 'up', id: this.name+'_up' });
		this.downdiv = new Element('div', { 'class': 'down', id: this.name+'_down' });
		
		this.updiv.inject(this.maindiv);
		this.downdiv.inject(this.maindiv);
		if (this.cbox){
			this.cbox.appendChild(this.maindiv);
		}else{
			this.maindiv.inject(this.qtyfield,this.options.place);
		}
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
		this.qtyfield.addEvent('keydown', function(event) { 
			if (event.key == 'up' || event.key == 'right'){
				_this.incrase();
			} else if (event.key == 'down' || event.key == 'left'){
				_this.decrase();
			}
		});
	
		
	},

	incrase: function (){
		if (this.options.maxValue > Number(this.qtyfield.get('value')) ){
			this.qtyfield.set('value',Number(this.qtyfield.get('value')) + this.options.incValue);
		}
	},
	decrase: function (){
		if (this.options.minValue < Number(this.qtyfield.get('value')) ){
			this.qtyfield.set('value',Number(this.qtyfield.get('value')) - this.options.incValue);
		}
	},
	init: function(){
		if (this.qtyfield.get('value') < 1 ){
			this.qtyfield.set('value',1);
		}
	},
	createInput: function(){
		var qtybox =  new Element('input');
		qtybox.set('id',this.name);	
		qtybox.set('name',this.name);
		qtybox.set('value',this.options.initValue);
		//var cbox = new Element('div');
		return qtybox;	
					
	},
	getBox: function(){
		return this.cbox;
	}
	
});*/