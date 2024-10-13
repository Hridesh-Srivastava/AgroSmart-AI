import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // now we send the form data to a server
    console.log('Form submitted:', formData);
    setFormStatus('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 4000);
  };

  return (
    <div className="content">
      <div className="form-section">
        <h2>
          <i className="fa-solid fa-phone" style={{ marginRight: '8px' }}></i>   
          Call us on : <span style={{ color: '#64ff55'  }}>1800-1210266</span>
        </h2>
        <h2><i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i>  Write us on : <span style={{ color: '#64ff55'  }}>src@hihtindia.org</span> </h2>
        <h2>Or</h2>
        <h2>Contact us by filling out the fields below.</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit it &rarr;</button>
        </form>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </div>
    </div>
  );
};

export default Contact;