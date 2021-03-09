import 'semantic-ui-css/semantic.min.css';
import NotLogined from "../components/NotLogined";
import Logined from "../components/Logined";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import * as process from "process";

export async function getServerSideProps(ctx) {
    let key = null;
    try {
        const cookies = cookie.parse(ctx.req.headers.cookie);
        const user = cookies.user;
        key = jwt.verify(user, process.env.JWT_SECRET)
    } catch { key = null }
    return {
        props: { user: key }
    }
}

export default function Home({ ...key }) {
    const data = key.user;
    return (
        <div>
            {
                data === null
                ? <NotLogined />
                : <Logined data={data} />
            }

        </div>
    )
}