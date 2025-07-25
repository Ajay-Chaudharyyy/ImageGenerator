import { Link } from "react-router-dom"
import { assets } from "../assets/assets"
import logo from "../../public/favicon.svg"
const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
        <Link to="/" className="flex justify-center items-end gap-2">
        <img src={logo} alt=""/>
        <p className="text-lg font-semibold">DeepDraw</p>
        </Link>

        <p className="flex-1 border-l flex items-center border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @AjayChaudhary | All right reserved.</p>

        <div className="flex gap-2.5">
            
            <img src={assets.facebook_icon} alt="" width={35} />
            <img src={assets.twitter_icon} alt="" width={35} />
            <img src={assets.instagram_icon} alt="" width={35} />
            
            </div>
    </div>
  )
}

export default Footer