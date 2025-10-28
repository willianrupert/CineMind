#!/usr/bin/env bash
# exit on error
set -o errexit

# Executa os comandos de build do Django
python src/manage.py collectstatic --no-input
python src/manage.py migrate
# Popula as perguntas do questionário
python src/manage.py populate_questions

# Cria o superusuário se as variáveis de ambiente estiverem definidas
if [[ -n "$DJANGO_SUPERUSER_USERNAME" && -n "$DJANGO_SUPERUSER_PASSWORD" && -n "$DJANGO_SUPERUSER_EMAIL" ]]; then
  python src/manage.py createsuperuser --noinput || true
fi

# Ao final, executa o comando passado como argumento (por exemplo, o servidor)
exec "${@:-bash}"
