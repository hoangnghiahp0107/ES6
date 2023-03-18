// Lớp Person
class Person{
    constructor(id,name,address,email,type){
        this.id=id;
        this.name=name;
        this.address=address;
        this.email=email;
        this.type=type;
    }
}

// Lớp Student
class Student extends Person{
    constructor(id,name,address,email,type,math,physics,chemistry){
        super(id,name,address,email,type);
        this.math=math;
        this.physics=physics;
        this.chemistry=chemistry;
    }
}
function calculateAverage() {
    // Get the values of the three input fields
    var mathScore = document.getElementById("math").value;
    var physicsScore = document.getElementById("physics").value;
    var chemistryScore = document.getElementById("chemistry").value;

    // Check if the input values are valid (i.e. numeric)
    if (isNaN(mathScore) || isNaN(physicsScore) || isNaN(chemistryScore)) {
      alert("Vui lòng nhập đúng điểm số.");
      return;
    }

    // Calculate the average score
    var averageScore = (parseFloat(mathScore) + parseFloat(physicsScore) + parseFloat(chemistryScore)) / 3;

    // Display the result
    document.getElementById("result").innerHTML = "Điểm trung bình của bạn là: " + averageScore.toFixed(2);
  }
// Lớp Employee
class Employee extends Person{
    constructor(id,name,address,email,type,day,money){
        super(id,name,address,email,type);
        this.day=day;
        this.money=money;
    }
}
function calculateSalary() {
    // Lấy giá trị của trường "Số ngày làm việc"
    var day = document.getElementById("day").value;
    // Lấy giá trị của trường "Lương"
    var money = document.getElementById("money").value;
    // Tính tổng lương
    var salary = day * money;
    // Hiển thị tổng lương tính được
    document.getElementById("result-wrapper").style.display = "block";
    document.getElementById("result1").innerHTML = "Tổng lương: " + salary+ " đồng";
  }
// Lớp Customer
class Customer extends Person{
    constructor(id,name,address,email,type,company,values,rating){
        super(id,name,address,email,type);
        this.company=company;
        this.values=values;
        this.rating=rating;
    }
}

// Lớp ListPerson
class ListPerson{
    constructor(){
        this.personList=[];
    }
}