document.addEventListener('DOMContentLoaded', () => {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosSalvos.forEach(produto => criarCartao(produto));
  });
  
  function adicionarProduto() {
    const produto = document.getElementById('produto').value;
    const tipo = document.getElementById('tipo').value;
    const link = document.getElementById('link').value;
    const loja = document.getElementById('loja').value;
    
    document.getElementById('produto-error').style.display = 'none';
    document.getElementById('tipo-error').style.display = 'none';
    document.getElementById('loja-error').style.display = 'none';

    let hasError = false;

    if (!produto) {
        document.getElementById('produto-error').style.display = 'block';
        hasError = true;
    }

    if (!tipo) {
        document.getElementById('tipo-error').style.display = 'block';
        hasError = true;
    }

    if (!link) {
        document.getElementById('link-error').style.display  = 'block';
        hasError = true
    }

    if (!loja) {
        document.getElementById('loja-error').style.display = 'block';
        hasError = true;
    }

    if (hasError) {
        return;
    }
  
    const produtoInfo = { produto, tipo, link, loja };
  
    // Salvar no LocalStorage
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produtoInfo);
    localStorage.setItem('produtos', JSON.stringify(produtos));
  
    document.getElementById('produto').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('link').value = '';
    document.getElementById('loja').value = '';
  
    window.location.href = 'produtos.html';
  }
  
  function criarCartao(produto) {
    let lojaSection = document.getElementById(produto.loja);
  
    if (!lojaSection) {
      lojaSection = document.createElement('div');
      lojaSection.id = produto.loja;
      lojaSection.className = 'loja-section ' + produto.loja.replace(/\s+/g, '-'); 

      const lojaTitle = document.createElement('div');
      lojaTitle.className = 'loja-nome';
      lojaTitle.innerHTML = `
        <span>${produto.loja}</span>
        <svg class="toggle-icon w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
        </svg>
      `;
  
      const toggleIcon = lojaTitle.querySelector('.toggle-icon');
  
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'cards-container';
  
      toggleIcon.addEventListener('click', function () {
        cardsContainer.classList.toggle('collapsed');
        const path = toggleIcon.querySelector('path');
        if (cardsContainer.classList.contains('collapsed')) {
          path.setAttribute('d', 'M19 15L12 8L5 15');
        } else {
          path.setAttribute('d', 'm19 9-7 7-7-7');
        }
      });
  
      lojaSection.appendChild(lojaTitle);
      lojaSection.appendChild(cardsContainer);
  
      document.getElementById('lista-produtos').appendChild(lojaSection);
    }
  
    const card = document.createElement('div');
    card.className = 'card ' + produto.loja.replace(/\s+/g, '-');
  
    const link = document.createElement('div');
    link.className = 'card-link';
  
    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = produto.produto;
  
    const type = document.createElement('div');
    type.className = 'card-text';
    type.textContent = `${produto.tipo}`;
  
    const store = document.createElement('div');
    store.className = 'card-text';
    store.textContent = `${produto.loja}`;
  
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
  
    const buyButton = document.createElement('button');
    buyButton.className = 'buy-btn';
    buyButton.innerHTML = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
    <path 
      d="M235.52-60.78q-42.74 0-70.74-31.63-28-31.63-22.87-74.37h171.48l40.57-163.39 79.43.56 54.35-220.78-296.39-.57 9.87-84.91q4.56-40.17 34.91-67.24 30.35-27.06 70.52-27.06h61.48q11.39-80.66 59.98-124.85 48.59-44.2 129.24-44.2 68.52 0 114.13 50.05 45.61 50.04 41.78 119h77.13q47.87 0 79.5 35.47 31.63 35.48 25.5 83.35l-56.61 457.39q-5.13 40.18-34.98 66.68-29.84 26.5-70.02 26.5H235.52ZM21.35-224.17l26.21-106h246.57l-26.22 106H21.35Zm80-163.39 26.21-106.01H414.7l-26.79 106.01H101.35ZM474.7-730.17h132.43q-.13-26.22-18.54-44.63-18.42-18.42-44.07-18.42-29.35 0-47.02 16.7-17.67 16.69-22.8 46.35Z"/>
    </svg>
`;
  
    buyButton.addEventListener('click', function() {
      const linkInput = produto.link.trim();
      const isValidLink = linkInput.startsWith('http://') || linkInput.startsWith('https://');
      
      if (isValidLink) {
        window.open(linkInput, '_blank');
      } else {
        alert('Por favor, cole um link válido.');
      }
    });

    const fixButton = document.createElement('button');
    fixButton.className = 'fix-btn';
    fixButton.innerHTML = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
    <path 
      d="m213.78-91.17 100.35-327.74-266.91-190.7h328.3L480-954.48l104.48 344.87h328.3l-266.91 190.7L746.78-91.17l-266.21-202.7-266.79 202.7Z"/>
    </svg>
`;
  
    fixButton.addEventListener('click', function() {
      const cardsContainer = lojaSection.querySelector('.cards-container');
      cardsContainer.prepend(card);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
    <path 
      d="M564.39-387v-106h346v106h-346ZM439.43-94l-100.99-90.82q-90.66-81.96-151.77-142.85-61.11-60.89-98-111.55Q51.78-489.87 36-534.7q-15.78-44.82-15.78-93.65 0-102.48 68.65-170.91 68.65-68.44 170.56-68.44 51.44 0 97.87 19.52 46.44 19.53 82.13 56.7 36.27-37.17 82.42-56.7Q568-867.7 619.43-867.7q95.74 0 161.72 60.26 65.98 60.27 76.03 147.92-26.48-16.61-56.64-25.48-30.15-8.87-61.28-9.44-106.09 0-180.48 74.18-74.39 74.17-74.39 180.26 0 62.74 29.2 117.15 29.19 54.42 81.32 89.11-17.87 16.44-40.74 37-22.87 20.57-43.73 38.87L439.43-94Z"/>
    </svg>
  `;

    deleteButton.addEventListener('click', function() {
      const confirmarExclusao = confirm('Você tem certeza que deseja excluir este produto?');
      if (confirmarExclusao) {
        card.remove();
        removerProdutoDoLocalStorage(produto);
        
        if (lojaSection.querySelectorAll('.card').length === 0) {
          lojaSection.remove();
        }
      }
    });
  
    buttons.appendChild(buyButton);
    buttons.appendChild(fixButton);
    buttons.appendChild(deleteButton);

  
    card.appendChild(link);
    card.appendChild(title);
    card.appendChild(type);
    card.appendChild(store);
    card.appendChild(buttons);
  
    lojaSection.querySelector('.cards-container').appendChild(card);
  }
  

  // Função para remover o produto do LocalStorage
  function removerProdutoDoLocalStorage(produto) {
  const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
  
  const novosProdutos = produtosSalvos.filter(item => item.produto !== produto.produto || item.loja !== produto.loja);
  
  localStorage.setItem('produtos', JSON.stringify(novosProdutos));
}