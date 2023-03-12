import './App.css';
import { Routes , Route } from 'react-router-dom';
import NavbarComponent from './Components/NavBarComponent/NavbarComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import SignInComponent from './Components/FormsComponent/SignInComponent';
import SignUpComponent from './Components/FormsComponent/SignUpComponent';
import ResetPasswordComponent from './Components/FormsComponent/ResetPassComponent';
import ForgotPasswordComponent from './Components/FormsComponent/ForgetPassComponent';
import EmailVerificationMessage from './Components/FormsComponent/EmailVerificationMessage';
function App() {
  return (
    <>
    <NavbarComponent></NavbarComponent>
    <Routes>
      <Route path='/home' element={<HomeComponent></HomeComponent>} ></Route>
      <Route path='/SignIn' element={<SignInComponent></SignInComponent>} ></Route>
      <Route path='/SignUp' element={<SignUpComponent></SignUpComponent>} ></Route>
      <Route path='/ResetPassWord' element={<ResetPasswordComponent></ResetPasswordComponent>} ></Route>
      <Route path='/ForgetPassword' element={<ForgotPasswordComponent></ForgotPasswordComponent>} ></Route>
      <Route path='/EmailVerifiaction' element={<EmailVerificationMessage></EmailVerificationMessage>} ></Route>
      <Route path="/auth/google/callback" render={() => {window.location.href = 'http://localhost:5000/auth/google/callback'; return null;}}/>
    </Routes> 
    <FooterComponent></FooterComponent>
  
  
  
   </>
  );
}

export default App;
