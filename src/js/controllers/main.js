getProducts();

// Hàm gửi yêu cầu lấy danh sách sản phẩm từ API
function getProducts(searchValue) {
  apiGetPerson(searchValue)
    .then((response) => {
      // Call API thành công
      const products = response.data.map((product) => {
        return new Student(
          product.id,
          product.name,
          product.address,
          product.email,
          product.math,
          product.physics,
          product.chemistry
        );
      });

      renderProducts(products);
    })
    .catch((error) => {
      // Call API thất bại
      alert("API get products error");
    });
}

// Hàm thêm sản phẩm: DOM và gửi yêu cầu thêm sản phẩm tới API
function createStudent() {
  const product = {
    name: getElement("#name").value,
    address:getElement("#address").value,
    email:getElement("#email").value,
    math:getElement("#math").value,
    physics:getElement("#physics").value,
    chemistry:getElement("#chemistry").value
  };

  apiGetPersonByID(productID)
    .then((response) => {
      // Sau khi gọi API thêm sản phẩm thành công, dữ liệu chỉ mới thay đổi ở phía server
      // Cần gọi lại API lấy danh sách sản phẩm (lúc này sẽ bao gồm sản phẩm vừa được thêm thành công) và hiển thị ra giao diện
      getProducts();
    })
    .catch((error) => {
      alert("Thêm sản phẩm thất bại");
    });
}

// Hàm xoá sản phẩm
function deletePerson(productId) {
  apiDeletePerson(productId)
    .then(() => {
      getPerson();
    })
    .catch((error) => {
      alert("Xoá sản phẩm thất bại");
    });
}

// Hàm lấy chi tiết 1 sản phẩm và hiển thị lên modal
// function selectProduct(productId) {
//   apiGetProductById(productId)
//     .then((response) => {
//       const product = response.data;
//       getElement("#TenSP").value = product.name;
//       getElement("#HinhSP").value = product.img;
//       getElement("#GiaSP").value = product.price;
//       getElement("#loaiSP").value = product.description;

//       // Mở và cập nhật giao diện cho modal
//       getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
//       getElement(".modal-footer").innerHTML = `
//         <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
//         <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Cập nhật</button>
//       `;
//       $("#myModal").modal("show");
//     })
//     .catch((error) => {
//       alert("Lấy chi tiết sản phẩm thất bại");
//     });
// }

// Hàm cập nhật sản phẩm
// function updateProduct(productId) {
//   const product = {
//     name: getElement("#TenSP").value,
//     price: getElement("#GiaSP").value,
//     img: getElement("#HinhSP").value,
//     description: getElement("#loaiSP").value,
//   };

//   apiUpdateProduct(productId, product)
//     .then((response) => {
//       getProducts();
//     })
//     .catch((error) => {
//       alert("Cập nhật sản phẩm thất bai");
//     });
// }

// Hàm hiển thị danh sách sản phẩm ra table
function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.address}</td>
        <td>${product.email}</td>
        <td>${product.calculate()}</td>
        <td>
          <button
            class="btn btn-primary"
            onclick="selectProduct('${product.id}')"
          >
            Xem
          </button>
          <button
            class="btn btn-danger"
            onclick="deleteProduct('${product.id}')"
          >
            Xoá
          </button>
        </td>
      </tr>
    `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}


// getElement("#txtSearch").addEventListener("keydown", (event) => {
//   // event là một object chứa thông tin về sự kiện được phát sinh
//   // event.target: trả ra cái element phát sinh ra sự kiện
//   if (event.key !== "Enter") return;

//   const searchValue = event.target.value;
//   getProducts(searchValue);
// });

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}



















function validate(){
    // kiểm tra name
      let name = getElement("#name").value;
      if (!name.trim())
      {
          isValid=false;
          getElement("#tbName").innerHTML="Tên người dùng không được để trống";
      }
      else if (!/^[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/.test(name)){
          isValid=false;
          getElement("#tbName").innerHTML="Tên người dùng không hợp lệ";
      }
      else {
          getElement("#tbName").innerHTML="";
      }
      
    // Kiểm tra địa chỉ
      let address = getElement("#address").value;
      if (!address.trim())
      {
        isValid=false;
        getElement("#tbAddress").innerHTML="Địa chỉ không được để trống";
      }
      else {
        getElement("#tbAddress").innerHTML="";
      }
    // Kiểm tra email
    let email = getElement("#email").value;
    if (!email.trim()){
        isValid = false;
        getElement("#tbEmail").innerHTML="Email không được để trống";
    }
    else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
    {
        isValid = false;
    getElement("#tbEmail").innerHTML = "Email không hợp lệ";
    }
    else {
        getElement("#tbEmail").innerHTML="";
    }
}

function getElement(selector){
    return document.querySelector(selector);
}