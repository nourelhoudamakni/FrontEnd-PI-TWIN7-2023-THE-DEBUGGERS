import logo from './logo.svg';
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
import SideNavBarComponent from './Components/MedicalRecordComponent/SideNavBarComponent';
function App() {
  return (
    <>
    <NavbarComponent></NavbarComponent>
    <Routes>
      <Route path='/home' element={<HomeComponent></HomeComponent>} ></Route>
      <Route path='/SignIn' element={<SignInComponent></SignInComponent>} ></Route>
      <Route path='/SignUp' element={<SignUpComponent></SignUpComponent>} ></Route>
      <Route path='/reset-password/:token' element={<ResetPasswordComponent></ResetPasswordComponent>} ></Route>
      <Route path='/ForgetPassword' element={<ForgotPasswordComponent></ForgotPasswordComponent>} ></Route>
      <Route path='/EmailVerifiaction' element={<EmailVerificationMessage></EmailVerificationMessage>} ></Route>
    </Routes> 
    <FooterComponent></FooterComponent>
  
  
  
   </>
  );
}

export default App;
