
document.addEventListener("DOMContentLoaded", () => {
    const topo = document.getElementById('topo');
    const contentDiv = document.getElementById('content');

    if (!topo || !contentDiv) {
      console.error("ERRO: Não achei o id='topo' ou o id='content' no HTML!");
      return;
    }

    async function loadPage(url) {
      console.log("Tentando carregar:", url);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Arquivo não encontrado: " + url);
        
        const html = await response.text();
        contentDiv.innerHTML = html;
      } catch (error) {
        console.error(error);
        contentDiv.innerHTML = "<p style='color:red'>Erro ao carregar: " + url + ". Verifique se o nome do arquivo está certo.</p>";
      }
    }

    // Carrega a página inicial
    loadPage('main.html');

    // Clique nos links
    topo.addEventListener('click', (e) => {
      const el = e.target;
      
      // Verifica se clicou em um link
      if (el.tagName === 'A') {
        e.preventDefault();
        console.log("Link clicado:", el.getAttribute('data-link'));

        // Troca a classe
        const links = topo.querySelectorAll('a');
        links.forEach(l => l.classList.remove('current'));
        el.classList.add('current');

        // Carrega o arquivo
        const page = el.getAttribute('data-link');
        if (page) loadPage(page);
      }
    });
  });











document.addEventListener("DOMContentLoaded", () => {
  const pfp = document.getElementById("pfp");
  const contalogin = document.getElementById("contalogin");

  console.log("Elementos encontrados:", { pfp, contalogin }); // Debug inicial

  if (pfp && contalogin) {
    pfp.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("PFP Clicado!");
      contalogin.classList.toggle("ativo");
    });
  } else {
    console.error("Não achei os IDs pfp ou contalogin. Verifique o HTML.");
  }
});