import React from 'react';
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
    
  toast.configure()
 
  const [Software] = useState({
    name: "ISecure",
    price: 12000,
    description: "A Smart move by Sperious towards secaurity of person data.",
  });
 
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:3000/product",
      { token, Software }
    );
 
    console.log(response.status)
 
    if (response.status === 200) {
      toast("Success! Check email for details", { type: "success" });
    } 
    else if (response.status === 402) {
      toast("Card Declined!", { type: "Error" });
    }  
    else if (response.status === 403) {
      toast("Card Declined!", { type: "Error" });
    }
    else {
      toast("Something went wrong", { type: "error" });
    }
  }
 
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center">Welcome to Sperious</h1>
        <img src='https://media-exp1.licdn.com/dms/image/C4E1BAQHopjpGl6aa0w/company-background_10000/0/1626094506245?e=2147483647&v=beta&t=nGgFm6nlE_wwOOs_RTGmHiLo4YJetRhbzYrtNhyZU5E' alt='Shiv Infotech' />
        <h1 className="text-center">Sperious is here with new Software</h1>
        <h2 className="text-center">Software Info</h2>
        <h3 className="text-center">Software Name: {Software.name}</h3>
        <h3 className="text-center">Software Price: {Software.price}</h3>
        <h3 className="text-center">Software Description: {Software.description}</h3>
        <div className="form-group container">
          <StripeCheckout
            className="center"
            stripeKey="pk_test_51KmGGPSCp3gfDllGOxCTvndCTyvvVWNMr8PfyB53qEOqZFxv4QmwfNEFt2BI5OAhlF6xYcF9VrA7mykeGeg0pseR00zRw5jOZG"
            token={handleToken}
            amount={Software.price}
            name="ISecaure"
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    </div>
  );
}