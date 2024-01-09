import { useHookMouseFunctionalityErrorsContext } from './hookMouseFunctionalityErrors';
import hideContAdding from '../components/componentsHomePage/hideUserAccInfo.png';
import './openContHookMouseFunctionalityErrorsStepTwo.css';


export default function OpenContHookMouseFunctionalityErrorsStepTwo() {
    const {isSelectedElementStepTwo, setIsSelectedElementStepTwo, setSelectedElement} = useHookMouseFunctionalityErrorsContext();

    const handleHideCont = () => {
        setSelectedElement(false);
        setIsSelectedElementStepTwo(false);
    }

    return isSelectedElementStepTwo ? (
        <div className="fp-show-container-inform-errors-in-site_step-2">
            <div className='fp-cont-show-inform-errors_step-2'>
                <div className='cont-infrom-errors_step-2'>
                    <div className='hide-cont-hide-inform-errors'>
                        <img src={hideContAdding} onClick={handleHideCont} className='img-hide-cont-inform-errors' />
                    </div>
                    <span className='main-text-cont'>
                        Detected error
                    </span>
                    <span className="text-cont_step-2">
                        Thanks for the feedback. We will take note of the error and try to fix it as soon as possible. Thank you for your understanding and patience!
                    </span>
                </div>
            </div>
        </div>
    ) : 
    null
}