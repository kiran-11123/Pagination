
export const LogoutController = async(req , res)=>{
      
    try{

      console.log("Logout Controller Called" , req.cookies.token);
      console.log("Logout Controller Called" , req.cookies.refresh_token);

            
            res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true
  });
     
  return res.status(200).json({
    message : "User Loggedout successfully"
  })

    }
    catch(er){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}