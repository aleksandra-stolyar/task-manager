class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :project_id
      t.string :name
      t.integer :priority
      t.date :deadline
      t.boolean :done

      t.timestamps
    end
  end
end
