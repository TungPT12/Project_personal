import 'bootstrap/dist/css/bootstrap.min.css';
import './SignupForm.css'
function SignupForm() {
    const subscribe = (e) => {
        e.preventDefault();
    }
    return (
        <div id="signup-form">
            <div className="signup-form__container">
                <h2 className='mb-4'>Save time, save money!</h2>
                <p className='mb-3'>Sign up and we'll send best deals to you</p>
                <form>
                    <input placeholder='Your email' />
                    <button onClick={(e) => {
                        subscribe(e)
                    }}>Subscribe</button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;