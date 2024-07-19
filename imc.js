console.log("teste");

// Array de objetos contendo dados de classificação de IMC
const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];

// Função executada quando a página é carregada
window.onload = function () {
    // Seleciona os elementos do DOM
    const imcTable = document.getElementById("imc-table");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const calcBtn = document.getElementById("calc-btn");
    const clearBtn = document.getElementById("clear-btn");
    const Idade = document.getElementById("Idade");
    const generoM = document.getElementById("masculino");
    const generoF = document.getElementById("femenino");
    const containerResult = document.getElementById("container-result");
    const calcContainer = document.getElementById("calc-container");
    const imcNumber = document.querySelector("#imc-number span");
    const ImcInfo = document.querySelector("#imc-info span");
    const backBtn = document.getElementById("back-btn");

    // Função para criar a tabela de dados de IMC
    function createTable(data) {
        data.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("table-data");

            const classification = document.createElement("p");
            classification.innerText = item.classification;

            const info = document.createElement("p");
            info.innerText = item.info;
            const obesity = document.createElement("p");
            obesity.innerText = item.obesity;

            div.appendChild(classification);
            div.appendChild(info);
            div.appendChild(obesity);

            imcTable.appendChild(div);
        });
    }

    // Função para limpar os campos de entrada e resultados
    function cleanInput() {
        heightInput.value = "";
        weightInput.value = "";
        Idade.value = "";
        generoF.checked = false;
        generoM.checked = false;
        imcNumber.classList = "";
        ImcInfo.classList = "";
    }

    // Função para validar e permitir apenas dígitos, pontos e vírgulas nos campos de entrada
    function validDigits(value) {
        return value.replace(/[^0-9,.]/g, '');
    }

    // Função para calcular o IMC
    function calcImc(weight, height) {
        const imc = (weight / (height * height)).toFixed(1);
        return imc;
    }

    // Função para mostrar ou esconder os resultados
    function showorHideResults() {
        calcContainer.classList.toggle("hide");
        containerResult.classList.toggle("hide");
    }

    // Cria a tabela de dados de IMC ao carregar a página
    createTable(data);

    // Adiciona eventos de entrada para validar os dígitos nos campos de altura, peso e idade
    [weightInput, heightInput, Idade].forEach(el => {
        el.addEventListener("input", (e) => {
            const updatedValue = validDigits(e.target.value);
            e.target.value = updatedValue;
        });
    });

    // Adiciona evento de clique para o botão de calcular IMC
    calcBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const weight = +weightInput.value.replace(",", ".");
        const height = +heightInput.value.replace(",", ".");

        if (!weight || !height) return;

        const imc = calcImc(weight, height); // Calcula o IMC

        let info;

        // Encontra a classificação correspondente ao IMC calculado
        data.forEach((item) => {
            if (imc >= item.min && imc <= item.max) {
                info = item.info;
            }
        });

        if (!info) return;

        // Atualiza os valores do IMC e informação correspondente
        imcNumber.innerText = imc;
        ImcInfo.innerText = info;

        // Adiciona classes para estilos baseados na classificação do IMC
        switch(info) {
            case "Magreza":
                imcNumber.classList.add("low");
                ImcInfo.classList.add("low");
                break;
            case "Normal":
                imcNumber.classList.add("good");
                ImcInfo.classList.add("good");
                break;
            case "Sobrepeso":
                imcNumber.classList.add("low");
                ImcInfo.classList.add("low");
                break;
            case "Obesidade":
                imcNumber.classList.add("medium");
                ImcInfo.classList.add("medium");
                break;
            case "Obesidade grave":
                imcNumber.classList.add("high");
                ImcInfo.classList.add("high");
        }

        // Mostra ou esconde os resultados
        showorHideResults();
    });

    // Adiciona evento de clique para o botão de limpar os campos
    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cleanInput();
    });

    // Adiciona evento de clique para o botão de voltar
    backBtn.addEventListener("click", () => {
        cleanInput();
        showorHideResults();
    });
};
