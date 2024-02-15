// Payment.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';

import '../assets/css/Payment.css'; // Assuming this is your CSS file

function Payment({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [card, setCard] = useState("");
  const [exdate, setExdate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [showDownloadButton, setShowDownloadButton] = useState(false);


  const validateForm = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (bank.trim() === '') {
      errors.bank = 'Bank name is required';
    }

    if (card === '') {
      errors.card = 'Card number is required';
    } else if (card.length !== 12) {
      errors.card = 'Card number is invalid';
    }

    if (cvv === '') {
      errors.cvv = 'CVV is required';
    } else if (cvv.length !== 3) {
      errors.cvv = 'CVV is invalid';
    }

    if (exdate.trim() === '') {
      errors.exdate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exdate)) {
      errors.exdate = 'Expiry date is invalid';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePay = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSuccess(); // Trigger the success callback
      setShowDownloadButton(true);
    }
  };
  const handleDownload = () => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');
    doc.rect(20, 20, 592, 400);
    doc.save('syllabus.pdf'); 
    onClose(); 
    window.alert('Syllabus downloaded successfully!');
  };
  
  
  

  return (
    <>
      <div className="wrapper1" style={{ marginTop: "0px" }}>
        <div className="payment">
          <h2>Payment Gateway</h2>
          <div className="form">
            <div className="card space icon-relative">
              <label className="label">Card holder:</label>
              <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="card space icon-relative">
              <label className="label">Bank Name</label>
              <input type="text" value={bank} onChange={(e) => setBank(e.target.value)} className="input" />
              {errors.bank && <span className="error-message">{errors.bank}</span>}
            </div>
            <div className="card space icon-relative">
              <label className="label">Card number:</label>
              <input type="text" value={card} onChange={(e) => setCard(e.target.value)} className="input" data-mask="0000 0000 0000 0000" placeholder="Card Number" />
              {errors.card && <span className="error-message">{errors.card}</span>}
            </div>
            <div className="card-grp space">
              <div className="card-item icon-relative">
                <label className="label">Expiry date:</label>
                <input type="text" value={exdate} onChange={(e) => setExdate(e.target.value)} name="expiry-data" className="input" data-mask="00 / 00" placeholder="00 / 00" />
                {errors.exdate && <span className="error-message">{errors.exdate}</span>}
              </div>
              <div className="card-item icon-relative">
                <label className="label">CVC:</label>
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} className="input" data-mask="000" placeholder="000" />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>

            <div className="btn" onClick={handlePay}>
              Pay
            </div>
            {showDownloadButton && (
  <div className="btn" onClick={handleDownload}>
    Download syllabus
  </div>
)}

          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
