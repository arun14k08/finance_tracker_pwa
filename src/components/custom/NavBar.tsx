import LogoutButton from "./LogoutButton"

const NavBar = () => {
  return (
    <div className="w-full h-12 bg-gray-200 flex justify-between items-center px-4">
    <div>NavBar</div>
    <LogoutButton/>
    </div>
  )
}

export default NavBar