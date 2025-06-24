import { render } from '@czechitas/render';
import '../global.css';
import './index.css';
import { Header } from '../components/Header';
import { Banner } from '../components/Banner';
import { Menu } from '../components/Menu';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const response = await fetch("http://localhost:4000/api/drinks")
const json = await response.json()
const drinks = json.data

console.log(drinks)

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header />
    <main>
      <Banner />
      <Menu drinks={drinks} />
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </div>
);

// Zprovoznění navigace

const navButton = document.querySelector(".nav-btn")
const navRollout = document.querySelector(".rollout-nav")
navButton.addEventListener("click", () => navRollout.classList.toggle("nav-closed"))
navRollout.addEventListener("click", () => navRollout.classList.toggle("nav-closed"))
