import React, { useState } from 'react';

function App() {
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('This will be processed: ' + link);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>VidCopy - YouTube Copyright Remover</h1>
      <p>ইউটিউব ভিডিও লিংক দিন এবং কপিরাইট মুক্ত করে ডাউনলোড করুন</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="YouTube Video Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ width: '300px', padding: '10px' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>Process</button>
      </form>
    </div>
  );
}

export default App;
