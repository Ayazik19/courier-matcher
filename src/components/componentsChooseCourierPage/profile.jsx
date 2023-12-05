import React from 'react';
import {MyImg} from '../../MyImg';


export default function Profile({lastname = 'Namazov'}){
    const defaultProps = {
        name: 'default name',
        lastname: 'default name'
    }
    const {name} = defaultProps;
    return(
    <div>
        <MyImg/>
        <br></br>Hello {name} {lastname}, how many hours do you worked?   
    </div>
    );
}
