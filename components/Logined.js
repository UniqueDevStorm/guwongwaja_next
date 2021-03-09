export default function Logined(props) {
    return (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <h1>{props.data.name} 반갑습니다.</h1>
            <h1>{props.data.name} 님의 이메일 : {props.data.email}</h1>
        </div>
    )
}