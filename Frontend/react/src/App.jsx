import { useState } from 'react'
import styles from './App.module.css'
import svg from './assets/raven.svg'
import app_pic from './assets/app.png'
import { Link } from 'react-router-dom'
function App() {


  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Ancizar+Sans:ital,wght@0,100..1000;1,100..1000&family=Black+Ops+One&family=Cinzel+Decorative:wght@400;700;900&family=
Exile&family=Figtree:ital,wght@0,300..900;1,300..900&family=Funnel+Display:wght@300..800&family=IM+Fell+English+SC&family=Outfit:wght@100..900&family=Playfair+Display:ital
,wght@0,400..900;1,400..900&family=Protest+Guerrilla&family=Radio+Canada:ital,wght@0,300..700;1,300..700&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;
1,100..900&family=Share+Tech&display=swap" rel="stylesheet" />
     <header>
      <div className={styles.header_logo}>
        <img src={svg} alt="" />
        <h1>Wovo</h1>
      </div>
      <div className={styles.header_btns}>
        <Link to="SignUp"><button>Sign Up</button></Link>
        <Link to="LogIn"><button>Log In</button></Link>
      </div>
     </header>
     <main className={styles.main_app}>
      <div>
        <h2>My first Messaging App</h2>
    <img src={app_pic} alt="" />
    </div>
     </main>
    </>
  )
}

export default App
