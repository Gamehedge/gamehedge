ActiveAdmin.register Venue do

permit_params :id, :name, :address, :te_uid, :image, :location, :url

index :download_links => false do
    selectable_column
    column ("TEVO Id")  { |venue| venue.te_uid }
    column :name
    column :location
    column :slug
    column :url
    actions
end

form multipart: true do |f|
    f.inputs "Sport details" do
      	f.input :name
      	f.input :address
      	f.input :te_uid
        f.input :location
        f.input :slug
        f.input :url
      	f.input :image, :as => :file, required: false
    end
    f.actions
end

end
