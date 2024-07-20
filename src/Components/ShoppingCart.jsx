import React, { Component } from "react";
import Product from "./Product";

export default class ShoppingCart extends Component {
  //Execute when component is mounted
  constructor(props) {
    // console.log("constructor-shopping cart");
    super(props); //calling the super class constructor

    //initialization of the state

    this.state = {
      products: [],
    };
  }

  render() {
    // console.log("reder-shopping cart");
    return (
      <div>
        <h4>Shopping Cart</h4>
        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="btn btn-primary">Buy Now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }
  // render end there

  //Execute after constructor and render method(include the life cycle of the child componenet, if any) of current component
  componentDidMount = async () => {
    let response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });
    let prods = await response.json();
    console.log(prods);
    this.setState({ products: prods });

    //fetch data from data source
    // console.log("component did mount execute");
    // let promise = fetch("http://localhost:5000/products", { method: "GET" });
    // promise.then((response) => {
    //   console.log(response);

    //   let promise2 = response.json();
    //   promise2.then((prod) => {
    //     console.log(prod);

    //     this.setState({ products: prod });
    //   });
    // });
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   "component did update",
    //   prevProps,
    //   prevState,
    //   this.props,
    //   this.state
    // );
    // if(prevProps.x != this.props.x){
    // }
  }

  componentWillUnmount() {
    // console.log("component will unmount -shopping cart");
  }
  componentDidCatch(error, info) {
    // console.log("component did catch -shopping cart");
    // console.log(error, info);
    // localStorage.lastError = `${error}\n${JSON.stringify(info)}`;
  }

  //execute when user click on + button
  handleIncrement = (product, maxValue) => {
    // console.log("handleIncrement", product);
    //get index of selected product
    let allProducts = [...this.state.products]; //clone of the above products array
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;
    }
    //update the state of current component(parent component)
    this.setState({ products: allProducts });
  };

  //execute when user click on - button
  handleDecrement = (product, minValue) => {
    // console.log("handle decrement", product);
    //get index of selected product
    let allProducts = [...this.state.products]; //clone of the above products array
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;
    }
    //update the state of current component(parent component)
    this.setState({ products: allProducts });
  };

  handleDelete = (product) => {
    let allProducts = [...this.state.products]; //clone of the above products array
    let index = allProducts.indexOf(product);

    if (window.confirm("Are you sure you want to delete?")) {
      //delete product based on index
      allProducts.splice(index, 1);
      console.log(allProducts);
    }
    //update the state of current component(parent component)

    this.setState({ products: allProducts });
  };
}
