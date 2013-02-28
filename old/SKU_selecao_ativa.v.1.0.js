/**
* VTEX - SKU Seleção Ativa
* @author Carlos Vinicius
* @version 1.0
* @date 2012-11-16
*/

(function($){
	$.fn.vtexLoadingSku=function(opts)
	{
		var input,on=0,options,log,extTitle,$this,fn,interval;
		
		$this=$(this);
		
		if(!$this.length) return $this;
		
		extTitle="SKU Seleção Ativa";
		log=function(msg,type){
			if(typeof console=="object")
				console.log("["+extTitle+" - "+(type||"Erro")+"] "+msg);
		};
		
		_default=
		{
		};
		
		options=$.extend({},_default,opts);
		
		fn=function()
		{
			if(on) return false;
		
			input=$(".group_0 input:checkbox:not(.item_unavaliable):first");
			if(input.length)
			{
				input.attr("checked",true).trigger("change");
				if(input.next("label").hasClass("sku-picked"))
				{
					input.attr("checked",false)
						.next("label").removeClass("sku-picked");
					$this.hide();
					on=1;
				}
			}
			else
			{
				$this.hide();
				on=1;
			}
		};
		
		// Checando se o controle de SKU esta pronto a cada 3/4 de segundo
		interval=setInterval(function(){
			if(on)
			{
				clearInterval(interval);
				return false;
			}
			fn();
		},750);
		
		// Verificando se o controle de SKU esta pronto após o termino de cada requisição ajax
		$(document).ajaxComplete(function(){
			fn();
		});	
		
		// Exibindo os SKUs e cancelando a função de monitoramento após o window.onload
		$(window).load(function(){
			$this.hide();
			on=1;
		});
	}
})(jQuery);