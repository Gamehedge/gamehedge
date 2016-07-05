class ModifyPerformer < ActiveRecord::Migration
  def change
  	add_reference :performers, :division, index: true, foreign_key: true
  end
end
