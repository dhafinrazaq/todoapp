class Api::V1::TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user

  # GET /todos
  def index
    @todos = @user.todos
    render json: @todos
  end

  # GET /todos/tag/:tag
  def index_with_tag
    if params[:tag]
      @todos = Todo.tag_user(Tag.find_by(name: params[:tag]).id, @user.id)
    else
      @todos = @user.todos
    end
    render json: @todos
  end

  # GET /todo/:id
  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  # POST /todos
  def create
    print "params:\n"
    print todo_params
    @todo = @user.todos.new(todo_params)
    print @todo
    print "\n"
    print "todo above"
    if @todo.save
      render json: @todo
    else
      render error: { error: 'Unable to create todo'}, status: 400
    end
  end

  # PUT /todos/:id
  def update
    @todo = Todo.find(params[:id])
    if @todo
      @todo.update(todo_params)
      render json: @todo
    else
      render json: { error: 'Unable to update todo'}, status: 400
    end
  end

  # DELETE /todos/:id
  def destroy
    @todo = Todo.find(params[:id])
    if @todo
      @todo.destroy
      render json: @todo
    else
      render json: { error: 'Unable to delete todo'}, status: 400
    end
  end

  def set_user
    print "below\n"
    print request.headers["Authorization"]
    print "\n"
    print "above\n"
    @user = session_user
    print @user.username
    print "\n"
    print "above is user\n"
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :desc, :isCompleted, :tag_list, :tag, { tag_ids: [] }, :tag_ids)
  end
end
