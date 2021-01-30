class Api::V1::TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user

  # GET /todos
  # Get all user's todos
  def index
    @todos = @user.todos
    render json: @todos
  end

  # GET /todos/tag/:tag
  # Get user's todos associated with the specified tag
  def index_with_tag
    if params[:tag]
      @todos = Tag.find_by!(id: params[:tag]).todos
    else
      @todos = @user.todos
    end
    render json: @todos
  end

  # GET /todo/:id
  # Get todo with specified id
  def show
    @todo = Todo.find(params[:id])
    
    if @user.id == @todo.user_id.to_i
      render :json => @todo, :include => [:tags]
    else
      render json: { error: "Unable to get todo" }, status: 400
    end
  end

  # POST /todos
  # Create new todo
  def create
    @todo = Todo.new
    @todo.user_id = @user.id
    @todo.name = todo_params["name"]
    @todo.isCompleted = todo_params["isCompleted"]
    @todo.set_tag(todo_params["tag_list"], @user.id)

    if @todo.save
      render :json => @todo, :include => [:tags]
    else
      render json: { error: 'Unable to create todo'}, status: 400
    end
  end

  # PUT /todos/:id
  # Update a todo
  def update
    @todo = Todo.find(params[:id])
    if @todo
      if todo_params["name"]
        @todo.name = todo_params["name"]      
      end
      if todo_params["isCompleted"]
        @todo.isCompleted = todo_params["isCompleted"]
      end
      if todo_params["tag_list"]
        @todo.set_tag(todo_params["tag_list"], @user.id)
      end
      @todo.save
      render :json => @todo, :include => [:tags]
    else
      render json: { error: 'Unable to update todo'}, status: 400
    end
  end

  # DELETE /todos/:id
  # Delete a todo
  def destroy
    @todo = Todo.find(params[:id])
    if @todo
      @todo.destroy
      render json: @todo
    else
      render json: { error: 'Unable to delete todo'}, status: 400
    end
  end

  # Helper to be called before each of the controllers above to get the user sending the request and check if user is authorized.
  def set_user
    @user = session_user
    if !@user
      render json: { error: 'You are not logged in'}, status: 401
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :desc, :isCompleted, :tag_list, :tag, { tag_ids: [] }, :tag_ids)
  end
end
