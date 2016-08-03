class AddNamePerformer < ActiveRecord::Migration
  def change
  	add_column :performers, :name, :string
  end
end
