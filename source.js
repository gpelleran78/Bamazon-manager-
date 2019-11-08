const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "QAZwsx1234",
    database: "bamazon_db"
});

let makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("ItemID\tProduct Name\tDepartment Name\tPrice\tNumber in Stock");
        console.log("====================================================================================");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "\t" + res[i].product_name + "\t" + res[i].department_name + "\t" + res[i].price + "\t" + res[i].stock_quanity);
        }
        console.log("====================================================================================");
        promptManager(res);
    })

}

let promptManager = function (res) {
    inquirer.prompt([{
        type: "rawlist",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add new item", "Add quanity"]
    }]).then(function (val) {
        if (val.choice == "Add new item") {
            addItem();
        }
        if (val.choice == "Add quanity") {
            addQuanity(res);
        }
    })
}

function addItem() {
    inquirer.prompt([{
        type: "input",
        name: "product_name",
        message: "What is the name of the product?"
    }, {
        type: "input",
        name: "department_name",
        message: "What department does this product fit into?"
    }, {
        type: "input",
        name: "price",
        message: "What is the price of the item"
    }, {
        type: "input",
        name: "stock_quanity",
        message: "How many items are available for to be stocked?"
    }]).then(function (val) {
        connection.query(
            `INSERT INTO products(product_name, department_name, price, stock_quanity) 
            VALUES ('${val.product_name}', '${val.department_name}', ${val.price}, ${val.stock_quanity})`, 
            function (err, res) {
            if (err) throw err;
            console.log(val.product_name + " ADDED TO BAMAZON!!!");
            makeTable();
        });
    });
};


function addQuanity(res) {
    inquirer.prompt([{
        type: "input",
        name: "product_name",
        message: "What product wouold you like to update?"
    }, {
        type: "input",
        name: "added",
        message: "How much stock will be added?"
    }]).then(function(val){
        for(i=0; i<res.length; i++){
            if(res[i].product_name == val.product_name){
                connection.query('UPDATE products SET stock_quanity=stock_quanity+'+val.added+
                'WHERE item_id='+res[i].item_id+';', function(err,res){
                    if(err) throw err;
                    if(res.affectedRows == 0){
                        console.log("That item does not exist, Try selecting a different item.");
                        makeTable();
                    }else {
                        console.log("Items have been added into your Inventory");
                        makeTable();
                    }
                });
            }
        }
    });
}
  
makeTable();
