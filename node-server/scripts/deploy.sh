set -e
set -x
npm run build

scp -r \
    public \
    dist \
dennis_aws:/home/ubuntu/Tecky-Project-3/node-server 

ssh dennis_aws "
    source /home/ubuntu/.nvm/nvm.sh && \
    cd /home/ubuntu/Tecky-Project-3/node-server/ && \
    npm i --omit=dev && \
    cd dist && \
    npx knex migrate:latest && \
    cd .. && \
    forever restart dist/server.js
" 