#SKU Seleção Ativa
>*Extensões da plataforma VTEX são plugins criados por desenvolvedores de interface ou pelo VTEX Lab (Laboratório de Inovações da VTEX) que podem ser inseridas em sua loja. Existem extensões gratuitas com código aberto -  Open Source - e extensões pagas.  Indicamos que a instalação seja realizada pelos profissionais e empresas certificados pela VTEX. Vale ressaltar que qualquer profissional de CSS, JavaScript e HTML pode também executar esta tarefa.*

----------

Este plugin tem a finalidade de evitar que o usuário clique no SKU de um produto (checkbox) enquanto ele não estiver com as funções de seleção aplicadas pela plataforma.

##Instalação
Faça o upload para o "Gerenciador do portal" no "Vtex Admin" dos seguintes arquivos:
* SKU_selecao_ativa.min.js

Faça a chamada do arquivo javascript e CSS na página:
```html
<script type="text/javascript" src="/arquivos/SKU_selecao_ativa.min.js"></script>
```

Crie e estilize uma `div` que ficará sobreposta ao controle de SKU da página de produto. 

Execute o plugin. Como seletor/elemento use a `div` criada no passo acima.
```javascript
$("._overlay").vtexLoadingSku();
```