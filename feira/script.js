// Carrinho de compras
let carrinho = [];
let carrinhoAberto = false;
let containerCarrinho = null;

// Função para adicionar item
function adicionarItem(nome, preco) {
  let item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

// Função para remover item
function removerItem(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  atualizarCarrinho();
}

// Função para atualizar o conteúdo do carrinho
function atualizarCarrinho() {
  if (!containerCarrinho) return;

  containerCarrinho.innerHTML = "<h3>🛒 Carrinho</h3>";
  let lista = document.createElement("ul");
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;

    let li = document.createElement("li");
    li.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;

    // Botão remover
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.onclick = () => removerItem(item.nome);

    li.appendChild(btn);
    lista.appendChild(li);
  });

  containerCarrinho.appendChild(lista);

  let totalEl = document.createElement("p");
  totalEl.textContent = `💰 Total: R$ ${total.toFixed(2)}`;
  containerCarrinho.appendChild(totalEl);
}

// Função para abrir/fechar o carrinho
function toggleCarrinho() {
  if (!containerCarrinho) {
    containerCarrinho = document.createElement("div");
    containerCarrinho.id = "carrinho";
    containerCarrinho.style.position = "fixed";
    containerCarrinho.style.top = "70px";
    containerCarrinho.style.right = "20px";
    containerCarrinho.style.width = "250px";
    containerCarrinho.style.background = "white";
    containerCarrinho.style.padding = "15px";
    containerCarrinho.style.border = "2px solid #1b7ea5";
    containerCarrinho.style.borderRadius = "10px";
    containerCarrinho.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    containerCarrinho.style.display = "none";
    document.body.appendChild(containerCarrinho);
  }

  carrinhoAberto = !carrinhoAberto;
  containerCarrinho.style.display = carrinhoAberto ? "block" : "none";

  if (carrinhoAberto) {
    atualizarCarrinho();
  }
}

// Clique no ícone da sacola abre/fecha o carrinho
document.querySelector(".icons").addEventListener("click", toggleCarrinho);

// Clique nos cards adiciona produto
document.querySelectorAll(".card img").forEach(img => {
  img.addEventListener("click", () => {
    if (img.alt) {
      let preco = Math.floor(Math.random() * 20) + 10; // preco fictício entre 10 e 30
      adicionarItem(img.alt, preco);
    }
  });
});

 const menuBtn = document.getElementById('menu-btn');
  const menuPopup = document.getElementById('menu-popup');

  menuBtn.addEventListener('click', () => {
    menuPopup.style.display = menuPopup.style.display === 'none' ? 'block' : 'none';
  });

  // Fecha o menu se clicar fora dele
  document.addEventListener('click', function(event) {
    if (!menuBtn.contains(event.target) && !menuPopup.contains(event.target)) {
      menuPopup.style.display = 'none';
    }
  });