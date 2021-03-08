import * as process from "process";

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
    const data = {}
    data.name = user.kakao_account.profile.nickname;
    data.email = user.kakao_account.email;
    res.send(data);
}