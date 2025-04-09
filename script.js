function limiteMaximo(carteira) {
    if (carteira >= 9 && carteira <= 12) return 2500;
    if (carteira >= 13 && carteira <= 24) return 4000;
    if (carteira >= 25 && carteira <= 36) return 6000;
    if (carteira >= 36) return 8000;
    return 0;
}


function calcularValores() {
    let salario = parseFloat(document.getElementById('salario').value);
    let carteira = parseInt(document.getElementById('carteira').value);

    let tabelaMeiaParcela = document.getElementById('tabelaMeiaParcela');
    let mensagemLimite = document.getElementById('mensagemLimite');

    tabelaMeiaParcela.innerHTML = '';
    mensagemLimite.innerHTML = '';

    if (salario > 0 && carteira > 0) {
        let parcelaTotal = 0.35 * salario;
        let meiaParcela = parcelaTotal / 2;

        let prazos = [6, 8, 10, 12, 18];
        let fatores = {
            6: 0.258870,
            8: 0.203897,
            10: 0.171126,
            12: 0.149400,
            18: 0.113759
        };

        let prazosPermitidos = [];

        if (carteira >= 9 && carteira <= 12) {
            prazosPermitidos = [6];
        } else if (carteira >= 13 && carteira <= 24) {
            prazosPermitidos = [6, 8];
        } else if (carteira >= 25 && carteira <= 36) {
            prazosPermitidos = [8, 10];
        } else if (carteira >= 36) {
            prazosPermitidos = [10, 12, 18];
        }

        let encontrouValorValido = false;

        prazosPermitidos.forEach(prazo => {
            let valor = meiaParcela / fatores[prazo];
            let limite = limiteMaximo(carteira);

            if (valor > limite) {
                
                valor = limite;
                meiaParcela = valor * fatores[prazo];

                mensagemLimite.innerHTML = `
                    <p style="color: red;">Seu saldo liberado ultrapassou o limite máximo. O valor máximo liberado para sua faixa de tempo de carteira é R$ ${valor.toFixed(2)}.</p>
                `;
            }

            if (valor >= 500) {
                tabelaMeiaParcela.innerHTML += `
                    <tr>
                        <td>R$ ${meiaParcela.toFixed(2)}</td>
                        <td>R$ ${valor.toFixed(2)}</td>
                        <td>${prazo} meses</td>
                    </tr>
                `;
                encontrouValorValido = true;
            }
        });

        if (!encontrouValorValido) {
            mensagemLimite.innerHTML = `
                <p style="color: red;">O valor liberado excedeu o limite máximo permitido pelo banco. Por favor, revise as condições e tente novamente.</p>
            `;
        }

    } else {
        alert('Por favor, insira um salário e tempo de carteira válidos!');
    }
}

function enviarWhatsApp() {
    let salario = parseFloat(document.getElementById('salario').value);
    let carteira = parseInt(document.getElementById('carteira').value);

    if (salario > 0 && carteira > 0) {
        let parcelaTotal = (0.35 * salario).toFixed(2);
        let meiaParcela = (parcelaTotal / 2).toFixed(2);

        let mensagem = `Olá, fiz uma simulação de empréstimo:%0A*Salário:* R$ ${salario.toFixed(2)}%0A*Meia Parcela:* R$ ${meiaParcela}%0A*Tempo de Carteira:* ${carteira} meses%0APoderia me ajudar com mais informações?`;

        let telefone = "556181908545";
        let url = `https://wa.me/${telefone}?text=${mensagem}`;
        window.open(url, "_blank");
    } else {
        alert("Por favor, preencha os campos corretamente antes de enviar!");
    }
}