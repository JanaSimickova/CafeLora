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

// console.log(drinks)

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header showMenu={true} />
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

const navButtonElm = document.querySelector(".nav-btn")
const navRolloutElm = document.querySelector(".rollout-nav")
navButtonElm.addEventListener("click", () => navRolloutElm.classList.toggle("nav-closed"))
navRolloutElm.addEventListener("click", () => navRolloutElm.classList.toggle("nav-closed"))


// Objednání nápoje

const orderFormsElms = document.querySelectorAll(".drink__controls")

const handleOrder = async (event) => {
  event.preventDefault()
  const drinkId = event.target.dataset.id
  const orderState = event.target.dataset.ordered
  // console.log(drinkId)
  // console.log(orderState)

  const changeToTrue = async () => {
    const response = await fetch(`http://localhost:4000/api/drinks/${drinkId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        op: "replace", 
        path: "/ordered", 
        value: true
      }]),
    }
    );
  
    if(!response.ok) {
      alert("Něco se pokazilo")
    }
  }

    const changeToFalse = async () => {
    const response = await fetch(`http://localhost:4000/api/drinks/${drinkId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        op: "replace", 
        path: "/ordered", 
        value: false
      }]),
    }
    );
  
    if(!response.ok) {
      alert("Něco se pokazilo")
    }
  }


if(orderState === "false") {
  changeToTrue()
} else {
  changeToFalse()
}
  
window.location.reload()

  // console.log(response)

}



orderFormsElms.forEach(form => form.addEventListener(("submit"), handleOrder))
