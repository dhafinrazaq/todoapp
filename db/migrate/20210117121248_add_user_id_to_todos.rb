class AddUserIdToTodos < ActiveRecord::Migration[5.2]
  def change
    add_column :todos, :user_id, :string
    add_column :todos, :integer, :string
  end
end
