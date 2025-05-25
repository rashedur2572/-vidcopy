import React, { useState } from 'react';

function App() {
  const [link, setLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const [processType, setProcessType] = useState('');
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      title: 'VidCopy',
      subtitle: 'Make your YouTube video copyright-free (demo)',
      placeholder: 'Enter YouTube link',
      select: 'Select Copyright-Free Process',
      mute: 'Mute Audio',
      filter: 'Add B/W Filter',
      trim: 'Trim First 5 Sec',
      processBtn: 'Process Video',
      preview: 'Preview with',
      download: 'Download in High Quality',
      toggle: 'Switch to Bangla'
    },
    bn: {
      title: 'ভিডকপি',
      subtitle: 'আপনার ইউটিউব ভিডিও কপিরাইট মুক্ত করুন (ডেমো)',
      placeholder: 'ইউটিউব লিংক দিন',
      select: 'কপিরাইট মুক্ত করার ধরন বাছুন',
      mute: 'অডিও বন্ধ করুন',
      filter: 'সাদা-কালো ফিল্টার দিন',
      trim: 'প্রথম ৫ সেকেন্ড কেটে দিন',
      processBtn: 'ভিডিও প্রসেস করুন',
      preview: 'প্রিভিউ:',
      download: 'উচ্চ মানের ভিডিও ডাউনলোড করুন',
      toggle: 'Switch to English'
    }
  };

  const lang = text[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractYouTubeID(link);
    if (id) setVideoId(id);
    else alert("Invalid YouTube link");
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
      <button onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')} style={{ float: 'right', margin: '10px' }}>
        {lang.toggle}
      </button>

      <h1>{lang.title}</h1>
      <p>{lang.subtitle}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={lang.placeholder}
          style={{ width: '300px', padding: '10px' }}
        />
        <br /><br />

        <select
          value={processType}
          onChange={(e) => setProcessType(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        >
          <option value="">{lang.select}</option>
          <option value="mute">{lang.mute}</option>
          <option value="filter">{lang.filter}</option>
          <option value="trim">{lang.trim}</option>
        </select>

        <br /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>{lang.processBtn}</button>
      </form>

      {videoId && (
        <div style={{ marginTop: '30px' }}>
          <h3>{lang.preview} "{processType}"</h3>
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
            {lang.download}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
