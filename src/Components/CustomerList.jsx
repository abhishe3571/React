import { Component } from "react";
import React from "react";

export default class CustomerList extends Component {
  state = {
    pageTitle: "Customers",
    customerCount: 10,
    customers: [
      {
        id: 1,
        name: "Abhishek",
        phoneNumber: "896740",
        address: { city: "Varanasi" },
        photo: "https://picsum.photos/id/1010/60",
      },
      {
        id: 2,
        name: "Vathsala",
        phoneNumber: "567849",
        address: { city: "Bangalore" },
        photo: "https://picsum.photos/id/1011/60",
      },
      {
        id: 3,
        name: "Yatharth",
        phoneNumber: "",
        address: { city: "Bangalore" },
        photo: "https://picsum.photos/id/1012/60",
      },
      {
        id: 4,
        name: "Pranavi",
        phoneNumber: "",
        address: { city: "Hyderbad" },
        photo: "https://picsum.photos/id/1013/60",
      },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="m-1 p-1">
          {this.state.pageTitle}
          <span className="m-2 badge-secondary badge-light">
            {this.state.customerCount}
          </span>

          <button className="btn btn-info" onClick={this.onRefreshClick}>
            Refresh
          </button>
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Phone</th>
              <th>City</th>
            </tr>
          </thead>

          <tbody>{this.getCustomerRow()}</tbody>
        </table>
      </React.Fragment>
    );
  }
  onRefreshClick = () => {
    this.setState({
      customerCount: 15,
    });
  };
  getPhoneToRender = (phoneNumber) => {
    if (phoneNumber) return phoneNumber;
    else {
      return <div className="bg-warning p-2 text-center">No Phone</div>;
    }
  };
  getCustomerRow = () => {
    return this.state.customers.map((cust, index) => {
      return (
        <tr key={cust.id}>
          <td>{cust.id}</td>
          <td>
            <img src={cust.photo} alt="Customer" />
            <div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  this.onChangePictureClick(cust, index);
                }}
              >
                Change Picture
              </button>
            </div>
          </td>
          <td>{cust.name}</td>
          <td>{this.getPhoneToRender(cust.phoneNumber)}</td>
          <td>{cust.address.city}</td>
        </tr>
      );
    });
  };

  //execute when user click on change picture in the grid
  // recieve the "customers" object and index of the currently clicked cutomers
  onChangePictureClick = (cust, index) => {
    //get existing customers
    let custArr = this.state.customers;
    custArr[index].photo = "https://picsum.photos/id/101/60";

    //update "customers" array in state
    this.setState({ customers: custArr });
  };
}
