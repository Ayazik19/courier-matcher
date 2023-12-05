import img from './MyImg.jpg';
import  './MyImg.css';

export function MyImg(){
    const {description} = 'Yandex Courier Ayaz Namazov';
    return(
        <img
        className="b-img"
        src = {img}
        alt = {description}
        />
    );
}
export default MyImg;