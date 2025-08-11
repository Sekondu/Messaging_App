import styles from './login.module.css'
import { useState } from 'react';
import svg from '../src/assets/raven.svg'
import pass_visible from '../src/assets/visible.svg'
import pass_invisible from '../src/assets/invisible.svg'
import { useNavigate,Link } from 'react-router-dom';
export function LogIn(){
    let [username,setUsername]=useState("");
    let [password,setPassword]=useState("");
    let [password_visibility,setPassVisible]=useState(false);
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const res=await fetch(`http://localhost:3000/login`,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
        body:JSON.stringify({username:username,password:password})}
        )
        if(res.ok){
            const data=await res.json();
            localStorage.setItem("token",data.token);
            navigate(`/user?user=${username}`);
        }
        else{
            console.log(res.status);
        }
    }

    return <div className={styles.logIn}>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&family=Black+Ops+One&family=Cinzel+Decorative:wght@400;700;900&family=
Exile&family=Figtree:ital,wght@0,300..900;1,300..900&family=Funnel+Display:wght@300..800&family=IM+Fell+English+SC&family=Outfit:wght@100..900&family=Playfair+Display:ital
,wght@0,400..900;1,400..900&family=Protest+Guerrilla&family=Radio+Canada:ital,wght@0,300..700;1,300..700&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;
1,100..900&family=Share+Tech&display=swap" rel="stylesheet" />
    <div className={styles.form}>
        <div className={styles.head}>
                    <div className={styles.header_logo}>
                            <img src={svg} alt="" onClick={() => navigate("/")} style={{cursor:"pointer"}}/>
                            <h1>Wovo</h1>
                          </div>
                          <hr />
                <h1>Log In</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label style={{marginBottom:username.length>0?"25px":"0px"}} htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <label style={{marginBottom:password.length>0?"25px":"0px"}} htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}  type={password_visibility==true ? "text" : "password"} id="password" name="password" required/>
                <img src={password_visibility==true ? pass_visible : pass_invisible} onClick={() => setPassVisible(!password_visibility)} style={{cursor:"pointer"}} alt="" />
                </div>
                <div className={styles.login_btns}>
                <button type="submit">Log In</button>
                <hr />
                <div className={styles.redirect_signup}>
                    <p>Don't have an account?</p>
                    <Link to="/SignUp"><button className={styles.redirect_signup_btn}>Sign Up</button></Link>
                </div>
            </div>
        </form>
    </div>
    </div>
}