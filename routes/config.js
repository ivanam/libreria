var config = {
  google: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID || 'IsVVKAmSkf1jQVmca1qSDorp',
      secret: process.env.GOOGLE_CLIENT_SECRET || '498221103843-dn3lpdicbkciefesbcrs8ejdkt0m6o25.apps.googleusercontent.com',
      callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/auth/google/callback'
    }
  },
  session: {
    secret: process.env.SESSION_SECRET || ''
  }
}

module.exports = config;