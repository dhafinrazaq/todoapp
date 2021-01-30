class Api::V1::SessionController < ApplicationController    
  skip_before_action :verify_authenticity_token

  def login
    user = User.find_by :username=>user_params[:username]
    if user && user.authenticate(user_params[:password])
        payload = {user_id: user.id}
        token = encode_token(payload)
        cookies['Authorization'] = token
        render json: {
            user: user,               
            jwt: "auth"
        }
    else
        render json: {error: "Unable to find account."}, status: 400
    end
  end

  def logout
    cookies.delete 'Authorization'
  end
                            
  def auth
    if session_user
        render json: {
          user: session_user,
          jwt: "auth"
      }
    else
        render json: {error: "No User Logged In."}, status: 401
    end     
  end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end
end