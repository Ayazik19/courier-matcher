import { FormQuestionnaireInputs } from './InputsToQuestions';
import './formChooseCourier.css';

export default function FormUsersWishes(){
    return(

    <div className="form-users-wishes">
        <div className="form-main-title">
            <h4>Fill out the questionnaire,<br></br>
                we will pick up a courier for you</h4>
        </div>
        <FormQuestionnaireInputs />
    </div>
    );   
}


