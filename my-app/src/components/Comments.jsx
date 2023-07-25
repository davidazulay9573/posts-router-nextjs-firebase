import Comment from "./common/Comment";
function Comments({comments}){
  return(
    <div className="m-3">
    {comments.map((comm) => {
        return <Comment content={comm.content} />
      })} 
    </div>
  )
}

export default Comments;