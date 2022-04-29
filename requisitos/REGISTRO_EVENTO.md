# Registro de Evento
---
## Condições para um registro de Evento ocorrer

1 - Usuário proprietário precisa existir (Não pode ser permitido um registro com usuário inexistente)

2 - O Evento de possuir obrigatoriamente: (Descrição, Data de Início, Data de Fim e Usuário proprietário)

3 - Um usuário nunca pode ter MAIS de UM evento ATIVO ao mesmo tempo.

4 - Eventos INATIVOS e/ou EM ANDAMENTO não podem permitir Subscritores se registrarem

```Status dos Eventos: ATIVO -> Data de início deve ser maior que a data atual. INATIVO -> Data de fim menor que data atual. EM ANDAMENTO -> Data atual MAIOR que Data de início e Data Atual MENOR que Data de FIM. ```

