# **Sistema de Controle de Estoque, Vendas e Distribuição**  

## **Descrição do Projeto**  

Este sistema tem como objetivo gerenciar o controle de estoque, vendas e distribuição de produtos, proporcionando uma interface interativa para acompanhamento de dados e execução de operações no banco de dados. A solução permite a inserção, alteração e remoção de registros, além de consultas para análise dos dados.  

O projeto é desenvolvido em **Java** e utiliza **SQL puro** para interação com o banco de dados, sem o uso de frameworks de mapeamento objeto-relacional (ORM).  

## **Funcionalidades**  

- **Gerenciamento de estoque:** controle de entrada, saída e reposição de produtos.  
- **Gestão de vendas:** registro de pedidos, clientes e faturamento.  
- **Distribuição:** rastreamento da entrega e logística dos pedidos.  
- **Dashboard interativo:** visualização gráfica de métricas importantes, como volume de vendas, produtos mais vendidos e estoque disponível.  
- **CRUD completo:** operações de inserção, atualização, deleção e visualização de dados diretamente pela interface.  

## **Tecnologias Utilizadas**  

- **Linguagem:** Java  
- **Banco de Dados:** PostgreSQL ou MySQL  
- **Frontend:** React (web) 
- **SQL puro:** comandos diretos para inserção, atualização, deleção e seleção de dados  

## **Requisitos do Banco de Dados**  

O banco de dados contará com **pelo menos 8 entidades** e aplicará diversos conceitos avançados, incluindo:  

- **Atributos especiais:** composto e multivalorado  
- **Relacionamentos:** cardinalidades variadas, atributos de relacionamento, autorrelacionamento  
- **Estrutura avançada:** entidade fraca, herança  
- **Regras adicionais:** constraints como `CHECK`, `DEFAULT`, `UNIQUE`  

## **Entrega e Desenvolvimento**  

O projeto será desenvolvido e entregue em **dois módulos**, seguindo uma abordagem incremental.  

### **Módulo 1**  

- Definição do mini-mundo  
- Modelagem conceitual e lógica do banco de dados  
- Criação do banco e inserção inicial de dados  
- CRUD funcional em interface simples  
- **Entrega:** Relatório versão 1.0 detalhando as etapas até o momento  

### **Módulo 2**  

- Evolução da interface com dashboard interativo  
- Implementação de consultas SQL avançadas  
- **Entrega:** Relatório final com documentação completa e apresentação  

## **Restrições**  

- **Não utilizar frameworks ORM** como Django, SQLAlchemy, Hibernate ou similares.  
- **Toda interação com o banco deve ser feita via SQL puro**, sem abstrações intermediárias.  

## **Como Executar**  

1. Rode o Backend

2. Entre no diretório
   
```bash
  cd projetobd-front
```
3. Instale as bibliotecas necessárias

```bash
  npm install
  npm install react-icons
```

4. Rode com o comando
```bash
  npm run start
```
---
