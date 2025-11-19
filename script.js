
const produtos = [
    {
        codigo: "BRG001",
        nome: "Brigadeiro Gourmet",
        descricao: "Clássico sabor de chocolate belga. Sabores: Avelã, Paçoca, Café.",
        preco: 4.50,
        imagem: "./imagens/Briga.png"
    },
    {
        codigo: "BEI002",
        nome: "Beijinho de Coco",
        descricao: "Cremoso de coco com leite condensado e cravo.",
        preco: 3.50,
        imagem: "./imagens/Bei.png"
    },
    {
        codigo: "PUD003",
        nome: "Pudim de Leite",
        descricao: "Clássico com sabor de leite caramelizado.",
        preco: 7.00,
        imagem: "./imagens/Pudin.png"
    },
    {
        codigo: "COC004",
        nome: "Cocada de Tabuleiro",
        descricao: "Coco e açúcar, variações com leite condensado ou queimado.",
        preco: 5.00,
        imagem: "./imagens/Coco.png"
    },
    {
        codigo: "PEM005",
        nome: "Pé-de-Moleque",
        descricao: "Rústico e popular, amendoim caramelizado.",
        preco: 2.00,
        imagem: "./imagens/pe.png"
    },
    {
        codigo: "PAC006",
        nome: "Paçoca",
        descricao: "Doce de amendoim esfarelado e prensado.",
        preco: 1.50,
        imagem: "./imagens/paço.png"
    },
    {
        codigo: "QUI007",
        nome: "Quindim",
        descricao: "Origem portuguesa, gemas, açúcar e coco.",
        preco: 6.00,
        imagem: "./imagens/Din.png"
    },
    {
        codigo: "ROM008",
        nome: "Romeu e Julieta",
        descricao: "Combinação clássica de queijo com goiabada.",
        preco: 4.00,
        imagem: "./imagens/rj.png"
    },
    {
        codigo: "PIR009",
        nome: "Pirulito Giga",
        descricao: "Pirulitos artesanais gigantes, diversos sabores frutados.",
        preco: 8.00,
        imagem: "./imagens/gi.png"
    },
    {
        codigo: "PUX010",
        nome: "Puxa-Puxa (Bala Azeda)",
        descricao: "Balas artesanais azedinhas.",
        preco: 0.50,
        imagem: "./imagens/Puxa.png"
    },
    {
        codigo: "QUE011",
        nome: "Quebra-Queixo",
        descricao: "Doce de coco duro e caramelizado.",
        preco: 3.00,
        imagem: "./imagens/Quebra.png"
    },
    {
        codigo: "PAS012",
        nome: "Pastel Doce",
        descricao: "Leite ninho com nutella.",
        preco: 10.00,
        imagem: "./imagens/Pas.png"
    }
];

let carrinho = [];

function adicionarAoCarrinho(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);
    const itemExistente = carrinho.find(item => item.codigo === codigo);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    atualizarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

function atualizarCarrinho() {
    const botaoCarrinho = document.getElementById('botaoCarrinho');
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    if (botaoCarrinho) {
        const badge = botaoCarrinho.querySelector('.carrinho-badge');
        if (badge) {
            badge.textContent = totalItens;
            badge.style.display = totalItens > 0 ? 'flex' : 'none';
        }
    }
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => notificacao.classList.add('show'), 10);
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => notificacao.remove(), 300);
    }, 2000);
}

function abrirCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    const listaCarrinho = document.getElementById('listaCarrinho');
    const totalCarrinho = document.getElementById('totalCarrinho');
    
    listaCarrinho.innerHTML = '';
    
    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        totalCarrinho.textContent = 'R$ 0,00';
    } else {
        let total = 0;
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'carrinho-item';
            itemDiv.innerHTML = `
                <div class="carrinho-item-info">
                    <h4>${item.nome}</h4>
                    <p class="carrinho-item-codigo">Cód: ${item.codigo}</p>
                </div>
                <div class="carrinho-item-quantidade">
                    <button onclick="alterarQuantidade('${item.codigo}', -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade('${item.codigo}', 1)">+</button>
                </div>
                <div class="carrinho-item-preco">
                    <p>R$ ${subtotal.toFixed(2)}</p>
                    <button onclick="removerDoCarrinho('${item.codigo}')" class="btn-remover">✕</button>
                </div>
            `;
            listaCarrinho.appendChild(itemDiv);
        });
        
        totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    modal.style.display = 'flex';
}

function alterarQuantidade(codigo, delta) {
    const item = carrinho.find(i => i.codigo === codigo);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(codigo);
        } else {
            atualizarCarrinho();
            abrirCarrinho();
        }
    }
}

function removerDoCarrinho(codigo) {
    carrinho = carrinho.filter(item => item.codigo !== codigo);
    atualizarCarrinho();
    abrirCarrinho();
}

function fecharCarrinho() {
    document.getElementById('modalCarrinho').style.display = 'none';
}

function enviarParaWhatsApp() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Adicione produtos ao carrinho primeiro!');
        return;
    }
    
    const numeroWhatsApp = '5511999999999'; // Substitua pelo número real
    let mensagem = '🍬 *Pedido - Doces Gourmet*\n\n';
    
    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `*${item.nome}*\n`;
        mensagem += `Código: ${item.codigo}\n`;
        mensagem += `Quantidade: ${item.quantidade}\n`;
        mensagem += `Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });
    
    mensagem += `*Total: R$ ${total.toFixed(2)}*`;
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    mostrarNotificacao('Redirecionando para WhatsApp...');
}

function finalizarCompraOnline() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Adicione produtos ao carrinho primeiro!');
        return;
    }
    
    mostrarNotificacao('Sistema de pagamento em breve!');
}


function renderizarProdutos() {
    const grid = document.getElementById('produtosGrid');
    
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';
        
        card.innerHTML = `
            <div class="produto-image">
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.parentElement.innerHTML='🍬'">
            </div>
            <div class="produto-info">
                <div class="produto-header">
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <span class="produto-codigo">Cód: ${produto.codigo}</span>
                </div>
                <p class="produto-descricao">${produto.descricao}</p>
                <div class="produto-footer">
                    <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.codigo}')">
                        Adicionar
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});


document.querySelector('.contato-form').addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarNotificacao('Obrigado pela mensagem! Entraremos em contato em breve.');
    e.target.reset();
});

window.onclick = function(event) {
    const modal = document.getElementById('modalCarrinho');
    if (event.target === modal) {
        fecharCarrinho();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarCarrinho();
});