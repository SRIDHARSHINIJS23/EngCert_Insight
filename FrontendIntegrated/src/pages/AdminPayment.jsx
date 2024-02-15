import React, { useState } from 'react';
import '../assets/css/AdminPayment.css'; // Import the CSS file
import AdminSidebar from './AdminSidebar';

const AdminPayment = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      userName: 'John Doe',
      email: 'john@example.com',
      amount: '$50',
      date: '2024-02-01',
      status: 'Success',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      email: 'jane@example.com',
      amount: '$75',
      date: '2024-02-03',
      status: 'Pending',
    },
    {
      id: 3,
      userName: 'Bob Johnson',
      email: 'bob@example.com',
      amount: '$30',
      date: '2024-02-05',
      status: 'Failed',
    },
    {
      id: 4,
      userName: 'Alice Williams',
      email: 'alice@example.com',
      amount: '$100',
      date: '2024-02-08',
      status: 'Success',
    },
    {
      id: 5,
      userName: 'Charlie Brown',
      email: 'charlie@example.com',
      amount: '$60',
      date: '2024-02-10',
      status: 'Failed',
    },
    {
      id: 6,
      userName: 'Eva Davis',
      email: 'eva@example.com',
      amount: '$45',
      date: '2024-02-12',
      status: 'Pending',
    },
  ]);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const [filter, setFilter] = useState('');

  const filteredPayments = payments.filter(
    (payment) =>
      payment.userName.toLowerCase().includes(filter.toLowerCase()) ||
      payment.email.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  // Details View
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleViewDetails = (paymentId) => {
    const paymentDetails = payments.find((payment) => payment.id === paymentId);
    setSelectedPayment(paymentDetails);
  };

  return (
    <div className="admin-payment-container">
      <AdminSidebar/>
      <h1>Payment View</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by User Name or Email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="payment-table-container">
        <table>
          <thead>
            <tr>
              <th className="paymentview-head" onClick={() => handleSort('id')}>Transaction ID</th>
              <th className="paymentview-head" onClick={() => handleSort('userName')}>User Name</th>
              <th className="paymentview-head" onClick={() => handleSort('email')}>Email</th>
              <th className="paymentview-head" onClick={() => handleSort('amount')}>Amount</th>
              <th className="paymentview-head" onClick={() => handleSort('date')}>Payment Date</th>
              <th className="paymentview-head" onClick={() => handleSort('status')}>Status</th>
              <th className="paymentview-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => (
              <tr key={payment.id}>
                <td className='paymentview-td'>{payment.id}</td>
                <td className='paymentview-td'>{payment.userName}</td>
                <td className='paymentview-td'>{payment.email}</td>
                <td className='paymentview-td'>{payment.amount}</td>
                <td className='paymentview-td'>{payment.date}</td>
                <td className={`status-${payment.status.toLowerCase()}`}>{payment.status}</td>
                <td>
                  <button style={{"backgroundColor":"#3498db"}} className="paymentview-button" onClick={() => handleViewDetails(payment.id)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredPayments.length / itemsPerPage) }, (_, i) => i + 1).map(
          (page) => (
            <button
            style={{"backgroundColor":"#3498db"}}
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          )
        )}
      </div>

      {selectedPayment && (
        <div className="details-modal">
          <h2>Payment Details</h2>
          <p>Transaction ID: {selectedPayment.id}</p>
          <p>User Name: {selectedPayment.userName}</p>
          <p>Email: {selectedPayment.email}</p>
          <p>Amount: {selectedPayment.amount}</p>
          <p>Payment Date: {selectedPayment.date}</p>
          <p>Status: {selectedPayment.status}</p>
          <button style={{"backgroundColor":"#3498db"}} onClick={() => setSelectedPayment(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminPayment;
