import React from 'react';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const HTMLReceipt = ({ payment }) => {
  const generateReceiptHTML = (payment) => {
    // ... your existing generateReceiptHTML function
    // Please include the HTML generation logic here
    return `
    <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            /* Define styles for the receipt */
            body {
              font-family: Arial, sans-serif;
              text-align: center;
            }
            .receipt {
              width: 80%;
              margin: 0 auto;
              border: 4px solid #333;
              padding: 20px;
              background-color: #f7f7f7;
              text-align: canter; /* Align text to the left */
            }
            .receipt h1 {
              margin-bottom: 20px;
            }
            .receipt p {
              margin: 5px 0;
            }
            .header {
                background: linear-gradient(to right, rgba(0, 128, 0, 0.3), rgba(255, 255, 0, 0.7), rgba(0, 0, 255, 0.3));
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              .logoContainer img {
                height: 60px;
                width: auto;
              }
              .banner {
                font-size: 22px;
                font-weight: bold;
                color: #32383D;
                margin-left: 10px;
                flex: 1;
                text-align: center;
                font-style: italic;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
              }
            /* Add more styles as needed */
          </style>
        </head>
        <body>            
        <div class="receipt">
            <div class="header">
            <div class="logoContainer">
                <img src="../images/Logo_laraid.jpeg" alt="Logo" />
            </div>
            <div class="banner">PROJECT_X</div>                
            </div>
            <h1>Payment Receipt</h1>
                <p><strong>Customer Name:</strong> ${payment.customer_name}</p>
                <p><span><strong>Project Name:</strong> ${payment.project_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Asset Location:</strong> ${payment.asset_location}</span></p>
                <p><strong>Payment Type:</strong> ${payment.payment_type}</p>
                <p><span><strong>Down Payment Amount:</strong> ${payment.down_payment_amount}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Phase:</strong> ${payment.phase}</span></p>
            <div class="footer">
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Receipt Footer</title>
                <style>
                    /* Define your CSS styles here */
                    body {
                    font-family: Arial, sans-serif;
                    padding: 0;
                    margin: 0;
                    }
                    .footer {
                    padding: 10px;
                    background-color: #f0f0f0;
                    text-align: center;
                    font-size: 10px;
                    }
                    .logoText {
                    font-weight: bold;
                    font-size: 10px;
                    color: #0eac77;
                    margin-top: 0;
                    }
                    /* Add other styles as needed to match your React Native component */
                </style>
                </head>
                <body>
                <div class="footer">
                    <div class="logoContainer">
                    <!-- Image can't be embedded in an HTML string, use text instead -->
                    <span class="logoText">LARAID SOFTWARE SOLUTIONS  <span class="superscript">Innovation Explored...</span> <span class="subscript">@U72900TG2022OPC167370</span></span>
                    </div>
                    <hr>
                    <p class="companyText">
                    *****copyright (Concept, Design, Architect and Solution) by <span class="incorporation">www.laraidsolutions.com ***** </span> <span class="name">@Raja Pinja</span><br>
                    <span class="startupIndia">-: Startup India CERTIFICATE NO:<span class="certificate"> DIPP114845 </span>:-</span><br>
                    <span class="address">
                        @Prithvihomes, Flat no 203, A-Block, Spring Field Colony, Jeedimetla(V), Quthbullapur (M), Hyderabad (Secunderabad) - 500 055. Telangana, INDIA. Phone +91 9347160365(M)
                    </span>
                    </p>
                </div>
                </body>
                </html>                
                </div>
            </div>
        </body>
    </html>`;
  };


  // Render the HTML using the payment prop
  return (
    // ... your HTML receipt rendering logic
    // Please use the generateReceiptHTML function here with the payment prop
    <div>
      {/* Example of rendering the receipt */}
      <div dangerouslySetInnerHTML={{ __html: generateReceiptHTML(payment) }} />

      {/* Button to trigger printing and sharing */}
      {/* <button onClick={() => handlePrintReceipt(payment)}>Print and Share Receipt</button> */}
    </div>
  );
};

export default HTMLReceipt;
