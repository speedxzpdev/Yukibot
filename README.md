# YukiBot

YukiBot é um bot open source, desenvolvido por Speed. Você pode fazer o que quiser com ela!

## Créditos

A base inicialmente foi feita por **ARCANJA**, **BELPHEGOR**, e **PEDROZZ MODS**. O que eu fiz foi implementar algumas mudanças e adicionar comandos e mais funções para facilitar a criação de novos comandos.

## Instalação

Siga os passos abaixo para instalar o YukiBot. É importante notar que os comandos podem variar de acordo com o ambiente. Recomendo que você tenha uma ideia de qual ambiente vai usar. No Debian/Ubuntu, use **sudo apt install**, enquanto no Termux, use **pkg install**.

### 1. Instale o Node.js
``
sudo apt install nodejs
``
### 2. Instale o Git
``
sudo apt install git
``
### 3. Clone o repositório
``
git clone https://github.com/speedxzpdev/Yukibot.git
``
### 4. Entre na pasta do projeto
``
cd Yukibot
``

**Pronto! Você já tem a pasta do bot. Agora, configure-a.**

## Configuração

Primeiro de start no bot para configurar o numero
``
sh start.sh
``

Entre na pasta `config.js` e lá você poderá configurar praticamente tudo no bot.

## Funções que você pode usar nas switch cases

### **enviar**
``
Envia uma mensagem simples. Modo de uso:
await enviar("Oiee, a Yuki é linda!");
``
### **enviarImg**
``
Envia uma imagem simples. Modo de uso:
await enviarImg(link);
``
### **enviarImg2**
``
Envia uma imagem com legenda. Modo de uso:
await enviarImg2(link, "oiiii");
``
### **enviarAd**
``
Envia um áudio. Modo de uso:
await enviarAd(link);
``
### **enviarVd**
``
Envia um vídeo simples. Modo de uso: await enviarVd(link)
``
### **enviarVd2**
``
Envia um video com legenda. Modo de uso: await enviarVd2(link, "oiiii")
``
### **sender**
``
Pega o autor da mensagem
``
### **mention**
``
Pega tanto menções com @ e com respostas.
``

## Conclusão

Isso é o básico! Há muitas outras funções disponíveis, e você poderá descobrir como usá-las ao explorar o código.