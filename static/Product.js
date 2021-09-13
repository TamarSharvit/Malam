
function loadProduct() {
    fetch("/api/product")
        .then(response => {
            if (response.status == 200)
                return response.json();
        })
        .then((data) => {
            if (data == null) alert("לא קיימים מוצרים במאגר")
            else {
                var x = data;
                x.forEach(i => drawProduct(i));
            }
        })


    fetch("/api/category")
        .then(response => {
            if (response.status == 200)
                return response.json();
        })
        .then((data) => {
            if (data == null) alert("לא קיימות קטגרויות במאגר")
            else {
                var categories = data;
                categories.forEach(c => drawCategory(c));

            }
        });
}

function drawProduct(product) {

    temp = document.getElementById("temp-card");
    var clonProduct = temp.content.cloneNode(true);
    clonProduct.querySelector(".price").innerHTML = product.ProductPrice;
    clonProduct.querySelector(".description").innerHTML = product.Description;
    clonProduct.getElementById("prodimg").src = "images/" + product.ProductImage;
    clonProduct.querySelector(".h1").innerHTML = product.ProductName;
    clonProduct.querySelector("button").addEventListener("click", () => {
        addToCart(product)
    });
    document.getElementById("ProductList").appendChild(clonProduct);

}

function drawCategory(category) {
    temp = document.getElementById("temp-category");
    var clonCategory = temp.content.cloneNode(true);
    clonCategory.querySelector(".OptionName").innerHTML = category.CategoryName;
    clonCategory.querySelector('.opt').value = category._id;
    document.getElementById("count2").innerHTML = 9;
    x = document.getElementById('checkbox123');
    clonCategory.querySelector('.opt').addEventListener('change', () => {
        drawByCategoues(category)
    })

    document.getElementById("filters").appendChild(clonCategory);
}

let productListt = [];

function addToCart(product) {


    productListt.push(product);
    sessionStorage.setItem('productList', JSON.stringify(productListt));
    document.getElementById("ItemsCountText").innerHTML = productListt.length;
}


function drawByCategoues(category) {
    productList2 = document.getElementById("ProductList");
        productList2.innerHTML = [];
    let id = category._id
    fetch("/api/product/" + id)
        .then(response => {
            if (response.status == 200)
                return response.json();
        })
        .then((data) => {
            if (data == null) alert("לא קיימים מוצרים במאגר")
            else {
                var y = data;
                y.forEach(g => drawProduct(g));
                document.getElementById("count2").innerHTML = productList2.childElementCount;
            }

        })
}

function loadShoppingBag() {


    var bag = JSON.parse(sessionStorage.getItem('productList'));
    document.getElementById("itemCount").innerHTML = bag.length;
    document.getElementById("totalAmount").innerHTML = sum(bag);
    bag.forEach(x => drowTr(x));
}
let s = 0;
function sum(bag) {
    for (let i = 0; i < bag.length; i++) {
        s += bag[i].ProductPrice;

    }
    return s;
}

function drowTr(product) {
    temp = document.getElementById("temp-row");
    var clonProduct = temp.content.cloneNode(true);
    clonProduct.getElementById("pic").src = "images/" + product.ProductImage;
    clonProduct.querySelector(".price").innerHTML = product.ProductPrice;
    clonProduct.querySelector(".itemName").innerHTML = product.ProductName;
    // clonProduct.querySelector(".descriptionColumn").innerHTML = product.Description;

    
    clonProduct.getElementById("remove").addEventListener("click", () => {
        deleteProduct(product)
    });
    document.getElementById("tb").appendChild(clonProduct);
}

function deleteProduct(product) {
    document.getElementById("tb").innerHTML = "";
    var bag = JSON.parse(sessionStorage.getItem('productList'));
    var newbag = bag.filter(x => x._id != product._id);
    sessionStorage.setItem('productList', JSON.stringify(newbag));
    document.getElementById("itemCount").innerHTML = 0;
    document.getElementById("totalAmount").innerHTML = 0;
    s = 0;
    loadShoppingBag();
}


var items = JSON.parse(sessionStorage.getItem('productList'));
// function createOrderItem(p) {
//     let orderItem = {
//         productId: p._id,
//         Quantity: 1
//     }
//     return orderItem;
// }

function placeOrder() {
    productsArray= JSON.parse(sessionStorage.getItem('productList'));
    var sum = 0;
    items.forEach(i => { sum = sum + i.ProductPrice });
    document.getElementById("totalAmount").innerHTML = sum;
    var orderItem = [];
    // items.forEach(i => { orderItem.push(createOrderItem(i)) });


    let Order = {
	   Products : productsArray,
       UserId: JSON.parse(sessionStorage.getItem('oldUser'))._id,
        OrderSum: sum,
        OrderDate: new Date()      
    };

    fetch("/api/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(Order),
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        else
            response.json().then(error => {
                alert(JSON.stringify(error.errors))
            })

    }).then(data => alert("order number"+data._id+"was placed successfully!"))
    //document.getElementById('tbody').innerHTML = '';
};

