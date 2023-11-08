import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>&copy; {new Date().getFullYear()} Your Online Bookverse</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
