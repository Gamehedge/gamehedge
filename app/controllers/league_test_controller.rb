class LeagueTestController < ApplicationController
  def show
  	@league = Sport.find_by_id(params[:id])#.to_json(:only => [:id, :name, :description, :te_uid, :url, :ggg, :slug, :active], :methods => [:image_url, :image_url_medium, :image_url_thumb])
  	@divisions = Division.where(sport_id: params[:id])
  	@performers = Performer.where(sport_id: params[:id])
  	@id = params[:id]
 #  	if cookies[:location_]
	# 	info = ActiveSupport::JSON.decode(cookies[:location_])
	# 	latitude = info['latitude']
	# 	longitude = info['longitude']
	# else
	# 	if request.remote_ip == "127.0.0.1"
	# 		info = Pointpin.locate("150.210.231.30")
	# 	else
	# 		info = Pointpin.locate(request.remote_ip)
	# 	end
	# 	cookies[:location_] = {value: info.to_json, expires: 12.hour.from_now}
	# 	latitude = info.latitude
	# 	longitude = info.longitude
	# end
	# @next_events = TicketEvolutionService.new({:type => "events", :within => 25, :id => @league.id, :geolocated => "true", :latitude => latitude, :longitude => longitude, :page => 1, :source => "league", :perpage => 50}).list
  end
end
