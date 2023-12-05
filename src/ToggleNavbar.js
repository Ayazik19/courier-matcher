// import { useState } from "react";
// import {Link} from "react-router-dom";
// import './ToggleNavbar.css';

// export default function ToggleNavbar(){
//     const[isOpen, setIsOpen] = useState(false);

//     const toggleNavbar = () => setIsOpen(!isOpen);

//     console.log(isOpen);


//     return(
//         <div className="toggleNavbar">
//             <Link className="navbar-link-1" onClick={toggleNavbar} to = "/" > About</Link>
//             {isOpen && (
//                  <ul className={isOpen ? 'menu open' : 'menu'}>
//                     <li>Our couriers</li>
//                     <li>Description</li>
//                     <li>Some...</li>
//                 </ul>
//             )}
//         </div>
//     );
// }