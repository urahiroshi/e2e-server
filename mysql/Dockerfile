FROM mysql:5.5

ADD *.cnf /etc/mysql/conf.d/
# db settings (executed by alphabetical order)
ADD *.sql /docker-entrypoint-initdb.d/
