class AddPositionToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :rate, :integer
  end
end
