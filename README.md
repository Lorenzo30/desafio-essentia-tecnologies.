##Subir container mysql 
docker-compose up -d 

##Rodar migrations backend
npx prisma migrate deploy
