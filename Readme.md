## Configuração do Docker Compose integrado ao Spring Boot (Linux)

Siga este passo a passo para permitir que o Spring Boot (e a IDE) utilizem o Docker Compose no Linux sem problemas de permissão.

### 1. Criar o grupo docker (caso ainda não exista)

sudo groupadd docker

### 2. Adicionar o usuário atual ao grupo docker

sudo usermod -aG docker $USER

### 3. Reiniciar o computador

É obrigatório reiniciar para que as permissões sejam aplicadas.

reboot

### 4. Verificar se o usuário pertence ao grupo docker

Após reiniciar, execute:

groups

O grupo `docker` deve aparecer na lista.

### 5. Verificar as permissões do socket do Docker

ls -l /var/run/docker.sock

A saída esperada é:

srw-rw---- 1 root docker ...

### 6. Testar o acesso ao Docker sem sudo

docker ps

Se os containers forem listados corretamente, o Docker está configurado e pronto para uso com o Spring Boot.
