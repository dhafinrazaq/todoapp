class Api::V1::TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /todos
  def index
    @todos = Todo.all
    render json: @todos
  end

  # GET /todo/:id
  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)
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
      render json: { message: 'Todo successfully deleted' }, status: 200
    else
      render json: { error: 'Unable to delete todo'}, status: 400
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :desc, :isCompleted, :all_tags)
  end
end
