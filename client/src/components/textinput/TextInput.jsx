function textInput(props){
    return( 
<div className="items-center flex flex-col  w-auto">
   <input className="p-5 m-5 border-2 rounded-xl" type="text" name="" id="" {...props} />
    {props.error && <p>{props.errormessage}</p>}
    
</div>


    )
}
export default textInput;