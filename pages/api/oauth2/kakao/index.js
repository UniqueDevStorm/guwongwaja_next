import * as process from "process";

export default (req, res) => {
    res.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.Kakao}&redirect_uri=http://localhost:3000/api/oauth2/kakao/callback&response_type=code&scope=profile,account_email`)
}