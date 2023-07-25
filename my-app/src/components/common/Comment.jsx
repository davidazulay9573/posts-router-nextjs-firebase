function Comment({content}){
  return(
   

<div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
   <img className="rounded-full h-8 w-8 mr-2 mt-1 " src="https://picsum.photos/id/1027/200/200"/>
  <div>
    <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
      <div className="font-semibold text-sm leading-relaxed">Jon Doe</div>
      <div className="text-normal leading-snug md:leading-normal"
      >{content} hello</div>
    </div>
    <div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">14 w</div>
    <div className="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
      <span className="text-sm ml-1 pr-1.5 text-gray-500 dark:text-gray-300">3</span>
    </div>
  </div>
</div>


  )
}

export default Comment;