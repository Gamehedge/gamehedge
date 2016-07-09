class TeuidModification < ActiveRecord::Migration
  def change
  	remove_column :divisions, :te_uid, :integer
  end
end
