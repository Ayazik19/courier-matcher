import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import './HelperTextInputs.css';
import './inputsToQuestions.css';
import { useNavigate } from 'react-router-dom';


const propTypes = {
    inputValueOne: PropTypes.string,
    inputValueTwo: PropTypes.string,
    inputValueThree: PropTypes.string,
    inputValueFour: PropTypes.instanceOf(Date)
};


export const FormQuestionnaireInputs = () => {

    const navigate = useNavigate();
    
    const { register, reset, formState: { errors, isValid }, handleSubmit} = useForm({mode: "onChange"});
    
    const onSubmit = (data) => navigate("/result") || alert(JSON.stringify(data))

    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="form-questionnaire">
            <div className='form-input-1'>
                <label className='form-text-question-input-1'>
                Do you need a pedestrian or bicycle courier?
                    <input className='input-1'
                        {...register("inputValueOne", {
                            required: "The field must be filled in",
                            pattern: {
                                value: /^(foot|bicycle|Foot|Bicycle)$/,
                                message: "Select from the drop-down list"
                            }
                        })}
                        list = "input-1-list"
                    /> 
                    <datalist id ='input-1-list'>
                        <option value="foot">Foot</option>
                        <option value="bicycle">Bicycle</option>
                    </datalist>
                    <div className="helper-text-inputs">
                        {errors?.inputValueOne && <p>{errors?.inputValueOne?.message}</p>}
                    </div>
                </label>
            </div>
            <div className='form-input-2'>
                <label className='form-text-question-input-2'>                
                In which area do you order?
                    <input className='input-2'
                        {...register("inputValueTwo", {
                            required: "The field must be filled in",
                            pattern: {
                                value: /^(Moscow|Soviet|Novo-Savinovsky)$/,
                                message: "Select from the drop-down list"
                            }
                        })}
                        list ="input-2-list"
                    />
                    <datalist id ='input-2-list'>
                        <option value="Moscow">Moscow</option>
                        <option value="Novo-Savinovsky">Novo-Savinovsky</option>
                        <option value="Soviet">Soviet</option>
                    </datalist>

                    <div className="helper-text-inputs">
                        {errors?.inputValueTwo && <p>{errors?.inputValueTwo?.message}</p>}
                    </div>
                </label>
            </div>
            <div className='form-input-3'>
                <label className='form-text-question-input-3'>
                What day and time, do you usually order?
                    <input className='input-3-day'
                        {...register("inputValueThree", {
                            required: "The field must be filled",
                            pattern: {
                                value: /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/,
                                message: "Select drop-down list"
                            }
                        }
                        )}
                        placeholder='Select day'
                        type = "text"
                        list="input-3-list"
                    />
                    <datalist id ='input-3-list'>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </datalist>
                    <input
                        className="input-4-time"
                        {...register("inputValueFour", {
                            required: "The time must be filled",
                            pattern: {
                                value:  /^(0[9]|1[0-1]|16|17|18|19|20|21|22):[0-5][0-9]$/,
                                message: "The wrong time",
                            },
                        })}
                        placeholder="Select time"
                        type="time"
                    />
                    

                    <div class="parent-container">
                        {errors?.inputValueThree && <p className='helper-text errors-1'>{errors?.inputValueThree?.message}</p>}
                        {errors?.inputValueFour && <p className='helper-text errors-2'>{errors?.inputValueFour?.message}</p>}
                    </div>
                </label>
            </div>

            <div className='form-button-reset'>
                <button
                    id = "button-reset"
                    onClick={() => {
                        reset({
                            inputValueOne: "",
                            inputValueTwo: "",
                            inputValueThree: "",
                            inputValueFour: ""
                        });
                    }}
                    >
                    Reset form
                </button>
            </div>
            <div className='form-button-submit-choose-courier'>
                <button 
                    type="submit" 
                    disabled = {!isValid} 
                >
                Choose courier</button> 
            </div>            
        </form>
    );
}


