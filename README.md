// 1. Install Package:
npm install --save-dev sequelize sequelize-cli mysql2

// 2. Getting Started:
npx sequelize-cli init

// 3. Edit on "config > config.json"
/*
"development": 
    { 
        "username": "root", 
        "password": "abc12345", 
        "database": "titanic", 
        "host": "localhost", 
        "dialect": "mysql" 
    }
*/

// 4. Create Model
npx sequelize-cli model:generate --name users --attributes username:string,email:string,password:string

// 5. Setup Models

// 6. Migration
sequelize-cli db:migrate
sequelize-cli db:migrate:undo
sequelize-cli db:migrate:undo:all
sequelize-cli db:migrate:status