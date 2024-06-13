"use strict";
var category_cont = document.getElementById("category_cont");
var product_container = document.getElementById("product_container");
var serach_input = document.getElementById("serach_input");
var admen_page = document.getElementById("admen_page");
var adminpage = new bootstrap.Modal("#adminpage", {
    keyboard: false,
});
var modal_body = document.getElementById("modal_body");
var home_page = document.getElementById("home_page");
var admin_page = document.getElementById("admin_page");
var category_container = function () {
    axios
        .get("https://a4f1e264ed9f41b9.mokky.dev/category")
        .then(function (res) {
        var result = res.data;
        console.log(result);
        result.map(function (item) {
            if (!category_cont) {
                return;
            }
            category_cont.innerHTML += "\n         <div class=\"col-xl-4\">\n            <div style=\"width: 200px; height: 200px;\">\n            <img src=\"".concat(item.image, "\" alt=\"\" width=\"100%\">\n            </div>\n            <h5>").concat(item.name, "</h5>\n          </div>\n\n        ");
        });
    })
        .catch(function (error) {
        console.error("Xatolik yuz berdi:", error);
    });
};
category_container();
// ___________________________________
var productRender = function () {
    axios
        .get("https://859844bec72a6a41.mokky.dev/product")
        .then(function (prd) {
        var product = prd.data;
        console.log(product);
        product.map(function (item) {
            if (!product_container) {
                return;
            }
            product_container.innerHTML += "\n          <div class=\"col-12 mb-4\">\n          <div class=\"d-flex align-items-center gap-3\">\n            <img\n              style=\"border-radius: 8px\"\n              src=\"".concat(item.image, "\"\n              alt=\"\"\n              width=\"100\"\n              height=\"100\"\n            />\n\n            <div>\n              <h5>").concat(item.name, "</h5>\n              <p>$").concat(item.price, "</p>\n            </div>\n          </div>\n        </div>\n      ");
        });
    });
};
productRender();
serach_input === null || serach_input === void 0 ? void 0 : serach_input.addEventListener("input", function (e) {
    var target = e.target;
    var value = target.value.toLowerCase();
    axios
        .get("https://859844bec72a6a41.mokky.dev/product/?name=Cola")
        .then(function (sera) {
        var search = sera.data;
        if (serach_input.value.length > 0) {
            if (!category_cont) {
                return;
            }
            category_cont.innerHTML = "";
            if (!product_container) {
                return;
            }
            product_container.innerHTML = "";
            search.map(function (item) {
                category_cont.innerHTML += "\n        <div class=\"col-12 mb-4\">\n              <div class=\"d-flex align-items-center gap-3\">\n                <img\n                  style=\"border-radius: 8px\"\n                  src=\"".concat(item.image, "\"\n                  alt=\"\"\n                  width=\"100\"\n                  height=\"100\"\n                />\n    \n                <div>\n                  <h5>").concat(item.name, "</h5>\n                  <p>$").concat(item.price, "</p>\n                </div>\n              </div>\n            </div>\n        ");
            });
        }
        else {
            productRender();
            category_container();
        }
    });
});
admen_page === null || admen_page === void 0 ? void 0 : admen_page.addEventListener("click", function () {
    adminpage.show();
    if (!modal_body) {
        return;
    }
    modal_body.innerHTML = "\n <input type=\"text\" name=\"\" id=\"inp1\">\n<input type=\"text\" name=\"\" id=\"inp2\">\n  ";
    var button = document.createElement("button");
    button.innerHTML = "Kirish";
    modal_body.appendChild(button);
    button.addEventListener("click", function () {
        var inp1 = document.getElementById("inp1");
        var inp2 = document.getElementById("inp2");
        if (inp1.value === "123" || inp2.value === "123") {
            if (!home_page) {
                return;
            }
            home_page.style.display = "none";
            if (!admin_page) {
                return;
            }
            admin_page.classList.remove("d-none");
            admin_page.style.display = "block";
            adminpage.hide();
        }
    });
});
