import app from './app.js';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Production startup guard — refuse to start without critical env vars
if (process.env.NODE_ENV === 'production') {
  const required = ['DATABASE_URL', 'JWT_TOKEN'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `FATAL: Missing required environment variables: ${missing.join(', ')}`
    );
    process.exit(1);
  }
}

app.listen(PORT, HOST, () => {
  console.log(`App listening on Port http://localhost:${PORT}`);
});
