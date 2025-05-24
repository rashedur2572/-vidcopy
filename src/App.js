import React, { useState } from 'react';

function App() {
  const [link, setLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const [processType, setProcessType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = extractYouTubeID(link);
    if (id) {
      setVideoId(id);
    } else {
      alert("Invalid YouTube link");
    }
  };

  const extractYouTubeID = (url) => {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&#]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getDownloadLink = () => {
    return `https://www.y2mate.is/youtube/${videoId}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>VidCopy</h1>
      <p>Make your YouTube video copyright-free (demo)</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter YouTube link"
          style={{ width: '300px', padding: '10px' }}
        />
        <br /><br />

        <select
          value={processType}
          onChange={(e) => setProcessType(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        >
          <option value="">Select Copyright-Free Process</option>
          <option value="mute">Mute Audio</option>
          <option value="filter">Add B/W Filter</option>
          <option value="trim">Trim First 5 Sec</option>
        </select>

        <br /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>Process Video</button>
      </form>

      {videoId && (
        <div style={{ marginTop: '30px' }}>
          <h3>Preview with "{processType}"</h3>
          <div style={{ filter: processType === 'filter' ? 'grayscale(100%)' : 'none' }}>
            <iframe
              width="360"
              height="215"
              src={`https://www.youtube.com/embed/${videoId}?${processType === 'mute' ? 'mute=1' : ''}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          </div>

          <br /><br />
          <a
            href={getDownloadLink()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#28a745',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            Download in High Quality
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
