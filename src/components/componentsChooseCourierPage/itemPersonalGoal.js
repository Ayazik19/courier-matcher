import './item.css';

export default function Item({name, isPacked}){
   return(
    <div>
        {name} {isPacked ? '✔️' : '❌'}
    </div>
   );
}
