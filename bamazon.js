const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ABCefg1978!",
    database: "bamazon"
});

let makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        console.log("ItemID\tProduct Name\tDepartment Name\tPrice\tNumber in Stock");
        console.log("===================================");
        for(var i=0; i<res.length; i++){
            console.log(res[i].itemid+"\t"+res[i].product.name+"\t"+res[i].departmentname+"\t"+res[i].price+"\t"+res[i].stockquanity);
        }
        console.log("====================================");
    })
}