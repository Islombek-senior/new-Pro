const category_cont = document.getElementById("category_cont");
const product_container = document.getElementById("product_container");
const serach_input = document.getElementById(
  "serach_input"
) as HTMLInputElement;

const adminpage = new bootstrap.Modal("#adminpage", {
  keyboard: false,
});
const modal_body = document.getElementById("modal_body");
const home_page = document.getElementById("home_page");
const admin_page = document.getElementById("admin_page");

type Ctegor = {
  id: number;
  image: string;
  name: string;
};

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
};

const category_container = () => {
  axios
    .get("https://a4f1e264ed9f41b9.mokky.dev/category")
    .then((res: { data: Ctegor[] }) => {
      const result = res.data;
      console.log(result);
      result.map((item: { image: string; name: string }) => {
        if (!category_cont) {
          return;
        }
        category_cont.innerHTML += `
         <div class="col-xl-4">
            <div style="width: 200px; height: 200px;">
            <img src="${item.image}" alt="" width="100%">
            </div>
            <h5>${item.name}</h5>
          </div>

        `;
      });
    })

    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
};

category_container();

// ___________________________________
const productRender = () => {
  axios
    .get("https://859844bec72a6a41.mokky.dev/product")
    .then((prd: { data: Product[] }) => {
      const product = prd.data;
      console.log(product);
      product.map((item: { name: string; image: string; price: number }) => {
        if (!product_container) {
          return;
        }
        product_container.innerHTML += `
          <div class="col-12 mb-4">
          <div class="d-flex align-items-center gap-3">
            <img
              style="border-radius: 8px"
              src="${item.image}"
              alt=""
              width="100"
              height="100"
            />

            <div>
              <h5>${item.name}</h5>
              <p>$${item.price}</p>
            </div>
          </div>
        </div>
      `;
      });
    });
};

productRender();

serach_input?.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.value.toLowerCase();
  axios
    .get(`https://859844bec72a6a41.mokky.dev/product/?name=Cola`)
    .then((sera) => {
      const search = sera.data;
      if (serach_input.value.length > 0) {
        if (!category_cont) {
          return;
        }
        category_cont.innerHTML = "";
        if (!product_container) {
          return;
        }
        product_container.innerHTML = "";
        search.map((item: { image: string; name: string; price: number }) => {
          category_cont.innerHTML += `
        <div class="col-12 mb-4">
              <div class="d-flex align-items-center gap-3">
                <img
                  style="border-radius: 8px"
                  src="${item.image}"
                  alt=""
                  width="100"
                  height="100"
                />
    
                <div>
                  <h5>${item.name}</h5>
                  <p>$${item.price}</p>
                </div>
              </div>
            </div>
        `;
        });
      } else {
        productRender();
        category_container();
      }
    });
});

admen_page?.addEventListener("click", () => {
  adminpage.show();
  if (!modal_body) {
    return;
  }

  modal_body.innerHTML = `
 <input type="text" name="" id="inp1">
<input type="text" name="" id="inp2">
  `;
  const button = document.createElement("button");
  button.innerHTML = "Kirish";
  modal_body.appendChild(button);

  button.addEventListener("click", () => {
    const inp1 = document.getElementById("inp1") as HTMLInputElement;
    const inp2 = document.getElementById("inp2") as HTMLInputElement;

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
