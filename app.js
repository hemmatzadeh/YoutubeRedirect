const express = require('express');
const app = express();
const port = 3000;

app.get('/play', (req, res) => {
  const videoUrl = req.query.videoUrl;
  const isMobile = req.headers['user-agent'].match(/Android|iPhone|iPad|iPod/i);

  if (isMobile) {
    // Redirect to the YouTube app using the appropriate URL scheme
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoUrl}`;

    if (req.headers['user-agent'].match(/Android/i)) {
    //   res.redirect(`intent://www.youtube.com/watch?v=${videoUrl}#Intent;package=com.google.android.youtube;S.browser_fallback_url=${youtubeUrl};end;`);
        res.redirect(`vnd.youtube://watch?v=${videoUrl}`);
    } else if (req.headers['user-agent'].match(/iPhone|iPad|iPod/i)) {
      res.redirect(`youtube://watch?v=${videoUrl}`);
    } else {
      // Handle other mobile devices
      res.redirect(youtubeUrl);
    }
  } else {
    // Open in the browser
    res.redirect(`https://www.youtube.com/watch?v=${videoUrl}`);
  }
});

app.get('/test', (req, res) => {
    res.json({ message: 'test' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
