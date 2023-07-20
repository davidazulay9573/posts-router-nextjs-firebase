import Link from "next/link";
function HeaderNav(){
   return (
     <div className="bg-gray-800 text-white p-4">
       
       <Link className="m-2" href="/">Home</Link>
       <Link className="m-2" href="/about">About</Link>
       <Link className="m-2"href="/posts">Posts</Link>
       <Link className="m-2" href="/posts/create-post">Create-Post</Link>
       
     </div>
   );
}

export default HeaderNav;