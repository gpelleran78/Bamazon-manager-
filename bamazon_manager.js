const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "QAZwsx1234",
    database: "bamazon_db"
});

let makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        console.log("ItemID\tProduct Name\tDepartment Name\tPrice\tNumber in Stock");
        console.log("===================================");
        for(var i=0; i<res.length; i++){
            console.log(res[i].item_id+"\t"+res[i].product_name+"\t"+res[i].department_name+"\t"+res[i].price+"\t"+res[i].stock_quanity);
        }
        console.log("====================================");
    })
    promptManager(res);
}

var promptManager = function(){
    inquirer.prompt()
}

makeTable();
