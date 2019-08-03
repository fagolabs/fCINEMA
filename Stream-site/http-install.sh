# DB information
DB_NAME=test
USER_DB=test
PASSWD_DB=secret

# package for nginx
apt update
DEBIAN_FRONTEND=noninteractive apt-get install -y \
 build-essential \
 libpcre3 libpcre3-dev libssl-dev \
 zlibc zlib1g zlib1g-dev \
 libxslt-dev

# install postgresql
apt -y install postgresql postgresql-contrib

# install ffmpeg
apt install -y ffmpeg

# install php
add-apt-repository ppa:ondrej/php -y
apt update
apt install -y php7.2 php7.2-pgsql php7.2-curl php7.2-xml php7.2-cgi


# download nginx and nginx-http-flv-module
cd ~
wget http://nginx.org/download/nginx-1.16.0.tar.gz
wget https://github.com/winshining/nginx-http-flv-module/archive/v1.2.6.tar.gz
tar xvzf nginx-1.16.0.tar.gz
tar xvzf v1.2.6.tar.gz

# compile
cd nginx-1.16.0
./configure --prefix=/etc/nginx --user=nginx --group=nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --with-http_ssl_module --add-dynamic-module=/root/nginx-http-flv-module-1.2.6 --with-http_xslt_module
make
make install

# Clone forked stream-site from github
cd ~
git clone https://github.com/hieunt79/stream-site

# setup database
sudo -u postgres createuser test
sudo -u postgres createdb test
cp -r stream-site/src/pgsql/* /tmp
cd /tmp
sed -i s/pg_sql_account_here/$USER_DB/g users.sql
sed -i s/pg_sql_account_here/$USER_DB/g subscribers.sql
sed -i s/pg_sql_account_here/$USER_DB/g chat.sql

cat > owner.sql << EOF
alter user $USER_DB with encrypted password '$PASSWD_DB';
grant all privileges on database $DB_NAME to $USER_DB; 
EOF

sudo -u postgres psql -f owner.sql
sudo -u postgres psql -d test -f users.sql
sudo -u postgres psql -d test -f subscribers.sql
sudo -u postgres psql -d test -f chat.sql

# config database
cd ~/stream-site
sed -i s/USER_DB/$USER_DB/g lib/database.class.php
sed -i s/PASSWD_DB/$PASSWD_DB/g lib/database.class.php
sed -i s/DB_NAME/$DB_NAME/g lib/database.class.php

# add user nginx
useradd -s /sbin/nologin nginx

# add necessary folder
mkdir /var/log/rachni
mkdir -p /var/rachni/rec
chown -R nginx.nginx /var/log/rachni
chown -R nginx.nginx /var/rachni/rec

# copy file to var/www/html
cd ~/stream-site
mkdir -p /var/www/html
cp -r * /var/www/html
rm -rf /var/www/html/src
rm -rf /var/www/html/scss
mkdir -p /var/www/html/img/video
mkdir -p /var/www/html/img/channel
mkdir -p /var/www/html/img/thumbs
chown -R nginx.nginx /var/www/html

# nginx config
cp -R src/nginx/* /etc/nginx
chmod +x /etc/nginx/conf.d/*.sh
cd /etc/nginx
sed -i '1s/^/load_module \/etc\/nginx\/modules\/ngx_http_flv_live_module.so;\n/' /etc/nginx/nginx.conf
echo "error_log /var/log/nginx/error.log debug;" >> /etc/nginx/nginx.conf
sed -i 's/path\/to/etc\/nginx\/conf.d/g' /etc/nginx/conf.d/rtmp.conf
mkdir sites-enabled
cd sites-enabled
ln -s ../sites-available/main.conf main.conf
chown -R nginx.nginx /etc/nginx/*


# add systemd service for nginx

cat > /lib/systemd/system/nginx.service << EOF
[Unit]
Description=The Nginx 1.15.8 service
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT \$MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl start nginx

# run php with php-fpm
sed -i s/www-data/nginx/g /etc/php/7.2/fpm/pool.d/www.conf
sed -i s/cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g /etc/php/7.2/fpm/php.ini
systemctl restart php7.2-fpm
