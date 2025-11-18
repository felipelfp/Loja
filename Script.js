const products = [
    { id: 1, name: "Brigadeiro Gourmet", description: "Clássico sabor de chocolate belga. Sabores: Avelã, Paçoca, Café.", price: 4.50, image: "./imagens/Briga.png" },
    { id: 2, name: "Beijinho de Coco", description: "Cremoso de coco com leite condensado e cravo.", price: 3.50, image: "./imagens/Bei.png" },
    { id: 3, name: "Pudim de Leite", description: "Clássico com sabor de leite caramelizado.", price: 7.00, image: "./imagens/Pudin.png" },
    { id: 4, name: "Cocada de Tabuleiro", description: "Coco e açúcar, variações com leite condensado ou queimado.", price: 5.00, image: "./imagens/Coco.png" },
    { id: 5, name: "Pé-de-Moleque", description: "Rústico e popular, amendoim caramelizado.", price: 2.00, image: "./imagens/pe.png" },
    { id: 6, name: "Paçoca", description: "Doce de amendoim esfarelado e prensado.", price: 1.50, image: "./imagens/paço.png" },
    { id: 7, name: "Quindim", description: "Origem portuguesa, gemas, açúcar e coco.", price: 6.00, image: "./imagens/Din.png" },
    { id: 8, name: "Romeu e Julieta", description: "Combinação clássica de queijo com goiabada.", price: 4.00, image: "./imagens/rj.png" },
    { id: 9, name: "Pirulito Giga", description: "Pirulitos artesanais gigantes, diversos sabores frutados.", price: 8.00, image: "./imagens/gi.png" },
    { id: 10, name: "Puxa-Puxa (Bala Azeda)", description: "Balas artesanais azedinhas.", price: 0.50, image: "./imagens/Puxa.png" },
    { id: 11, name: "Quebra-Queixo", description: "Doce de coco duro e caramelizado.", price: 3.00, image: "./imagens/Quebra.png" },
    { id: 12, name: "Pastel Doce", description: "Leite ninho com nutela.", price: 10.00, image: "./imagens/Pas.png" },
];

let cart = [];


function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        // Alterado de 'img src' para usar a classe CSS 'product-image'
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})" class="btn-primary">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productCard);
    });
}



function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        alert(`${product.name} adicionado ao carrinho!`);
    }
}

function updateCartDisplay() {
    const cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        li.innerHTML = `
            ${item.name} (${item.quantity}x) 
            <span>R$ ${itemTotal.toFixed(2)}</span>
        `;
        cartItemsEl.appendChild(li);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function toggleCart(event) {
    event.preventDefault(); 
    const modal = document.getElementById('cart-modal');
   
    if (modal.style.display === "flex") { 
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
        updateCartDisplay(); 
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', renderProducts);