# FORMIGUINHA VERDE (GREEN ANT) // HACKATHON NASA 2019 (https://2019.spaceappschallenge.or)

<p align="center"><img src="https://raw.githubusercontent.com/nayraclt/nasa/master/public/img/screnshot.pnp.png"></p>

Algumas pastas estão ignoradas pelo .gitignore.

Levando em consideração que você tenha o <code> php </code> e <code> composer </code> na sua variável global PATH, para uma nova instalação do Laravel.


# Clonando o projeto 

Vou  considerar que você esteja rodando um sistema operacional Linux/Windows e com o git instalado, faça o seguinte:

<strong> Clone o projeto</strong> <br>
<code>  git clone https://github.com/nayraclt/nasa.git  </code> 
<br>

<strong> Instale as dependências e o framework</strong>
<br>
<code>
composer install --no-scripts
</code>

<strong>Copie o arquivo .env.example</strong>
<br>
<code> cp .env.example .env </code>

<strong> Crie uma nova chave para a aplicação</strong>
<br>
<code>php artisan key:generate</code>

Alterar as configurações do seu .env para

```

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret

```

Em rodar as migrations com:

<code> php artisan migrate --seed </code>
