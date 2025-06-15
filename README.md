![hktn2025](hktn2025.jpg)

**Nome dos integrantes do projeto:**

Gabriela alejandra Bergamini dos santos
João Pedro dos Santos Adegas
Pedro Sérgio

**Link do YouTube privado:**

https://youtu.be/1CYDUh5aLqI

**Passo a passo para rodar o projeto:**

* **Pré-requisitos:** (linguagens de programação, bibliotecas, softwares necessários)

Python (para os backends)
Node.js e npm para frontend
bibliotecas necessárias listadas nos arquivos requirements.txt

* **Instruções de instalação e configuração:**
* **Comandos para executar o projeto:**
* **Quaisquer outras informações relevantes para a execução:**

Primeiro para iniciar o projeto devemos iniciar os BackEnd's

Backend - ChatBot

    Criar o ambiente virtual: python -m venv env

    Ativar o ambiente virtual: ./env/Scripts/activate

    Instalar dependências: pip install -r requirements.txt

    Iniciar o servidor: uvicorn main:app --host 0.0.0.0 --port 5000 --reload

Backend - CRUD de Objetivos

    Criar o ambiente virtual: python -m venv env

    Ativar o ambiente virtual: ./env/Scripts/activate

    Instalar dependências: pip install -r requirements.txt

    Iniciar o servidor: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Agora Vamos para iniciar o FrontEnd entre nele pelo Visual Studio Code, abra o terminal e rode o comando:

    npm install - para instalar o Node Modules

Assim que a pasta Node_modules estiver instalada no proejto, rodar o comando:

    IMPORTANTE:

        certifique de ver o ip da sua maquina para rodar o projeto:

        abra o CMD e digite ipconfig
        o ip da maquina vai aparecer neste formato:

             Endereço IPv4. . . . . . . .  . . . . . . . : 172.20.10.6

        colocar o endereço ip da maquina nas chamadas das APIs no front end:

            exemplo de chamada de api no frontEnd:
            http://172.20.10.6:8000/usuarios/1/objetivos_personalizados/

            substítua 172.20.10.6 pelo endereço ip da sua maquina.

            FAÇA ISSO COM TODAS AS CHAMADAS DE API NO FRONT END.

            Assim que os endereços ip estiverem corretos e node_modules estiver na pasta, voce deve rodar o projeto com o comando:

            npx expo start

Irá aparecer um QrCode, Você poderá ver nosso aplicativo escaneando o QrCode, porem precisa instalar o aplicativo Expo Go no celular.


Detalhe as etapas necessárias para executar o seu projeto. Inclua informações sobre:


linguagens de programação: Python, react-native
softwares necessários: instalar o Expo Go no celular
bibliotecas: langchain, langchain-groq , FastApi , Uvicorn. 



SOBRE O PROJETO:

Eight Ways - 8 caminhos para uma saúde melhor 

Nosso projeto foi desenvolvido com base nos 8 remédios naturais de Ellen G. White.
Pensando no tema e na proposta que nos foi passada escolhemos desenvolver um app mobile, pois pensamos na facilidade de uso, como o objetivo é que seja algo mais voltado ao dia a dia do usuário um app mobile se torna mais acessível .
Para tornar esse projeto realidade utilizamos para o front-end , react-native, para o back-end, fast-api, langchain e python, e para prototipação usamos o figma.
Funcionalidades:
Nosso app tem as seguintes funcionalidades:
Na página home temos as divisões dos 8 remédios naturais onde ao acessar cada um deles o usuário tem a possibilidade de ver os objetivos diários associadas àquele remédio, e realizar o preenchimento do formulário de status. Esse formulário funciona da seguinte forma:
Terão perguntas associadas a hábitos saudáveis para colocar cada um dos 8 remédios naturais em prática no dia a dia

o usuário deve responder o questionário de preferência diariamente e o app irá retornar um status de como o usuário está indo na implementação dos 8 remédios no seu dia a dia 

Além disso nosso app tem uma aba de “meus objetivos” e de ‘recomendações’ em recomendações nosso sistema irá recomendar objetivos nos quais o usuário de acordo com sua preferência pode adicionar na sua lista esses exercícios ficam divididos por cada remédio para que fique mais visual para o usuário entender e procurar seus objetivos. Ao adicionar um objetivo de ‘recomendações’ os objetivos já ficam disponíveis na aba “meus objetivos”. O usuário na aba ‘meus objetivos’ também tem a opção de criar objetivos personalizados caso ele deseje, além de poder excluir os objetivos que ele adicionou. A ideia é que os objetivos sejam diários para ajudar o nosso usuário a não procrastinar.

E por último mas não menos importante temos o Lumin, nosso chatbot. Ele foi treinado para tirar dúvidas do usuário em relação aos 8 remédios naturais, e dar auxílio a ele nessa trajetória de se manter mais saudável.

Interface:
Buscamos deixar nosso app intuitivo, com botões que tem função clara e bem aparentes de forma que seja simples o aprendizado do usuário.
Colocamos mensagem de confirmação ao realizar funções como  para excluir um objetivo e adicionar um objetivo, para que fique claro quando as funções forem realizadas dentro do nosso app.

Futures:

Apesar de termos conseguido implementar quase todas as funções que imaginamos para o eight ways e ele ter tomado uma forma da qual ficamos muito felizes,  por conta do tempo não conseguimos refinar e deixar exatamente da forma que queríamos então criamos nossas futures:

Implementar a tela de cada remédio natural a qual é acessada através dos ícones da home
Refinar algumas funções para ter atualização imediata sem a necessidade de recarregar 
Refinar funções que precisam de ajustes.
Refinar o Lumin 
Tirar o app do cenário de desenvolvimento realizando o deploy.

Integrantes do Grupo:

Gabriela Alejandra Bergamine dos Santos - 3 Semestre - SI B
João Pedro dos Santos Adegas - 3 Semestre - SI B
Pedro Sérgio - 3 Semestre - SI B
*Mais informações acesse [Hackathon 2025 - Unasp Tech](https://www.even3.com.br/hackathon-2025-unasp-tech-540337/)**

