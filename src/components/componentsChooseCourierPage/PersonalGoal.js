import Item from './itemPersonalGoal.js';

export default function PackingList(props){
    return(
        <div>
        {props.children}
            <ul>
                <Item
                    isPacked = {true}
                    name="Complete 10 orders"
                />
                <Item
                    isPacked = {true}
                    name="Enter the slot from 15:00 to 23:00"
                />
                <Item   
                    isPacked = {false}
                    name="It should be Monday"
                />
            </ul>
        </div>
    );
}