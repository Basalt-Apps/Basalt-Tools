read -p "Continue? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

rm -rf /var/www/html/basalt-tools
ng build --base-href /basalt-tools/ --deploy-url /basalt-tools/
mkdir /var/www/html/basalt-tools
cp -r ./dist/basalt-tools/browser/* /var/www/html/basalt-tools/
