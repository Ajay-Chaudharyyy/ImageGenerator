import Description from "../components/Description"
import GenerateButton from "../components/GenerateButton"
import Header from "../components/Header"
import Steps from "../components/Steps"
import Testimonials from "../components/Testimonials"


const Homepage = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateButton/>
    </div>
  )
}

export default Homepage