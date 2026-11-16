
document.addEventListener("DOMContentLoaded", function () {


    const botaoMudarCeu =
        document.getElementById("btn-mudar-ceu");

    const corpoPagina = document.body;

    function mudarCeu() {

        corpoPagina.classList.toggle("tema-crepusculo");

        const crepusculoAtivo =
            corpoPagina.classList.contains(
                "tema-crepusculo"
            );

        if (crepusculoAtivo) {
            botaoMudarCeu.textContent =
                "🌙 Voltar ao pôr do sol";

            botaoMudarCeu.setAttribute(
                "aria-label",
                "Voltar ao tema pôr do sol"
            );
        } else {
            botaoMudarCeu.textContent =
                "☀️ Mudar o céu";

            botaoMudarCeu.setAttribute(
                "aria-label",
                "Mudar para o tema crepúsculo"
            );
        }
    }

    if (botaoMudarCeu) {
        botaoMudarCeu.addEventListener(
            "click",
            mudarCeu
        );
    }

    const botaoMenu =
        document.getElementById("menu-toggle");

    const listaLinks =
        document.getElementById("nav-links");

    function alternarMenu() {
        listaLinks.classList.toggle("ativo");
        botaoMenu.classList.toggle("ativo");

        const menuEstaAberto =
            listaLinks.classList.contains("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            menuEstaAberto
        );

        if (menuEstaAberto) {
            botaoMenu.setAttribute(
                "aria-label",
                "Fechar menu"
            );
        } else {
            botaoMenu.setAttribute(
                "aria-label",
                "Abrir menu"
            );
        }
    }

    function fecharMenu() {
        listaLinks.classList.remove("ativo");
        botaoMenu.classList.remove("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    }

    if (botaoMenu && listaLinks) {
        botaoMenu.addEventListener(
            "click",
            alternarMenu
        );

        const linksDeNavegacao =
            document.querySelectorAll(
                ".nav-links a"
            );

        linksDeNavegacao.forEach(
            function (link) {
                link.addEventListener(
                    "click",
                    fecharMenu
                );
            }
        );
    }
    document.addEventListener(
        "keydown",
        function (evento) {
            if (
                evento.key === "Escape" &&
                listaLinks &&
                listaLinks.classList.contains("ativo")
            ) {
                fecharMenu();
            }
        }
    );
    const linksInternos =
        document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(function (link) {
        link.addEventListener(
            "click",
            function (evento) {
                const destinoId =
                    link.getAttribute("href");
                if (
                    !destinoId ||
                    destinoId === "#"
                ) {
                    evento.preventDefault();
                    return;
                }

                const secaoDestino =
                    document.querySelector(
                        destinoId
                    );

                if (secaoDestino) {
                    evento.preventDefault();

                    secaoDestino.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    });

    const elementosAnimados =
        document.querySelectorAll(".reveal");

    const usuarioPrefereMenosMovimento =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (usuarioPrefereMenosMovimento) {
        elementosAnimados.forEach(
            function (elemento) {
                elemento.classList.add("ativo");
            }
        );
    } else {
        const observador =
            new IntersectionObserver(
                function (entradas) {
                    entradas.forEach(
                        function (entrada) {
                            if (
                                entrada.isIntersecting
                            ) {
                                entrada.target.classList.add(
                                    "ativo"
                                );
                                observador.unobserve(
                                    entrada.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.15
                }
            );

        elementosAnimados.forEach(
            function (elemento) {
                observador.observe(elemento);
            }
        );
    }

    const elementoAno =
        document.getElementById("anoAtual");

    if (elementoAno) {
        const anoAtual =
            new Date().getFullYear();

        elementoAno.textContent = anoAtual;
    }
});