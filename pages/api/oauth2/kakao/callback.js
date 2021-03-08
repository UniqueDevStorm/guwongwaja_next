import * as process from "process";
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

export default async (req, res) => {
    const code = req.query.code;
    const params = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.Kakao,
            redirect_uri: 'http://localhost:3000/api/oauth2/kakao/callback',
            code: code
    })
    const request = (await (await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })).json())
    const type = request.token_type;
    const access_token = request.access_token;
    const user = (await (await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
            Authorization: `${type} ${access_token}`
        }
    })).json())
    const data = {
        name : user['kakao_account']['profile']['nickname'],
        email : user['kakao_account']['email']
    }
    const cookies = new Cookies(req, res)
    const key = jwt.sign(data, process.env.JWT_SECRET)
    cookies.set('user', key, {
        httpOnly: false
    })
    res.redirect('/')
}