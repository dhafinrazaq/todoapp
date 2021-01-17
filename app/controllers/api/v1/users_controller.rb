class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @users = User.all
    render json: @users
  end

  def show
    user = User.find_by id:params[:id]
    if user
        render json: user, include: ['todos']
    else 
        render json: {error: 'Error findind account'}
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      payload = {user_id: @user.id}
        token = encode_token(payload)
        render json: {
            :username => @user.username,
            :jwt => token
        }
    else
        render json: {error: 'Error creating account'}
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :email)
    end
end
