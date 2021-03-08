import * as process from 'process';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    const code = req.query.code;
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_API_CLIENT_ID,
        client_secret: process.env.GOOGLE_API_CLIENT_SECRET,
        code: code,
        redirect_uri: 'http://localhost:3000/api/oauth2/google/callback',
        grant_type: 'authorization_code'
    })
    const request = (await (await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })).json())
    const access_token = request.access_token;
    const user = (await (await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })).json())
    const data = {
        name : user.name,
        email : user.email
    }
    const key = jwt.sign(data, process.env.JWT_SECRET)
    const cookies = new Cookies(req, res)
    cookies.set('user', key, {
        httpOnly: false
    })
    res.redirect('/')
}