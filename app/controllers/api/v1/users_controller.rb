require 'utils'
include ConstantsModule

class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # create a user
  def create
    @user = User.new(user_params)
    if @user.save
      payload = {user_id: @user.id}
        token = encode_token(payload)
        cookies[CONSTANTS['authorization-cookie']] = token
        render json: {
            :username => @user.username,
            :jwt => CONSTANTS['jwt-authenticated-status']
        }
    else
        render json: {error: 'Unable to create account'}, status: 400
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :email)
    end
end
