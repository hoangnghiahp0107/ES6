const typeSelect = document.querySelector('#type');
const studentFields = document.querySelector('#student-fields');
const employeeFields = document.querySelector('#employee-fields');
const customerFields = document.querySelector('#customer-fields');
typeSelect.addEventListener('change', function() {
if (typeSelect.value === 'Student') {
  studentFields.classList.remove('hidden');
  employeeFields.classList.add('hidden');
  customerFields.classList.add('hidden');
} 
else if (typeSelect.value === 'Employee') 
{
  studentFields.classList.add('hidden');
  employeeFields.classList.remove('hidden');
  customerFields.classList.add('hidden');
} 
else if (typeSelect.value === 'Customer') 
{
  studentFields.classList.add('hidden');
  employeeFields.classList.add('hidden');
  customerFields.classList.remove('hidden');
} 
else 
{
  studentFields.classList.add('hidden');
  employeeFields.classList.add('hidden');
  customerFields.classList.add('hidden');
}
});


// Hàm gửi yêu cầu lấy danh sách từ API
async function getProducts() {
  try {
    const response = await apiGetPerson(); 
    const products = response.data.map((product) => {
      return new Person(
        product.id,
        product.name,
        product.address,
        product.email,
        product.type,
      );
    });
    renderPerson(products);
  } catch (error) {
    alert("API get products error");
  }
}
async function createPerson() {
  const product = {
    name: getElement("#name").value,
    address: getElement("#address").value,
    email: getElement("#email").value,
    type: getElement("#type").value,
    math : +getElement("#math").value,
    physics : +getElement("#physics").value,
    chemistry : +getElement("#chemistry").value,
    day : +getElement("#day").value,
    money : +getElement("#money").value,
    company:getElement("#company").value,
    values:+getElement("#values").value,
    rating:+getElement("#rating").value
  };
  try {
    await apiCreatePerson(product);
    getProducts();
  } catch (error) {
    alert("Thêm sản phẩm thất bại");
  }
}
//Hàm xóa sản phẩm
function deletePerson(productID) {
  apiDeletePerson(productID)
    .then((respone) => {
      getProducts();
      resetTB();
      alert("Delete phone successfully  ");
    })
    .catch((error) => {
      alert("Xóa sản phẩm thất bại");
    });
}


//Hàm lấy chi tiết của 1 sản phẩm và hiển thị ra modal
function selectPerson(productID) {
  apiGetPersonById(productID)
    .then((respone) => {
      const product = respone.data; 
      getElement("#name").value = product.name;
      getElement("#address").value = product.address;
      getElement("#email").value = product.email;
      getElement("#type").value = product.type;
      getElement("#math").value=product.math;
      getElement("#physics").value=product.physics;
      getElement("#chemistry").value=product.chemistry;
      getElement("#day").value=product.day;
      getElement("#money").value=product.money;
      getElement("#company").value=product.company;
      getElement("#values").value=product.values;
      getElement("#rating").value=product.rating;
      $("#myModal").modal("show");
    })
    .catch((error) => {
      alert("Lấy chi tiết sản phẩm thất bại");
    });
}
async function UpdateProduct(personID) {
  const person = {
    name: getElement("#name").value,
    address: getElement("#address").value,
    email: getElement("#email").value,
    type: getElement("#type").value,
    math: +getElement("#math").value,
    physics: +getElement("#physics").value,
    chemistry: +getElement("#chemistry").value,
    day: +getElement("#day").value,
    money: +getElement("#money").value,
    company: getElement("#company").value,
    values: +getElement("#values").value,
    rating: +getElement("#rating").value,
  };
  try {
    await apiUpdatePerson(personID, person);
    const updatedData = await getProducts();
    renderPerson(updatedData);
  } catch (error) {
    alert("Cập nhật sản phẩm thất bại");
  }
}


function sortName(a, b) {
  let nameA = a.name.toLowerCase(),
    nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0; //default return value (no sorting)
}

getElement("#Search").addEventListener("change", (event) => {
  const selectedType = event.target.value;
  const productList = Array.from(getProducts());
  const filteredProducts = productList.filter((product) => product.type === selectedType);
  renderPerson(filteredProducts);
});







function renderPerson(products) {
  products.sort(sortName);
  const html = products.reduce((result, product, index) => {
    return (
      result +
      `
        <tr>
          <td>${index+1}</td>
          <td>${product.name}</td>
          <td>${product.address}</td>
          <td>${product.email}</td>
          <td>${product.type}</td>  
          <td>
            <button class="btn btn-primary" onclick="selectPerson('${product.id}')">Xem</button>
            <button class="btn btn-danger" onclick="deletePerson('${product.id}')">Xoá</button>
          </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}


// Hàm reset
function resetTB(){
      getElement("#tbName").value = "";
      getElement("#tbAddress").value = "";
      getElement("#tbEmail").value = "";
      getElement("#tbType").value = "";
      getElement("#tbMath").value="";
      getElement("#tPhysics").value="";
      getElement("#tbChemistry").value="";
      getElement("#tbDay").value="";
      getElement("#tbLuong").value="";
      getElement("#tbCompany").value="";
      getElement("#tbValues").value="";
      getElement("#tbRating").value="";
}

// function validate(){
//   let isValid=true;
//   // kiểm tra name
//   let name = getElement("#name").value;
//   if (!name.trim())
//   {
//       isValid=false;
//       getElement("#tbName").innerHTML="Tên nhân viên không được để trống";
//   }
//   else if (!/^[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/.test(name)){
//       isValid=false;
//       getElement("#tbName").innerHTML="Tên nhân viên không hợp lệ";
//   }
//   else {
//       getElement("#tbName").innerHTML="";
//   }

//   //Kiểm tra địa chỉ
//   let address=getElement("#address").value;
//   if (!address.trim()){
//       isValid = false;
//       getElement("#tbAddress").innerHTML="Địa chỉ không được để trống";
//   }
//   else {
//       getElement("#tbAddress").innerHTML="";
//   } 

//   // kiểm tra email
//   let email = getElement("#email").value;
//   if (!email.trim()){
//       isValid = false;
//       getElement("#tbEmail").innerHTML="Email không được để trống";
//   }
//   else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
//   {
//       isValid = false;
//   getElement("#tbEmail").innerHTML = "Email không hợp lệ";
//   }
//   else {
//       getElement("#tbEmail").innerHTML="";
//   }

//   // Hàm kiểm tra người dùng
//   let type=getElement("#type").value;
//   if (type===""){
//       isValid = false;
//       getElement("#tbType").innerHTML="Người dùng không được để trống";
//   }
//   else {
//       getElement("#tbType").innerHTML="";
//   } 
  
//   // Kiểm tra môn toán
//   let math=getElement("#math").value;
//   if (!math.trim()){
//       isValid = false;
//       getElement("#tbMath").innerHTML="Điểm Toán không được để trống";
//   }
//   else if (math<11)
//   {
//     isValid = false;
//       getElement("#tbMath").innerHTML="Điểm Toán không hợp lệ";
//   }
//   else {
//       getElement("#tbMath").innerHTML="";
//   }

  
//   // Kiểm tra môn lý
//   let physics=getElement("#physics").value;
//   if (!physics.trim()){
//       isValid = false;
//       getElement("#tbPhysics").innerHTML="Điểm Lý không được để trống";
//   }
//   else if (physics<11)
//   {
//     isValid = false;
//       getElement("#tbPhysics").innerHTML="Điểm Lý không hợp lệ";
//   }
//   else {
//       getElement("#tbPhysics").innerHTML="";
//   }

  
//   // Kiểm tra môn hóa
//   let chemistry=getElement("#chemistry").value;
//   if (!chemistry.trim()){
//       isValid = false;
//       getElement("#tbChemistry").innerHTML="Điểm Hóa không được để trống";
//   }
//   else if (chemistry<11)
//   {
//     isValid = false;
//       getElement("#tbChemistry").innerHTML="Điểm Hóa không hợp lệ";
//   }
//   else {
//       getElement("#tbChemistry").innerHTML="";
//   }
//   // Kiểm tra ngày làm việc
//   let day=getElement("#day").value;
//   if (!day.trim()){
//       isValid = false;
//       getElement("#tbDay").innerHTML="Ngày không được để trống";
//   }
//   else {
//       getElement("#tbDay").innerHTML="";
//   }
//   // Kiểm tra lương 
//   let money=getElement("#money").value;
//   if (!money.trim()){
//       isValid = false;
//       getElement("#tbLuong").innerHTML="Số ngày không được để trống";
//   }
//   else if (money<10000)
//   {
//     isValid = false;
//       getElement("#tbLuong").innerHTML="Số ngày không hợp lệ";
//   }
//   else {
//       getElement("#tbLuong").innerHTML="";
//   }
//   // Kiểm tra tên công ty
//   let company=getElement("#company").value;
//   if (!company.trim()){
//       isValid = false;
//       getElement("#tbCompany").innerHTML="Tên công ty không được để trống";
//   }
//   else {
//       getElement("#tbCompany").innerHTML="";
//   }
//   // Kiểm tra giá trị hóa đơn
//   let values=getElement("#values").value;
//   if (!values.trim()){
//       isValid = false;
//       getElement("#tbValues").innerHTML="Giá trị hóa đơn không được để trống";
//   }
//   else if (values<10000)
//   {
//     isValid = false;
//       getElement("#tbValues").innerHTML="Giá trị hóa đơn không hợp lệ";
//   }
//   else {
//       getElement("#tbValues").innerHTML="";
//   }
//   // Kiểm tra đánh giá
//   let rating=getElement("#rating").value;
//   if (!rating.trim()){
//       isValid = false;
//       getElement("#tbRating").innerHTML="Giá trị hóa đơn không được để trống";
//   }
//   else if (rating>6)
//   {
//     isValid = false;
//       getElement("#tbRating").innerHTML="Giá trị hóa đơn không hợp lệ";
//   }
//   else {
//       getElement("#tbRating").innerHTML="";
//   }
// }


function getElement(selector){
  return document.querySelector(selector);
}










