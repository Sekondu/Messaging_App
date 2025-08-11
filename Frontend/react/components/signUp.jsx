import { useState } from 'react'
import styles from './signup.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import svg from '../src/assets/raven.svg'
import pass_visible from '../src/assets/visible.svg'
import pass_invisible from '../src/assets/invisible.svg'
import confirm_visible from '../src/assets/visible.svg'
import confirm_invisible from '../src/assets/invisible.svg'
export function SignUp(){
    let [username,setUsername]=useState("");
    let [first,setFirst]=useState("");
    let [last,setLast]=useState("");
    let [password,setPassword]=useState("");
    let [confirm,setConfirm]=useState("");
    let [password_visibility,setPassVisible]=useState(false);
    let [confirm_visibility,setConfirmVisible]=useState(false);
    const navigate=useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if(confirm===password){
        const res=await fetch(`http://localhost:3000/signup`,{
            method:"POST",
            headers : {"Content-Type" : "application/json"},
        body:JSON.stringify({username:username,first:first,last:last,password:password})
    }
        )
        if(res.ok){
            navigate("/logIn");
        }
        else{
            navigate("/signUp");
        }
        }

    }

    return <div className={styles.signUp}>
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
        <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
            <label style={{marginBottom:username.length>0?"25px":"0px"}} htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
            <label style={{marginBottom:first.length>0?"25px":"0px"}} htmlFor="first">First Name</label>
            <input value={first} onChange={(e) => setFirst(e.target.value)}  type="text" id="first" name="first"/>
            </div>
            <div>
            <label style={{marginBottom:last.length>0?"25px":"0px"}} htmlFor="last">Second Name</label>
            <input value={last} onChange={(e) => setLast(e.target.value)}  type="text" id="last" name="last"/>
            </div>
            <div>
            <label style={{marginBottom:password.length>0?"25px":"0px"}} htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)}  type={password_visibility==true ? "text" : "password"} id="password" name="password" required/>
            <img src={password_visibility==true ? pass_visible : pass_invisible} onClick={() => setPassVisible(!password_visibility)} style={{cursor:"pointer"}} alt="" />
            </div>
            <div>
            <label style={{marginBottom:confirm.length>0?"25px":"0px"}} htmlFor="confirm">Confirm Password</label>
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)}  type={confirm_visibility==true ? "text" : "password"} id="confirm" name="confirm" required/>
            <img src={confirm_visibility==true ? confirm_visible : confirm_invisible} onClick={() => setConfirmVisible(!confirm_visibility)} style={{cursor:"pointer"}} alt="" />
            </div>
            <div className={styles.signup_btns}>
                <button type="submit">Sign Up</button>
                <hr />
                <div className={styles.redirect_login}>
                    <p>Already have an account?</p>
                    <Link to="/LogIn"><button className={styles.redirect_login_btn}>Log In</button></Link>
                </div>
            </div>
        </form>
        </div>
    </div>
}