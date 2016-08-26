ActiveAdmin.register PromoCode do

	permit_params :id, :value, :is_percentage, :name, :code, :start_date, :end_date, :active

	index :download_links => false do
	    selectable_column
	    column :name
	    column :code
	    column :value
	    column :is_percentage
	    column :start_date
	    column :end_date
	    column :active
	    actions
	end
end
