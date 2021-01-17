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

  def set_user
    @user = session_user
  end
  
end
