import * as process from 'process';

export default (req, res) => {
    res.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_API_CLIENT_ID}&redirect_uri=http://localhost:3000/api/oauth2/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`)
}