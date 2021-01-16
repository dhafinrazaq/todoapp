class Api::V1::TagsController < ApplicationController
  # GET /tags
  def index
    @tags = Tag.all
    render json: @tags
  end

  # GET /tag/:id
  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end
  
end
