ActiveAdmin.register Event do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params 

permit_params :id, :name, :te_uid, :te_performer_home_id, :te_performer_visit_id, :sport_id, :venue_id, :te_venue_id, :location, :occurs_at, :url, :home_performer_id, :away_performer_id
index :download_links => false do
    selectable_column
    column ("TEVO Id")  { |event| event.te_uid }
    column :name
    column :sport
    column :home_performer
    column :away_performer
    column :venue
    actions
end

form do |f|
      f.inputs "Event details" do
        	f.input :name
        	f.input :te_uid
        	f.input :te_performer_home_id
        	f.input :te_performer_visit_id
        	f.input :te_venue_id
        	f.input :location
        	f.input :occurs_at
        	f.input :sport_id, :as => :select, :collection => Sport.all.order(:name)
        	f.input :venue_id, :as => :select, :collection => Venue.all.order(:name)
        	f.input :home_performer_id, :as => :select, :collection => Performer.all.order(:name)
        	f.input :away_performer_id, :as => :select, :collection => Performer.all.order(:name)
      end
      f.actions
 end
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end


end