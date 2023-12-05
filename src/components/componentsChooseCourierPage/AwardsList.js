import React from 'react';
import { courierYandex } from '../../ArrayWithNameCourier/dateCouriers';

export default function AwardsItems() {
    const listAwards = courierYandex[0].awards.map((reward, index) => (
        <li key={index}>{reward}</li>
    ));

    return <ul>{listAwards}</ul>;
}


