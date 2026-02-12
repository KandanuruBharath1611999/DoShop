import './container.css';
import { useNavigate, } from 'react-router-dom';
const Category = (props) =>
{
    const navigate = useNavigate();
    const {name,imageUrl} = props;
    const onClick = () =>
    {
        if(name === "Sneakers")
        {
            navigate('/Shopping/Sneakers');
        }
        if(name === "Hats")
        {
            navigate('/Shopping/Hats');
        }
        if(name === "Jackets")
        {
            navigate('/Shopping/Jackets');
        }
        if(name === "Womens")
        {
            navigate('/Shopping/Womens');
        }
        if(name === "Mens")
        {
            navigate('/Shopping/Mens');
        }
    }
    return(
        <div>
             <button onClick={onClick} className={`${name}_Container Inner_container`} style={{backgroundImage : `url(${imageUrl})`}}>
                <div className = "commoncss">
                  <h3>{name}</h3>
                  SHOP NOW
                </div>
            </button>
        </div>
    )
}
export default Category;