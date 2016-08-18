class CreateTestimonials < ActiveRecord::Migration
	def change
		create_table :testimonials do |t|
			t.string :author
		    t.text :description
		  	t.timestamps null: false
		end
		add_column :testimonials, :performer_id, :integer
  		add_foreign_key :testimonials, :performers
  		add_attachment :testimonials, :image
	end
end
