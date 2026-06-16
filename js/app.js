const state={cliente:{},tema:'',cores:[],cart:{}};
const temas=[['Safari','🦁'],['Fazendinha','🚜'],['Princesa','👑'],['Jardim','🦋'],['Futebol','⚽'],['Outro','🎨']];
const cores=[['Rosa','#ff7eb6'],['Azul','#268fbe'],['Lilás','#9b72ef'],['Verde','#3ddb8f'],['Amarelo','#a9f04d'],['Branco','#ffffff'],['Marrom','#7a4d35'],['Dourado','#d6a84f']];
const produtos=[
{id:1,tipo:'personalizado',nome:'Brigadeiro decorado',preco:4.30,unidade:'unidade'},
{id:2,tipo:'personalizado',nome:'Cupcake decorado',preco:15.00,unidade:'unidade'},
{id:3,tipo:'personalizado',nome:'Pirulito de chocolate decorado',preco:13.00,unidade:'unidade'},
{id:4,tipo:'personalizado',nome:'Bombom grande decorado 3D',preco:18.00,unidade:'unidade'},
{id:5,tipo:'tradicional',nome:'Beijinho',preco:190.00,unidade:'cento'},
{id:6,tipo:'tradicional',nome:'Brigadeiro tradicional',preco:190.00,unidade:'cento'},
{id:7,tipo:'tradicional',nome:'Brigadeiro de Oreo',preco:210.00,unidade:'cento'},
{id:8,tipo:'tradicional',nome:'Brigadeiro Ninho com Nutella',preco:250.00,unidade:'cento'},
{id:9,tipo:'tradicional',nome:'Bombom de Morango',preco:9.00,unidade:'unidade'}
];
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function go(id){document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);renderReview();renderBudget()}
document.addEventListener('click',e=>{const n=e.target.dataset.next,p=e.target.dataset.prev;if(n)go(n);if(p)go(p)});
function init(){
 temaOptions.innerHTML=temas.map(([t,ico])=>`<button class="option-card" onclick="selectTema('${t}',this)"><span>${ico}</span><strong>${t}</strong></button>`).join('');
 corOptions.innerHTML=cores.map(([n,hex])=>`<button title="${n}" class="color-dot" style="background:${hex}" onclick="selectCor('${n}',this)"></button>`).join('');
 renderProducts('personalizado',personalizadosList);renderProducts('tradicional',tradicionaisList);
 const today=new Date().toISOString().split('T')[0];dataEvento.min=today;dataEntrega.min=today;
 btnWhatsapp.addEventListener('click',sendWhatsApp);
}
function selectTema(t,el){state.tema=t;document.querySelectorAll('#temaOptions .option-card').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')}
function selectCor(c,el){if(state.cores.includes(c)){state.cores=state.cores.filter(x=>x!==c);el.classList.remove('selected');return} if(state.cores.length>=3){alert('Escolha no máximo 3 cores.');return} state.cores.push(c);el.classList.add('selected')}
function renderProducts(tipo,el){el.innerHTML=produtos.filter(p=>p.tipo===tipo).map(p=>`<article class="product"><div><h3>${p.nome}</h3><p>${money(p.preco)} / ${p.unidade}</p></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b id="q${p.id}">0</b><button onclick="changeQty(${p.id},1)">+</button></div></article>`).join('')}
function changeQty(id,delta){const p=produtos.find(x=>x.id===id);const atual=state.cart[id]?.qtd||0;const qtd=Math.max(0,atual+delta);if(qtd===0)delete state.cart[id];else state.cart[id]={...p,qtd};document.getElementById('q'+id).textContent=qtd;renderReview();renderBudget()}
function total(){return Object.values(state.cart).reduce((s,i)=>s+i.preco*i.qtd,0)}
function renderReview(){if(!window.cartReview)return;const items=Object.values(state.cart);cartReview.innerHTML=items.length?items.map(i=>`<div class="budget-card"><span><b>${i.nome}</b><b>${i.qtd}</b></span><span>${money(i.preco)} / ${i.unidade}<b>${money(i.preco*i.qtd)}</b></span></div>`).join(''):'<p class="muted">Nenhum produto selecionado ainda.</p>'}
function renderBudget(){const t=total();if(window.totalEstimado){totalEstimado.textContent=money(t);entradaValor.textContent=money(t/2);saldoValor.textContent=money(t/2)}}
function fmtDate(v){if(!v)return '-';const [a,m,d]=v.split('-');return `${d}/${m}/${a}`}
function sendWhatsApp(){const n=clienteNome.value||'-',w=clienteWhatsapp.value||'-';let msg='Olá! Gostaria de solicitar um orçamento Jujuba Doces.%0A%0A';msg+=`Nome: ${n}%0AWhatsApp: ${w}%0AE-mail: ${clienteEmail.value||'-'}%0AData do evento: ${fmtDate(dataEvento.value)}%0ATema: ${state.tema||'-'}%0ACores: ${state.cores.join(', ')||'-'}%0AEntrega/retirada: ${fmtDate(dataEntrega.value)} às ${horaEntrega.value||'-'}%0ATipo: ${tipoEntrega.value}%0A%0AItens:%0A`;Object.values(state.cart).forEach(i=>msg+=`• ${i.nome} - qtd ${i.qtd} - ${money(i.preco*i.qtd)}%0A`);msg+=`%0ATotal estimado: ${money(total())}%0AEntrada 50%: ${money(total()/2)}%0ASaldo: ${money(total()/2)}%0A%0AObservações: ${observacoes.value||'-'}`;window.open('https://wa.me/?text='+msg,'_blank')}
init();
