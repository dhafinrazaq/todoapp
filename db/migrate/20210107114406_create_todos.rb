class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :name
      t.string :desc
      t.boolean :isCompleted

      t.timestamps
    end
  end
end
