import 'semantic-ui-css/semantic.min.css';
import { Button } from "semantic-ui-react";
import { AiFillGooglePlusCircle } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri'

export default function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <Button color='red' style={{ fontSize: '30px' }} onClick={() => {
                window.location.replace('/api/oauth2/google/')
            }} >
                <AiFillGooglePlusCircle /> Google 로 로그인하기
            </Button>
            <Button color='yellow' style={{ fontSize: '30px' }} onClick={() => {
                window.location.replace('/api/oauth2/kakao/')
            }} >
                <RiKakaoTalkFill /> Kakao 로 로그인하기
            </Button>
        </div>
    )
}