
async function loadPage(url) {
      const topo = document.getElementById('topo');
    const contentDiv = document.getElementById('content');
    
      console.log("Tentando carregar:", url);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Arquivo não encontrado: " + url);
        
        const html = await response.text();
        contentDiv.innerHTML = html;

        initCarrossel();

      } catch (error) {
        console.error(error);
        contentDiv.innerHTML = "<p style='color:red'>Erro ao carregar: " + url + ". Verifique se o nome do arquivo está certo.</p>";
      }
    }




document.addEventListener("DOMContentLoaded", () => {
    const topo = document.getElementById('topo');
    const contentDiv = document.getElementById('content');

    if (!topo || !contentDiv) {
      console.error("ERRO: Não achei o id='topo' ou o id='content' no HTML!");
      return;
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









function initCarrossel() {
  // Pega todos os containers de carrossel
  const carrosseis = document.querySelectorAll('.carrossel-container');

  carrosseis.forEach(container => {
    const produtos = container.querySelector('.produtos');
    const prevBtn = container.querySelector('.nav.prev');
    const nextBtn = container.querySelector('.nav.next');

    if (!produtos || !prevBtn || !nextBtn) return;

    // Calcula deslocamento com base na largura do primeiro card + gap
    const card = produtos.querySelector('.produto');
    if (!card) return;

    const gap = parseInt(getComputedStyle(produtos).gap) || 20;
    const cardWidth = card.offsetWidth + gap;

    // Remove event listeners antigos para não duplicar
    prevBtn.replaceWith(prevBtn.cloneNode(true));
    nextBtn.replaceWith(nextBtn.cloneNode(true));

    const left = container.querySelector('.nav.prev');
    const right = container.querySelector('.nav.next');

    left.addEventListener('click', () => {
      produtos.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    right.addEventListener('click', () => {
      produtos.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  });
}





const { createClient } = supabase;

const supabaseClient = createClient(
  'https://eglmqjoqmnipcfnhdcyl.supabase.co',
  'sb_publishable_1mVT1wJ14LpEb7xYEoQmvA_fYna-o-Y'
);








window.onload = async () => {
  const { data: { session } } = await supabaseClient.auth.getSession();

  const loginA = document.getElementById("login-a")
  const userArea = document.getElementById("user-area")
  const userName = document.getElementById("user-name")

  // Checagem inicial
  if (session?.user) {
    loginA.style.display = "none"
    userArea.style.display = "block"
    userName.textContent = session.user.email
  }

  // Atualiza automaticamente quando loga/desloga
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      console.log("LOGADO:", session.user.email)
      loginA.style.display = "none"
      userArea.style.display = "block"
      userName.textContent = session.user.email

      loadPage('main.html')
      const links = document.querySelectorAll('#topo a');
      links.forEach(link => link.classList.remove('current'));
      const mainLink = document.querySelector('#topo a[data-link="main.html"]');
      if (mainLink) mainLink.classList.add('current');

    } else {
      console.log("NÃO LOGADO")
      loginA.style.display = "block"
      userArea.style.display = "none"
      userName.textContent = ""
    }
  })
}

document.getElementById("logout-a").addEventListener("click", async (e) => {
  e.preventDefault()
  await supabaseClient.auth.signOut()
})


async function signup() {

  const checkbox = document.getElementById('termos');

  if (!checkbox.checked) {
    alert('Você precisa aceitar os termos!');
    return; // para o signup
  }



  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Conta criada! Verifica o email 📩');
  }

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) alert(error.message);
}

async function login() {

  const checkbox = document.getElementById('termos');

  if (!checkbox.checked) {
    alert('Você precisa aceitar os termos!');
    return;
  }

  

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Logado com sucesso 🚀');
    console.log(data);
  }
}

async function getUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  console.log(user);
}
