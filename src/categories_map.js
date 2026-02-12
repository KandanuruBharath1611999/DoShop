import { Outlet } from 'react-router-dom';
import Category from './Categories';
import mens from './images/seriously-man-black-near-gray-background.jpg';
import shoes from './images/irene-kredenets-dwKiHoqqxk8-unsplash.jpg';
import women from './images/freestocks-VFrcRtEQKL8-unsplash.jpg';
import hats from './images/hat.webp';
import './container.css';

const Categories  = 
[
  {
    name:"Hats",
    id:1,
    imageUrl: hats,
  },
  {
    name:"Jackets",
    id:2,
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
  },
  {
    name:"Sneakers",
    id:3,
    imageUrl: shoes,
  },
  {
    name:"Womens",
    id:4,
    imageUrl: women,
  },
  {
    name:"Mens",
    id:5,
    imageUrl: mens
  }
]
const Catmap= () => 
{
    
    return(
        <div><Outlet/>
        <div className='Outer_container'>
            {Categories.map((maps) =>
              {
                return(
                  <Category  key={maps.id} name={maps.name} imageUrl={maps.imageUrl}/>
              )})}
        </div>
        </div>
    )
}
 export default Catmap;