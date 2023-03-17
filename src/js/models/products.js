// Lớp Person
class Person{
    constructor(id,name,address,email,type){
        this.id=id;
        this.name=name;
        this.address=address;
        this.email=email;
    }
}

// Lớp Student
class Student extends Person{
    constructor(id,name,address,email,math,physics,chemistry){
        super(id,name,address,email);
        this.math=math;
        this.physics=physics;
        this.chemistry=chemistry;
    }
    getScore(){
        return (this.math+this.physics+this.chemistry)/3;
    }
}

// Lớp Employee
class Employee extends Person{
    constructor(id,name,address,email,day,money){
        super(id,name,address,email);
        this.day=day;
        this.money=money;
    }
    calculate(){
        return this.day*this.money;
    }
}

// Lớp Customer
class Customer extends Person{
    constructor(id,name,address,email,company,order,rating){
        super(id,name,address,email);
        this.company=company;
        this.order=order;
        this.rating=rating;
    }
}

// Lớp ListPerson
class ListPerson{
    constructor(){
        this.personList=[];
    }
}