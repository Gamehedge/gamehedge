ActiveAdmin.register Tile do

permit_params :id, :name, :tile_type_id, :sport_id, :performer_id, :venue_id, :event_id, :event_id2, :event_id3, :image, :link, :slug, :has_geolocation, :good_game_guarantee, :position, :description
index :download_links => false do
  selectable_column
  column :position
  column :name
  column :tile_type
  column :has_geolocation
  actions
  
end
form multipart: true do |f|
    f.inputs "Tile details" do
      	f.input :name
        f.input :position
        f.input :description
      	f.input :tile_type_id, :as => :select, :collection => TileType.all
      	f.input :sport_id, :as => :select, :collection => Sport.all
      	f.input :performer_id, :as => :select, :collection => Performer.all
      	f.input :venue_id, :as => :select, :collection => Venue.all
        f.input :event_id, :as => :select, :collection => Event.all.order(:name)
        f.input :event_id2, :as => :select, :collection => Event.all.order(:name)
        f.input :event_id3, :as => :select, :collection => Event.all.order(:name)
    		f.input :image, :as => :file, required: false
    		f.input :good_game_guarantee
      	f.input :link
      	f.input :slug
      	f.input :has_geolocation
    end
    f.actions
end


end
