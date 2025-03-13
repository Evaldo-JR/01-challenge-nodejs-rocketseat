# 📌 Desafio Node.js - CRUD de Tarefas

Este projeto faz parte do meu portfólio de estudos em **Node.js**, seguindo o desafio proposto [neste link](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f).

A proposta era construir uma **API RESTful** para gerenciar tarefas (**Tasks**) sem a utilização de frameworks como Express, reforçando meu aprendizado sobre módulos nativos do Node.js, manipulação de **Streams**, e conceitos fundamentais como **rotas, middlewares e persistência de dados**.

---

## 🚀 Minha Motivação e Jornada

Estou trilhando meu caminho para me tornar um **desenvolvedor fullstack**, e aprender **Node.js** tem sido uma experiência incrível! 🚀  
Esse desafio me ajudou a entender como estruturar uma aplicação no backend, trabalhar com requisições HTTP e organizar melhor meu código.

Cada ajuste e refatoração que fiz aqui me deixou ainda mais motivado para aplicar **Node.js em projetos reais** e seguir evoluindo. 🙌

---

## 📚 O que foi implementado?

✅ **CRUD de Tarefas** → Criar, listar, atualizar, deletar e marcar como concluída.  
✅ **Persistência de Dados** → Banco de dados em arquivo JSON.  
✅ **Middlewares** → Para tratar requisições JSON e extrair parâmetros de rotas.  
✅ **Regex nas Rotas** → Para manipular parâmetros dinâmicos sem Express.js.  
✅ **Sistema de Importação CSV** → Lendo e armazenando tarefas a partir de um arquivo CSV.

---

## ✨ Melhorias que Implementamos

Durante o desafio, refatoramos e melhoramos alguns pontos do código para torná-lo mais eficiente e aderente às boas práticas. Aqui estão algumas das melhorias mais importantes:

### 🔹 1. Validação de ID antes da atualização ou deleção

Antes de atualizar ou excluir uma tarefa, verificamos se o ID realmente existe no banco. Isso evita **erros inesperados** e melhora a segurança da aplicação.

### 🔹 2. Melhor estruturação do middleware JSON

Inicialmente, o middleware JSON estava retornando erro mesmo para requisições **GET** sem body. Ajustamos isso para evitar comportamento inesperado.

### 🔹 3. Função genérica de atualização (`update`)

Refatoramos a lógica de **atualização** no banco de dados para aceitar **qualquer campo** da tarefa, garantindo maior flexibilidade.

### 🔹 4. Separação do processamento de CSV

Criamos um **módulo separado** para lidar com a importação de tarefas via CSV, deixando a rota `POST /tasks/import` **mais limpa e organizada**.

---

## 📂 Endpoints da API

Aqui estão os endpoints disponíveis:

| Método     | Rota                  | Descrição                                   |
| ---------- | --------------------- | ------------------------------------------- |
| **GET**    | `/tasks`              | Lista todas as tarefas                      |
| **POST**   | `/tasks`              | Cria uma nova tarefa                        |
| **PUT**    | `/tasks/:id`          | Atualiza título e/ou descrição              |
| **DELETE** | `/tasks/:id`          | Remove uma tarefa                           |
| **PATCH**  | `/tasks/:id/complete` | Marca ou desmarca uma tarefa como concluída |
| **POST**   | `/tasks/import`       | Importa tarefas de um arquivo CSV           |

---

## 📂 Estrutura do Projeto
```
/src
 ├── database.js         # Simulação de um banco de dados em JSON
 ├── routes.js           # Definição das rotas da API
 ├── server.js           # Configuração do servidor HTTP
 ├── middlewares
 │    ├── json.js       # Middleware para processar requisições JSON
 ├── utils
 │    ├── build-route-path.js  # Helper para criar rotas dinâmicas
 │    ├── import-csv.js        # Função para importar tarefas via CSV
 ├── tasks.csv           # Arquivo de exemplo para importação de tarefas
```

## ⚡ Como Executar o Projeto

### **1️⃣ Clonar o Repositório**

```bash
git clone https://github.com/Evaldo-JR/01-challenge-nodejs-rocketseat.git
cd 01-challenge-nodejs-rocketseat
```

### **2️⃣ Instalar Dependências**

```bash
npm install
```

### **2️⃣ Instalar Dependências**

```bash
npm start
```

---

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **Módulo `http` nativo**
- **Streams**
- **Módulo `fs` para persistência**
- **Regex para rotas dinâmicas**
- **Biblioteca `csv-parse` para importação de CSV**

---

## 🎯 Conclusão

Este projeto me mostrou o poder do Node.js sem frameworks e o quanto é possível fazer apenas com os módulos nativos!
Foi desafiador, mas muito enriquecedor. Agora estou ainda mais empolgado para aprofundar meus estudos e utilizar Node.js em projetos reais.

Se você quiser sugerir melhorias ou discutir alguma parte do código, fique à vontade para abrir uma issue ou entrar em contato! 😃

🚀 Bora codar! 🚀

---

## 📬 Contato

Me acompanhe na jornada e conecte-se comigo:

📧 Email: evaldo_jux@hotmail.com

🔗 LinkedIn: https://www.linkedin.com/in/evaldojr/

🐙 GitHub: http://github.com/Evaldo-JR
