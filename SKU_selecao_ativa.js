/**
* VTEX - SKU Seleção Ativa
* @author Carlos Vinicius
* @version 1.1
* @date 2012-11-26
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
			// Define se será utilizado um intervalo de tempo para verificar se o SKU esta pronto.
			useInterval:true,
			// Define se a verificação será feita através de "ajaxStop", "ajaxComplete" ou "none" (para não fazer a verificação após as requisições)
			method:"ajaxComplete",
			// Checar apenas no evento window.onload
			onlyWindowOnload:false,
			// Callback chamado todas as vezes em que o sistema checa se o SKU esta pronto, recebe como parametro uma variável booleane que diz se o SKU esta ativo ou não
			checkCallback:function(active){}
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
					input.attr("checked",false).trigger("change")
						.next("label").removeClass("sku-picked");
					$this.hide();
					on=1;
					options.checkCallback(on);
				}
			}
			else
			{
				$this.hide();
				on=1;
				options.checkCallback(on);
			}
		};
		
		if(!options.onlyWindowOnload)
		{
			// Checando se o controle de SKU esta pronto a cada 3/4 de segundo
			if(options.useInterval)
				interval=setInterval(function(){
					if(on)
					{
						clearInterval(interval);
						return false;
					}
					fn();
				},750);
			
			// Verificando se o controle de SKU esta pronto após o termino de cada requisição ajax
			if(options.method!=="none")
				$(document)[options.method](function(){
					fn();
				});
		}
		
		// Exibindo os SKUs e cancelando a função de monitoramento após o window.onload
		$(window).load(function(){
			$this.hide();
			on=1;
			options.checkCallback(on);
		});
	}
})(jQuery);