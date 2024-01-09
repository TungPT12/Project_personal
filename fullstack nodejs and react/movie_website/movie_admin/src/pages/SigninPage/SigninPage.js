import SignIn from "../../components/SignIn/SignIn";
import styles from './SigninPage.module.css'

function SigninPage() {
    return (
        <div className={`${styles['login-page']} d-flex justify-content-center align-items-center`}>
            <SignIn />
        </div>
    );
}

export default SigninPage;