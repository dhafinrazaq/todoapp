class Api::V1::TagsController < ApplicationController
  before_action :set_user

  # GET /tags
  def index
    @tags = @user.tags
    render json: @tags
  end

  # GET /tag/:id
  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end

  # check if the user is authorized to see this tag's todos
  def set_user
    @user = session_user
    if !@user
      render json: { error: 'You are not logged in'}, status: 400
    end
  end
  
end
