ActiveAdmin.register Testimonial do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :id, :performer_id, :author, :description, :image

index :download_links => false do
    selectable_column
    column :author
    column :description
    column :performer
    actions
end

form multipart: true do |f|
    f.inputs "Testimonial details" do
      	f.input :author
        f.input :description
        f.input :performer, :as => :select, :collection => Performer.all.order(:name)
      	f.input :image, :as => :file, required: false
    end
    f.actions

end

end
