import AddPost from "../../components/user/AddPost"
import Navbar from "../../components/user/Navbar"
import UserProfile from "../../components/user/UserProfile"


function HomePage() {
  return (
    <>
    <Navbar/>
    <UserProfile/>
    <AddPost/>
    </>
  )
}

export default HomePage